import { Test, TestingModule } from '@nestjs/testing';
import { MailingListService } from './mailing-list.service';

describe('MailingListService', () => {
  let service: MailingListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailingListService],
    }).compile();

    service = module.get<MailingListService>(MailingListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
