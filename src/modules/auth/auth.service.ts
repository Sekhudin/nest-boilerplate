import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { OtpService } from "src/modules/otp/otp.service";
import { UserService } from "src/modules/user/user.service";
import { BaseService } from "src/shared/base/base.service";
import { UserAuthService } from "./services/user-auth.service";
import { SignUpLocalDto } from "./dto/sign-up-local.dto";

@Injectable()
export class AuthService extends BaseService {
  constructor(
    private readonly userService: UserService,
    private readonly userAuthService: UserAuthService,
    private readonly otpService: OtpService,
    private readonly datasource: DataSource,
  ) {
    super();
  }

  async signUpLocal(signUpLocalDto: SignUpLocalDto) {
    return await this.datasource.transaction(async (entityManager) => {
      const user = await this.userService.createLocalUser(signUpLocalDto, entityManager);
      const authUser = await this.userAuthService.createLocalUserAuth(user, signUpLocalDto.password, entityManager);
      await this.otpService.sendOtpForLocalSignup(authUser.user, entityManager);
      return user;
    });
  }
}
