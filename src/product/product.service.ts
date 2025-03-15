import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailPricePlanEntity } from 'src/entity/detailpriceplan.entity';
import { PriceplanEntity } from 'src/entity/priceplan.entity';
import { ProdukEntity } from 'src/entity/produk.entity';
import { Repository } from 'typeorm';
import { GetPricepFilter } from './dto/getpricedto';
import { MasterresellerEntity } from 'src/entity/masterreseller.entity';
import { PriceResponse } from './dto/priceresponse';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProdukEntity)
        private produkRepository: Repository<ProdukEntity>,
        @InjectRepository(PriceplanEntity)
        private priceplanRepository: Repository<PriceplanEntity>,
        @InjectRepository(DetailPricePlanEntity)
        private detailPricePlanRepository: Repository<DetailPricePlanEntity>,
        @InjectRepository(MasterresellerEntity)
        private masterresellerRepository: Repository<MasterresellerEntity>
    ) { }


    async getProductPrice(request: GetPricepFilter): Promise<PriceResponse[]> {
        const masterreseller = await this.masterresellerRepository.findOne({ where: { id: request.idrs } });
        if (!masterreseller) {
            throw new HttpException('Masterreseller not found',HttpStatus.BAD_REQUEST);
        }
        const queryBuilder = this.detailPricePlanRepository.createQueryBuilder('detailpriceplan')
            .leftJoin('detailpriceplan.produk', 'produk')
            .leftJoin('detailpriceplan.priceplan', 'priceplan')
            .select(['detailpriceplan.id as id', 'detailpriceplan.hargajual as harga','produk.kodeproduk as kode','priceplan.nama as priceplan','detailpriceplan.aktif as aktif'])
            .where('priceplan.id = :idpriceplan', { idpriceplan: masterreseller.patokanhargajual })
            .getRawMany();
        return await queryBuilder;
    }

}
