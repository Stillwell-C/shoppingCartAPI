import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Departments, Prisma, Product, StockLevels } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findProduct(searchName?: string, SKU?: number) {
    return this.databaseService.product.findUnique({
      where: {
        searchName,
        SKU,
      },
    });
  }

  async findProducts(dept?: Departments) {
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

  async confirmProductStock(orderItems: Prisma.OrderItemCreateManyInput[]) {
    for (const item of orderItems) {
      const product = await this.findProduct(item.searchName);
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

  async adjustProductStockOnOrder(
    orderItems: Prisma.OrderItemCreateManyInput[],
  ) {
    for (const item of orderItems) {
      const product = await this.findProduct(item.searchName);
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
      let stockUpdate = product.stock_level;
      if (
        product.stock - item.qty <= 25 &&
        product.stock_level !== StockLevels.LOW
      ) {
        stockUpdate = StockLevels.LOW;
      }
      if (
        product.stock - item.qty === 0 &&
        product.stock_level !== StockLevels.OUT
      ) {
        stockUpdate = StockLevels.OUT;
      }
      await this.databaseService.product.update({
        where: {
          searchName: item.searchName,
        },
        data: {
          stock: {
            decrement: item.qty,
          },
          stock_level: stockUpdate,
        },
      });
    }
    return { error: false, errorMsg: '', errorItem: null };
  }

  async returnProductsToStock(orderItems: Prisma.OrderItemCreateManyInput[]) {
    for (const item of orderItems) {
      const product = await this.findProduct(item.searchName);

      let stockUpdate = product.stock_level;

      if (
        product.stock + item.qty > 25 &&
        product.stock_level !== StockLevels.STOCKED
      ) {
        stockUpdate = StockLevels.STOCKED;
      }
      if (
        product.stock + item.qty <= 25 &&
        product.stock_level !== StockLevels.LOW
      ) {
        stockUpdate = StockLevels.LOW;
      }

      await this.databaseService.product.update({
        where: {
          searchName: item.searchName,
        },
        data: {
          stock: {
            increment: item.qty,
          },
          stock_level: stockUpdate,
        },
      });
    }
  }
}
