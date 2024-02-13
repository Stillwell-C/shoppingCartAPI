import { Injectable } from '@nestjs/common';
import { mockProductData } from 'src/__mocks__/productData';
import { AllowedDepartments } from './models/AllowedDepartments';
import { Cart } from 'src/cart/models/Cart.model';
import { OrderItem } from 'src/order/models/OrderItem';
import { AllowedStockLevels } from './models/AllowedStockLevels';
import { DatabaseService } from 'src/database/database.service';
import { Departments, Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  findBySKU(id: number) {
    return mockProductData.find((product) => product.SKU === id);
  }

  async findBySearchName(searchName: string): Promise<Product> {
    // return mockProductData.find((product) => product.searchName === searchName);
    return this.databaseService.product.findFirst({ where: { searchName } });
  }

  findByDept(dept?: Departments) {
    // return mockProductData.filter((product) => product.dept === dept);
    if (!dept) {
      return this.databaseService.product.findMany();
    }

    return this.databaseService.product.findMany({ where: { dept } });
  }

  async createProduct(
    productData: Prisma.ProductCreateInput,
  ): Promise<Product> {
    return this.databaseService.product.create({ data: productData });
  }

  async updateProduct(
    id: string,
    updateData: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    return this.databaseService.product.update({
      where: {
        id,
      },
      data: updateData,
    });
  }

  async confirmProductStock(orderItems: OrderItem[]) {
    for (const item of orderItems) {
      const product = await this.findBySearchName(item.searchName);
      if (!product.stock) {
        return {
          error: true,
          errorMsg: 'Out of stock. Please remove from cart and try again.',
          errorItem: product.name,
        };
      }
      if (product.stock < item.qty) {
        return {
          error: true,
          errorMsg:
            'Insufficient stock. Please reduce item quantity and try again.',
          errorItem: product.name,
        };
      }
    }
    return { error: false, errorMsg: '', errorItem: null };
  }

  async adjustProductStockOnOrder(orderItems: OrderItem[]) {
    for (const item of orderItems) {
      const product = await this.findBySearchName(item.searchName);
      //Combine with top function logic
      if (!product.stock) {
        return {
          error: true,
          errorMsg: 'Out of stock. Please remove from cart and try again.',
          errorItem: product.name,
        };
      }
      if (product.stock < item.qty) {
        return {
          error: true,
          errorMsg:
            'Insufficient stock. Please reduce item quantity and try again.',
          errorItem: product.name,
        };
      }
      product.stock -= item.qty;
      // if (product.stock <= 25) {
      //   product.stock_level = AllowedStockLevels.LOW;
      // }
      // if (product.stock === 0) {
      //   product.stock_level = AllowedStockLevels.OUT;
      // }
    }
    return { error: false, errorMsg: '', errorItem: null };
  }
}
