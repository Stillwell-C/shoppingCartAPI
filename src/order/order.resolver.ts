import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderReturn } from './models/OrderReturn';
import { OrderRequest } from './dto/OrderRequest.ars';
import { ProductsService } from 'src/products/products.service';
import { OrderService } from './order.service';
import { Prisma } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';
import { FindOrderReturnData } from './models/FindOrderReturnData';

@Resolver()
export class OrderResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly orderService: OrderService,
  ) {}

  @Query((returns) => FindOrderReturnData)
  async order(@Args('orderID') orderID: string) {
    const order = await this.orderService.findOrder(orderID);
    if (order.id) {
      const orderObj = {
        id: order.id,
        orderDate: order.createdAt,
        orderStatus: order.orderStatus,
        orderItems: order.orderItems,
      };
      return orderObj;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Order not found. Please reconfirm ID.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

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
