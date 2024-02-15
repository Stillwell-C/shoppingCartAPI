import { Test, TestingModule } from '@nestjs/testing';
import { MailingListResolver } from './mailing-list.resolver';
import { MailingListService } from './mailing-list.service';

describe('MailingListResolver', () => {
  let resolver: MailingListResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailingListResolver, MailingListService],
    }).compile();

    resolver = module.get<MailingListResolver>(MailingListResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
