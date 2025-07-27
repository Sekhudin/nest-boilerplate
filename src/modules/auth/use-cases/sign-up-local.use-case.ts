import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/shared/base/base.use-case";
import { AuthProviderService } from "src/modules/auth-provider/auth-provider.service";
import { SignUpLocalDto } from "src/modules/auth/dto/requests/sign-up-local.dto";
import { Otp } from "src/modules/otp/entities/otp.entity";
import { OtpService } from "src/modules/otp/otp.service";
import { RoleService } from "src/modules/role/role.service";
import { UserAuthService } from "src/modules/user-auth/user-auth.service";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class SignUpLocalUseCase implements BaseUseCase<SignUpLocalDto, Otp> {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly userAuthService: UserAuthService,
    private readonly otpService: OtpService,
    private readonly authProviderService: AuthProviderService,
    private readonly dataSource: DataSource,
  ) {}

  execute({ email, password }: SignUpLocalDto): Promise<Otp> {
    return this.dataSource.transaction(async (entityManager) => {
      const role = await this.roleService.findOrCreateDefaultRole(entityManager);
      const user = await this.userService.createLocalUser({ email, role }, entityManager);
      const provider = await this.authProviderService.findOrCreateLocalAuthProvider(entityManager);
      const authUser = await this.userAuthService.createLocalUserAuth({ user, provider, password }, entityManager);
      const generatedOtp = await this.otpService.sendOtpForLocalSignup(authUser.user, entityManager);
      return generatedOtp;
    });
  }
}
