import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class ProductArgs {
  @Field({ nullable: true })
  searchName?: string;

  @Field((type) => Int, { nullable: true })
  SKU?: number;
}
