import { Field, ArgsType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ArgsType()
export class CreateEmailInput {
  @Field()
  @IsEmail()
  email: string;
}
