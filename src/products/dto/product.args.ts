import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsString, ValidateIf } from 'class-validator';

@ArgsType()
export class ProductArgs {
  @Field({ nullable: true })
  @IsString()
  @ValidateIf((object) => object.hasOwnProperty('searchName'))
  searchName?: string;

  @Field((type) => Int, { nullable: true })
  @IsInt()
  @ValidateIf((object) => object.hasOwnProperty('SKU'))
  SKU?: number;
}
