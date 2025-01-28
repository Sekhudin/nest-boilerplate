import { Test, TestingModule } from '@nestjs/testing';
import { AuthProviderController } from './auth-provider.controller';
import { AuthProviderService } from './auth-provider.service';

describe('AuthProviderController', () => {
  let controller: AuthProviderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthProviderController],
      providers: [AuthProviderService],
    }).compile();

    controller = module.get<AuthProviderController>(AuthProviderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
