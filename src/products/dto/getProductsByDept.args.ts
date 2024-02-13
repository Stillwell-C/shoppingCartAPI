import { ArgsType, Field } from '@nestjs/graphql';
import { Departments } from '@prisma/client';

@ArgsType()
export class GetProductsByDeptArgs {
  @Field((type) => Departments, { nullable: true })
  dept?: Departments;
}
