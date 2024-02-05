import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AllowedStockLevels } from './AllowedStockLevels';
import { AllowedDepartments } from './AllowedDepartments';

registerEnumType(AllowedStockLevels, { name: 'AllowedStockLevels' });
registerEnumType(AllowedDepartments, { name: 'AllowedDepartments' });

@ObjectType()
export class Product {
  @Field((type) => Int)
  SKU: number;

  @Field()
  name: string;

  @Field()
  searchName: string;

  @Field((type) => Int)
  price: number;

  @Field((type) => AllowedDepartments)
  dept: AllowedDepartments;

  @Field()
  description: string;

  @Field()
  img_id: string;

  @Field((type) => Int)
  stock: number;

  @Field((type) => AllowedStockLevels)
  stock_level: AllowedStockLevels;
}
