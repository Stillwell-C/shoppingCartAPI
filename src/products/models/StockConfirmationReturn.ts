import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StockConfirmationReturn {
  @Field()
  error: boolean;

  @Field()
  errorProduct: string;

  @Field()
  errorMsg: string;
}
