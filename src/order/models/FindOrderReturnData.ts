import { Field, ID, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from '@prisma/client';
import { FindOrderOrderItem } from './FindOrderOrderItem';

@ObjectType()
export class FindOrderReturnData {
  @Field(() => ID)
  id: string;

  @Field()
  orderDate: string;

  @Field()
  orderStatus: OrderStatus;

  @Field(() => [FindOrderOrderItem])
  orderItems: FindOrderOrderItem[];
}
