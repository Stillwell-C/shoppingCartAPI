import { Injectable } from '@nestjs/common';
import { CreateEmailInput } from './dto/create-email.args';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MailingListService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(args) {
    return this.databaseService.mailingListEmail.create({
      data: { email: args.email },
    });
  }

  findAll() {
    return `This action returns all mailingList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mailingList`;
  }

  remove(id: number) {
    return `This action removes a #${id} mailingList`;
  }
}
