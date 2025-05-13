import { Controller, Post, Body, Get } from "@nestjs/common";
import { Profiler, ProfilerValue } from "src/shared/decorators/params/common";
import { AuthToken, EnsureValid, Serialize } from "src/shared/decorators/common";
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

  @Post("/signin")
  @EnsureValid(signInSchema, "body")
  @Serialize(SignInDto)
  async signIn(@Body() signInDto: SignInDto, @Profiler() profiler: ProfilerValue) {
    // return await this.authService.signIn(signInDto);
    return signInDto;
  }

  @Get("/signout")
  @AuthToken()
  async signOut() {
    return await this.authService.signOut("");
  }
}
