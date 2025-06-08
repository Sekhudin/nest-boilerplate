import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtAccessConfig } from "src/config/jwt-access.config";
import { jwtRefreshConfig } from "src/config/jwt-refresh.config";
import { Payload } from "src/shared/dto/payload.dto";

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  signRefreshToken(payload: Payload) {
    return this.jwtService.signAsync(Payload.schema.validate(payload), jwtRefreshConfig.signOptions);
  }

  signAccessToken(payload: Payload) {
    return this.jwtService.signAsync(Payload.schema.validate(payload), jwtAccessConfig.signOptions);
  }

  async signToken(payload: Payload) {
    const [refreshToken, accessToken] = await Promise.all([
      this.signRefreshToken(payload),
      this.signAccessToken(payload),
    ]);
    return { refreshToken, accessToken };
  }
}
