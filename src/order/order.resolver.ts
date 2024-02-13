import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OrderReturn } from './models/OrderReturn';
import { OrderRequest } from './dto/OrderRequest.ars';
import { ProductsService } from 'src/products/products.service';
import { OrderService } from './order.service';
import { Prisma } from '@prisma/client';

@Resolver()
export class OrderResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly orderService: OrderService,
  ) {}

  @Mutation((returns) => OrderReturn)
  async addOrder(@Args() args: OrderRequest) {
    const { userInfo, orderInfo } = args;
    console.log(userInfo, orderInfo);
    const stockCheck =
      await this.productsService.confirmProductStock(orderInfo);
    if (stockCheck.error) {
      return {
        success: false,
        orderNumber: null,
        error: true,
        errorItem: stockCheck.errorItem,
        errorMsg: stockCheck.errorMsg,
      };
    }
    const adjustProductCheck =
      await this.productsService.adjustProductStockOnOrder(orderInfo);
    if (adjustProductCheck.error) {
      return {
        success: false,
        orderNumber: null,
        error: true,
        errorItem: stockCheck.errorItem,
        errorMsg: stockCheck.errorMsg,
      };
    }
    try {
      const order = await this.orderService.createOrder(userInfo, orderInfo);
      return {
        success: true,
        orderNumber: order.id,
        error: false,
        errorItem: null,
        errorMsg: null,
      };
    } catch (err) {
      return {
        success: false,
        orderNumber: '',
        error: true,
        errorItem: null,
        errorMsg:
          err?.message ||
          'An error occurred with your order. Please try again.',
      };
    }
  }
}
