import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/shared/base/base.service";
import { OtpService } from "src/modules/otp/otp.service";
import { UserService } from "src/modules/user/user.service";
import { UserAuthService } from "./services/user-auth.service";

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
}
