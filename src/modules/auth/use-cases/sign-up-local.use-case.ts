import { DataSource } from "typeorm";
import { GeneratedOtp } from "otplib";
import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/shared/base/base.use-case";
import { SignUpLocalDto } from "src/modules/auth/dto/requests/sign-up-local.dto";
import { UserAuthService } from "src/modules/auth/services/user-auth.service";
import { OtpService } from "src/modules/otp/otp.service";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class SignUpLocalUseCase implements BaseUseCase<SignUpLocalDto, GeneratedOtp> {
  constructor(
    private readonly userService: UserService,
    private readonly userAuthService: UserAuthService,
    private readonly otpService: OtpService,
    private readonly datasource: DataSource,
  ) {}

  async execute(inputDto: SignUpLocalDto): Promise<GeneratedOtp> {
    return await this.datasource.transaction(async (entityManager) => {
      const user = await this.userService.createLocalUser(inputDto, entityManager);
      const authUser = await this.userAuthService.createLocalUserAuth(user, inputDto.password, entityManager);
      const generatedOtp = await this.otpService.sendOtpForLocalSignup(authUser.user, entityManager);
      return generatedOtp;
    });
  }
}
