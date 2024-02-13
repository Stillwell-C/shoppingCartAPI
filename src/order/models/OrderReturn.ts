import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OrderReturn {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  orderNumber: string;

  @Field()
  error: boolean;

  @Field({ nullable: true })
  errorItem: string;

  @Field({ nullable: true })
  errorMsg: string;
}
