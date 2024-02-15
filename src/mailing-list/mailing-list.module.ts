import { Module } from '@nestjs/common';
import { MailingListService } from './mailing-list.service';
import { MailingListResolver } from './mailing-list.resolver';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [MailingListResolver, MailingListService],
})
export class MailingListModule {}
