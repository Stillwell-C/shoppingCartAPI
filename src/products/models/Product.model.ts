import {
  Field,
  Float,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

import { StockLevels, Departments } from '@prisma/client';

registerEnumType(StockLevels, { name: 'StockLevels' });
registerEnumType(Departments, { name: 'Departments' });

@ObjectType()
export class Product {
  @Field((type) => Int)
  SKU: number;

  @Field()
  name: string;

  @Field()
  searchName: string;

  @Field((type) => Float)
  price: number;

  @Field((type) => Departments)
  dept: Departments;

  @Field()
  description: string;

  @Field()
  img_id: string;

  @Field((type) => Int)
  stock: number;

  @Field((type) => StockLevels)
  stock_level: StockLevels;

  @Field((type) => ID, { nullable: true })
  id?: string;
}
