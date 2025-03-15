import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { GetPricepFilter } from './dto/getpricedto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

   @Get()
   getProductPrice(@Query() request: GetPricepFilter): Promise<object> {
     return this.productService.getProductPrice(request);
   }

}
