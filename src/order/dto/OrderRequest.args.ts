import { ArgsType, Field, Float } from '@nestjs/graphql';
import { UserInfo } from './UserInfo';
import { OrderItem } from './OrderItem';
import { Prisma } from '@prisma/client';

@ArgsType()
export class OrderRequest {
  @Field()
  userInfo: UserInfo;

  @Field((type) => [OrderItem])
  orderInfo: Prisma.OrderItemCreateManyInput[];

  @Field((type) => Float)
  orderTotal: number;
}
