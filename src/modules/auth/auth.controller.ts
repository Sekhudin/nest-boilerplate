import { Body, Controller, Post } from "@nestjs/common";
import { CookieService } from "src/shared/modules/global/context/cookie.service";
import { MetaService } from "src/shared/modules/global/meta/meta.service";
import { RefreshAuth } from "src/shared/decorators/method/refresh-auth.guard";
import { SignInLocalDto } from "./dto/requests/sign-in-local.dto";
import { SignUpLocalDto } from "./dto/requests/sign-up-local.dto";
import { RefreshTokenResponse } from "./dto/responses/refresh-token.response";
import { SignInTokenResponse } from "./dto/responses/sign-in-token.response";
import { SignUpLocalOtpResponse } from "./dto/responses/sign-up-local-otp.response";
import { RefreshTokenUseCase } from "./use-cases/refresh-token.use-case";
import { SignInLocalUseCase } from "./use-cases/sign-in-local.use-case";
import { SignUpLocalUseCase } from "./use-cases/sign-up-local.use-case";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly cookieService: CookieService,
    private readonly signUpLocalUseCase: SignUpLocalUseCase,
    private readonly signInLocalUseCase: SignInLocalUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly metaservice: MetaService,
  ) {}

  @Post("signup")
  async signupLocal(@Body() signUpLocalDto: SignUpLocalDto) {
    const data = await this.signUpLocalUseCase.execute(signUpLocalDto);
    return SignUpLocalOtpResponse.from(data, this.metaservice.build());
  }

  @Post("signin")
  async signinLocal(@Body() signInLocalDto: SignInLocalDto) {
    const data = await this.signInLocalUseCase.execute(signInLocalDto);
    this.cookieService.setRefreshToken(data.refreshToken);
    return SignInTokenResponse.from(data, this.metaservice.build());
  }

  @Post("refresh")
  @RefreshAuth()
  async refreshToken() {
    const refreshToken = this.cookieService.getRefreshToken();
    const accessToken = await this.refreshTokenUseCase.execute(refreshToken);
    return RefreshTokenResponse.from({ accessToken }, this.metaservice.build());
  }
}
