import { Test, TestingModule } from '@nestjs/testing';
import { AssociationAuthController } from './association-auth.controller';

describe('AssociationAuthController', () => {
  let controller: AssociationAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssociationAuthController],
    }).compile();

    controller = module.get<AssociationAuthController>(AssociationAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
