import { Controller, Post, Body, Get } from "@nestjs/common";
import { Profiler, ProfilerValue, User, UserValue } from "src/shared/decorators/params/common";
import { AuthToken, EnsureValid } from "src/shared/decorators/common";
import { signInSchema, SignInDto } from "./dto/body/sign-in.body";
import { createUserSchema, CreateUserDto } from "./dto/body/sign-up-body";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  @EnsureValid(createUserSchema, "body")
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto);
  }

  @Get("/signin")
  @EnsureValid(signInSchema, "body")
  async signIn(@Body() signInDto: SignInDto, @Profiler() profiler: ProfilerValue) {
    return await this.authService.signIn(signInDto);
  }

  @Get("/signout")
  @AuthToken()
  async signOut() {
    return await this.authService.signOut("");
  }
}
