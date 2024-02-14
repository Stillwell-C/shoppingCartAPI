import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FindOrderOrderItem {
  @Field(() => ID)
  orderId: string;

  @Field()
  searchName: string;

  @Field(() => Int)
  qty: number;
}
