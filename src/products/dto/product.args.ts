import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@ArgsType()
export class ProductArgs {
  @Field({ nullable: true })
  @IsString()
  searchName?: string;

  @Field((type) => Int, { nullable: true })
  @IsInt()
  SKU?: number;
}
