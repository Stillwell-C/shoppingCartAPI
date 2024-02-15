import { ArgsType, Field, Float, Int, registerEnumType } from '@nestjs/graphql';

import { StockLevels, Departments } from '@prisma/client';
import { IsEnum, IsInt, IsString, Min } from 'class-validator';

registerEnumType(StockLevels, { name: 'StockLevels' });
registerEnumType(Departments, { name: 'Departments' });

@ArgsType()
export class CreateProductArgs {
  @Field((type) => Int)
  @IsInt()
  SKU: number;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  searchName: string;

  @Field((type) => Float)
  @IsInt()
  price: number;

  @Field((type) => Departments)
  @IsEnum(Departments)
  dept: Departments;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsString()
  img_id: string;

  @Field((type) => Int)
  @IsInt()
  stock: number;

  @Field((type) => StockLevels)
  @Min(0)
  @IsEnum(Departments)
  stock_level: StockLevels;
}
