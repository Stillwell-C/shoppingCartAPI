import { ArgsType, Field } from '@nestjs/graphql';
import { Departments } from '@prisma/client';
import { IsEnum, ValidateIf } from 'class-validator';

@ArgsType()
export class GetProductsArgs {
  @Field((type) => Departments, { nullable: true })
  @ValidateIf((object) => object.hasOwnProperty('dept'))
  @IsEnum(Departments)
  dept?: Departments | null;
}
