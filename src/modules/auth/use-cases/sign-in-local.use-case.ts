import { BaseUseCase } from "src/shared/base/base.use-case";
import { SignInLocalDto } from "src/modules/auth/dto/requests/sign-in-local.dto";

export class SignInLocalUseCase implements BaseUseCase<SignInLocalDto, boolean> {
  constructor() {}

  async execute(inputDto: SignInLocalDto): Promise<boolean> {
    return true;
  }
}
