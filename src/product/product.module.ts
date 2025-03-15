import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdukEntity } from 'src/entity/produk.entity';
import { DetailPricePlanEntity } from 'src/entity/detailpriceplan.entity';
import { PriceplanEntity } from 'src/entity/priceplan.entity';
import { MasterresellerEntity } from 'src/entity/masterreseller.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProdukEntity,PriceplanEntity,DetailPricePlanEntity,MasterresellerEntity])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
