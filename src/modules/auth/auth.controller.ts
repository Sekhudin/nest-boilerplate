import { Controller, Post, Body, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpBody } from "./dto/bodies/sign-up.body";
import { SignInBody } from "./dto/bodies/sign-in-body";
import { Request } from "express";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async signUp(@Req() req: Request, @Body() signUpBody: SignUpBody) {
    return await this.authService.signUp(signUpBody);
  }

  @Post("/signin")
  async signIn(@Body() signInBody: SignInBody) {
    return await this.authService.signUp(signInBody);
  }
}
