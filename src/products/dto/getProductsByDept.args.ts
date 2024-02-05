import { ArgsType, Field } from '@nestjs/graphql';
import { AllowedDepartments } from '../models/AllowedDepartments';

@ArgsType()
export class GetProductsByDeptArgs {
  @Field((type) => AllowedDepartments, { nullable: true })
  dept?: AllowedDepartments;
}
