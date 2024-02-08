import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrderReturn {
  @Field()
  success: boolean;

  @Field()
  orderNumber: string;

  @Field()
  error: boolean;

  @Field({ nullable: true })
  errorItem: string;

  @Field({ nullable: true })
  errorMsg: string;
}
