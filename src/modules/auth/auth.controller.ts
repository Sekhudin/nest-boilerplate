import { Body, Controller, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse } from "@nestjs/swagger";
import { CookieService } from "src/shared/modules/global/context/cookie.service";
import { MetaService } from "src/shared/modules/global/meta/meta.service";
import { RefreshAuth } from "src/shared/decorators/method/refresh-auth.guard";
import { StandardHttpError } from "src/shared/dto/standard-http-error.dto";
import { SignInLocalDto } from "./dto/requests/sign-in-local.dto";
import { SignUpLocalDto } from "./dto/requests/sign-up-local.dto";
import { RefreshTokenResponse } from "./dto/responses/refresh-token.response";
import { SignInTokenResponse } from "./dto/responses/sign-in-token.response";
import { SignOutResponse } from "./dto/responses/sign-out.response";
import { SignUpLocalOtpResponse } from "./dto/responses/sign-up-local-otp.response";
import { RefreshTokenUseCase } from "./use-cases/refresh-token.use-case";
import { SignInLocalUseCase } from "./use-cases/sign-in-local.use-case";
import { SignOutUseCase } from "./use-cases/sign-out.use-case";
import { SignUpLocalUseCase } from "./use-cases/sign-up-local.use-case";

@Controller("auth")
@ApiBadRequestResponse({ type: StandardHttpError })
export class AuthController {
  constructor(
    private readonly cookieService: CookieService,
    private readonly signUpLocalUseCase: SignUpLocalUseCase,
    private readonly signInLocalUseCase: SignInLocalUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly signOutUseCase: SignOutUseCase,
    private readonly metaservice: MetaService,
  ) {}

  @Post("signup")
  @ApiCreatedResponse({ type: SignUpLocalOtpResponse })
  async signupLocal(@Body() signUpLocalDto: SignUpLocalDto) {
    const data = await this.signUpLocalUseCase.execute(signUpLocalDto);
    return SignUpLocalOtpResponse.from(data, this.metaservice.build());
  }

  @Post("signin")
  @ApiCreatedResponse({ type: SignInTokenResponse })
  async signinLocal(@Body() signInLocalDto: SignInLocalDto) {
    const data = await this.signInLocalUseCase.execute(signInLocalDto);
    this.cookieService.setRefreshToken(data.refreshToken);
    return SignInTokenResponse.from(data, this.metaservice.build());
  }

  @Post("refresh")
  @RefreshAuth()
  @ApiCreatedResponse({ type: RefreshTokenResponse })
  async refreshToken() {
    const refreshToken = this.cookieService.getRefreshToken();
    const accessToken = await this.refreshTokenUseCase.execute(refreshToken);
    return RefreshTokenResponse.from({ accessToken }, this.metaservice.build());
  }

  @Post("signout")
  @RefreshAuth()
  @ApiCreatedResponse({ type: SignOutResponse })
  async signOut() {
    const refreshToken = this.cookieService.getRefreshToken();
    const data = await this.signOutUseCase.execute(refreshToken);
    return SignOutResponse.from(data, this.metaservice.build());
  }
}
