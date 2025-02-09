import { Injectable } from "@nestjs/common";
import { JWTService } from "src/shared/services/jwt.service";
import { UserService } from "src/modules/users/user.service";
import { SignUpBody } from "./dto/bodies/sign-up.body";
import { SignInBody } from "./dto/bodies/sign-in-body";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JWTService,
    private readonly UserService: UserService,
  ) {}

  async signUp(signUpBody: SignUpBody) {
    return { message: "hehe" };
  }

  async signIn(signInBody: SignInBody) {}
}
