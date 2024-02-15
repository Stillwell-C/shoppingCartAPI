import { ArgsType, Field } from '@nestjs/graphql';
import { Departments } from '@prisma/client';
import { IsEnum } from 'class-validator';

@ArgsType()
export class GetProductsArgs {
  @Field((type) => Departments, { nullable: true })
  @IsEnum(Departments)
  dept?: Departments;
}
