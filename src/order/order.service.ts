import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

type OrderWithItems = Prisma.OrderGetPayload<{
  include: {
    orderItems: {
      include: {
        Product: true;
      };
    };
  };
}>;

@Injectable()
export class OrderService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createOrder(
    orderData: Prisma.OrderCreateInput,
    itemData: Prisma.OrderItemCreateManyInput[],
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

  async findOrder(id: string): Promise<OrderWithItems> {
    return this.databaseService.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            Product: true,
          },
        },
      },
    });
  }

  async deleteOrder(id: string): Promise<Order> {
    return this.databaseService.order.delete({
      where: { id },
    });
  }
}
