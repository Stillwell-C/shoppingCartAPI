import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class OrderItem {
  @Field()
  searchName: string;

  @Field((type) => Int)
  qty: number;

  @Field((type) => Float)
  price: number;
}
