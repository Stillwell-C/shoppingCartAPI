import { Module } from '@nestjs/common';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { ProductsService } from 'src/products/products.service';

@Module({
  providers: [OrderResolver, OrderService, ProductsService],
})
export class OrderModule {}
