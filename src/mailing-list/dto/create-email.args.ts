import { Field, ArgsType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@ArgsType()
export class CreateEmailInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
