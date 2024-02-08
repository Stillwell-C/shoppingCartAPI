import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OrderReturn } from './models/OrderReturn';
import { OrderRequest } from './dto/OrderRequest.ars';
import { ProductsService } from 'src/products/products.service';

@Resolver()
export class OrderResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation((returns) => OrderReturn)
  addOrder(@Args() args: OrderRequest) {
    const { userInfo, orderInfo } = args;
    console.log(userInfo, orderInfo);
    const stockCheck = this.productsService.confirmProductStock(orderInfo);
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
      this.productsService.adjustProductStockOnOrder(orderInfo);
    if (adjustProductCheck.error) {
      return {
        success: false,
        orderNumber: null,
        error: true,
        errorItem: stockCheck.errorItem,
        errorMsg: stockCheck.errorMsg,
      };
    }
    return {
      success: true,
      orderNumber: 'testnumber',
      error: false,
      errorItem: null,
      errorMsg: null,
    };
  }
}
