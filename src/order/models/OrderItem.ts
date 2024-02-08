import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class OrderItem {
  @Field()
  searchName: string;

  @Field((type) => Int)
  qty: number;
}
