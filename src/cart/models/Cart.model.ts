import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CartProduct } from './CartProduct';

@ObjectType()
export class Cart {
  @Field((type) => ID)
  id: string;

  @Field()
  productArr: CartProduct[];
}
