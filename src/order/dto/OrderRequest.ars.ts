import { ArgsType, Field } from '@nestjs/graphql';
import { UserInfo } from '../models/UserInfo';
import { OrderItem } from '../models/OrderItem';
import { Prisma } from '@prisma/client';

@ArgsType()
export class OrderRequest {
  @Field()
  userInfo: UserInfo;

  @Field((type) => [OrderItem])
  orderInfo: Prisma.OrderItemCreateInput[];
}
