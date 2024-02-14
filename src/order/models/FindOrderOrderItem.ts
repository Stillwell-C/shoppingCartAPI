import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/products/models/Product.model';

@ObjectType()
export class FindOrderOrderItem {
  @Field(() => ID)
  id: string;

  @Field()
  orderId: string;

  @Field()
  searchName: string;

  @Field(() => Int)
  qty: number;

  @Field(() => Float)
  price: number;

  @Field(() => Product)
  Product: Product;
}
