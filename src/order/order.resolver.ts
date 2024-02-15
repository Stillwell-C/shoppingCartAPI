import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderReturn } from './models/OrderReturn';
import { OrderRequest } from './dto/OrderRequest.args';
import { ProductsService } from 'src/products/products.service';
import { OrderService } from './order.service';
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
    try {
      const order = await this.orderService.findOrder(orderID.trim());
      if (order?.id) {
        return order;
      } else {
        throw new HttpException(
          'Order not found. Please reconfirm ID.',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (err) {
      throw new HttpException(
        err.message || 'An error occurred. Please try again.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Mutation((returns) => OrderReturn)
  async addOrder(@Args() args: OrderRequest) {
    const { userInfo, orderInfo, orderTotal } = args;

    //Confirm stock available
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

    //Make adjustments to stock
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
      //Create order
      const order = await this.orderService.createOrder(
        { orderTotal, ...userInfo },
        orderInfo,
      );
      return {
        success: true,
        orderNumber: order.id,
        error: false,
        errorItem: null,
        errorMsg: null,
      };
    } catch (err) {
      //If error occurs, return stock to original
      await this.productsService.returnProductsToStock(orderInfo);

      throw new HttpException(
        err.message || 'An error occurred. Please try again.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Mutation((returns) => FindOrderReturnData)
  async deleteOrder(@Args('id') id: string) {
    try {
      const order = await this.orderService.findOrder(id);

      //Throw error if order is SHIPPED or COMPLETED
      if (
        order.orderStatus !== 'INPROCESS' &&
        order.orderStatus !== 'PENDING'
      ) {
        throw new HttpException(
          `Action could not be completed because order status is: ${order.orderStatus}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const deletedOrder = await this.orderService.deleteOrder(id);

      //Return items from order to stock
      await this.productsService.returnProductsToStock(order.orderItems);

      return deletedOrder;
    } catch (err) {
      throw new HttpException(
        err.message || 'An error occurred. Please try again.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
