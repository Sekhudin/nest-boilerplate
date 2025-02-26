import { Injectable } from "@nestjs/common";
import { JWTService } from "src/shared/services/jwt.service";
import { UserService } from "src/modules/users/user.service";
import { SignInDto } from "./dto/body/sign-in.body";
import { CreateUserDto } from "./dto/body/sign-up-body";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JWTService,
    private readonly UserService: UserService,
  ) {}

  async signUp(signUpBody: CreateUserDto) {
    return { message: "hehe" };
  }

  async signIn(signInDto: SignInDto) {
    return "signin";
  }

  async signOut(id: string) {}
}
