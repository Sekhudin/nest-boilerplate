import { Request } from "express";
import { Controller, Post, Body, Req, Get } from "@nestjs/common";
import { Profiler, ProfilerValue } from "src/shared/decorators/params/common";
import { AuthService } from "./auth.service";
import { SignUpBody } from "./dto/bodies/sign-up.body";
import { SignInBody } from "./dto/bodies/sign-in-body";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async signUp(@Req() req: Request, @Body() signUpBody: SignUpBody) {
    return await this.authService.signUp(signUpBody);
  }

  @Get("/signin")
  async signIn(@Body() signInBody: SignInBody, @Profiler() profiler: ProfilerValue) {
    console.log("profile", profiler);
    return await this.authService.signUp(signInBody);
  }
}
