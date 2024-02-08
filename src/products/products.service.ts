import { Injectable } from '@nestjs/common';
import { Product } from './models/Product.model';
import { mockProductData } from 'src/__mocks__/productData';
import { AllowedDepartments } from './models/AllowedDepartments';
import { Cart } from 'src/cart/models/Cart.model';
import { OrderItem } from 'src/order/models/OrderItem';

@Injectable()
export class ProductsService {
  findBySKU(id: number) {
    return mockProductData.find((product) => product.SKU === id);
  }

  findBySearchName(searchName: string) {
    return mockProductData.find((product) => product.searchName === searchName);
  }

  findByDept(dept: AllowedDepartments) {
    return mockProductData.filter((product) => product.dept === dept);
  }

  confirmProductStock(orderItems: OrderItem[]) {
    for (const item of orderItems) {
      const product = this.findBySearchName(item.searchName);
      if (!product.stock) {
        return {
          error: true,
          errorMsg: 'Out of stock.',
          errorItem: product.searchName,
        };
      }
      if (product.stock < item.qty) {
        return {
          error: true,
          errorMsg:
            'Insufficient stock. Please reduce item quantity and try again.',
          errorItem: product.searchName,
        };
      }
    }
    return { error: false, errorMsg: '', errorItem: null };
  }

  adjustProductStockOnOrder(orderItems: OrderItem[]) {
    for (const item of orderItems) {
      const product = this.findBySearchName(item.searchName);
      //Combine with top function logic
      if (!product.stock) {
        return {
          error: true,
          errorMsg: 'Out of stock.',
          errorItem: product.searchName,
        };
      }
      if (product.stock < item.qty) {
        return {
          error: true,
          errorMsg:
            'Insufficient stock. Please reduce item quantity and try again.',
          errorItem: product.searchName,
        };
      }
      product.stock -= item.qty;
    }
    return { error: false, errorMsg: '', errorItem: null };
  }
}
