import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MailingListService } from './mailing-list.service';
import { CreateEmailInput } from './dto/create-email.args';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MailingListEmail } from './models/MailingListEmail';
import { Prisma } from '@prisma/client';

@Resolver()
export class MailingListResolver {
  constructor(private readonly mailingListService: MailingListService) {}

  @Mutation((returns) => MailingListEmail)
  async createEmail(
    @Args()
    args: CreateEmailInput,
  ) {
    try {
      return await this.mailingListService.create(args);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner

        if (err.code === 'P2002') {
          throw new HttpException(
            'Email already on mailing list.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      throw new HttpException(
        err.message || 'An error occurred. Please try again.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // @Query(() => [MailingList], { name: 'mailingList' })
  // findAll() {
  //   return this.mailingListService.findAll();
  // }

  // @Query(() => MailingList, { name: 'mailingList' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.mailingListService.findOne(id);
  // }

  // @Mutation(() => MailingList)
  // removeMailingList(@Args('id', { type: () => Int }) id: number) {
  //   return this.mailingListService.remove(id);
  // }
}
