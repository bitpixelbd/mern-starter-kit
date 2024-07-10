import { Test, TestingModule } from '@nestjs/testing';
import { AssociationAuthService } from './association-auth.service';

describe('AssociationAuthService', () => {
  let service: AssociationAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssociationAuthService],
    }).compile();

    service = module.get<AssociationAuthService>(AssociationAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
