import { ArgsType, Field } from '@nestjs/graphql';
import { Departments } from '@prisma/client';

@ArgsType()
export class GetProductsArgs {
  @Field((type) => Departments, { nullable: true })
  dept?: Departments;
}
