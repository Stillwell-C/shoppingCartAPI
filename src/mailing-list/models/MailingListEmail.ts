import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MailingListEmail {
  @Field()
  email: string;

  @Field()
  createdAt: string;

  @Field((type) => ID)
  id: string;
}
