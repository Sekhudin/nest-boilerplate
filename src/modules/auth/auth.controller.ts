import { Body, Controller, Post } from "@nestjs/common";
import { SignInLocalDto } from "./dto/requests/sign-in-local.dto";
import { SignUpLocalDto } from "./dto/requests/sign-up-local.dto";
import { SignUpLocalUseCase } from "./use-cases/sign-up-local.use-case";

@Controller("auth")
export class AuthController {
  constructor(private readonly signUpLocalUseCase: SignUpLocalUseCase) {}

  @Post("signup")
  signup(@Body() signUpLocalDto: SignUpLocalDto) {
    return this.signUpLocalUseCase.execute(signUpLocalDto);
  }

  @Post("signin")
  signin(@Body() signInLocalDto: SignInLocalDto) {}
}
