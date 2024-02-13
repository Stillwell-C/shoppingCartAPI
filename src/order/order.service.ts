import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OrderService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createOrder(
    orderData: Prisma.OrderCreateInput,
    itemData: Prisma.OrderItemCreateInput[],
  ): Promise<Order> {
    return this.databaseService.order.create({
      data: {
        ...orderData,
        orderItems: {
          createMany: {
            data: itemData,
          },
        },
      },
    });
  }
}
