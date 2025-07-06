import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Validate } from "src/shared/decorators/method/validate.decorator";
import { AuthService } from "./auth.service";
import { SignUpLocalDto } from "./dto/sign-up-local.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @Validate(SignUpLocalDto, "body")
  signup(@Body() signUpLocalDto: SignUpLocalDto) {
    console.log(signUpLocalDto);
    return signUpLocalDto;
  }
}
