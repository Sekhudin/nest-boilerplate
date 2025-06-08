import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtAccessConfig } from "src/config/jwt-access.config";
import { jwtRefreshConfig } from "src/config/jwt-refresh.config";
import { JwtPayload, payloadSchema } from "src/shared/dto/jwt.dto";
import { validate } from "src/utils/validation";

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  signRefreshToken(payload: JwtPayload) {
    return this.jwtService.signAsync(validate(payloadSchema, payload), jwtRefreshConfig.signOptions);
  }

  signAccessToken(payload: JwtPayload) {
    return this.jwtService.signAsync(validate(payloadSchema, payload), jwtAccessConfig.signOptions);
  }

  async signToken(payload: JwtPayload) {
    const [refreshToken, accessToken] = await Promise.all([
      this.signRefreshToken(payload),
      this.signAccessToken(payload),
    ]);
    return { refreshToken, accessToken };
  }
}
