import { Injectable } from '@nestjs/common';
import { Product } from './models/Product.model';
import { mockProductData } from 'src/__mocks__/productData';
import { AllowedDepartments } from './models/AllowedDepartments';
import { Cart } from 'src/cart/models/Cart.model';

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

  confirmProductStock(cart: Cart) {}

  adjustProductStockOnOrder(cart: Cart) {
    for (const orderedProduct of cart.productArr) {
      const stockProduct = mockProductData.find(
        (product) => product.SKU === orderedProduct.item_SKU,
      );

      stockProduct.stock -= orderedProduct.quantity;
    }
  }
}
