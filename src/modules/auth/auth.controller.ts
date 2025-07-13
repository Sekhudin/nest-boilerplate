import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpLocalDto } from "./dto/sign-up-local.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() signUpLocalDto: SignUpLocalDto) {
    return this.authService.signUpLocal(signUpLocalDto);
  }
}
