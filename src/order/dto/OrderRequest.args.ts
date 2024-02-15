import { ArgsType, Field, Float } from '@nestjs/graphql';
import { UserInfo } from './UserInfo';
import { OrderItem } from './OrderItem';
import { Prisma } from '@prisma/client';
import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsObject,
  Min,
} from 'class-validator';

@ArgsType()
export class OrderRequest {
  @Field()
  @IsObject()
  userInfo: UserInfo;

  @Field((type) => [OrderItem])
  @IsArray()
  @ArrayNotEmpty()
  orderInfo: Prisma.OrderItemCreateManyInput[];

  @Field((type) => Float)
  @IsNumber()
  @Min(0)
  orderTotal: number;
}
