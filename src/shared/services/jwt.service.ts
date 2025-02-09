import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import type { JwtAuthParams } from "src/types/global.type";
import { jwtRefreshConfig, jwtAccessConfig } from "src/configs/jwt.config";

@Injectable()
export class JWTService {
  constructor(private jwt: JwtService) {}

  decode = this.jwt.decode;
  sign = this.jwt.sign;
  signAsync = this.jwt.signAsync;
  verify = this.jwt.verify;
  verifyAsync = this.jwt.verifyAsync;

  async signRefreshToken(params: JwtAuthParams) {
    return await this.jwt.signAsync(params, jwtRefreshConfig.signOptions);
  }

  async verifyRefreshToken(token: string) {
    return await this.jwt.verifyAsync(token, jwtRefreshConfig.verifyOptions);
  }

  async signAccessToken(params: JwtAuthParams) {
    return await this.jwt.signAsync(params, jwtAccessConfig.signOptions);
  }

  async verifyAccessToken(token: string) {
    return await this.jwt.verifyAsync(token, jwtAccessConfig.verifyOptions);
  }

  async signAuthToken(params: JwtAuthParams): Promise<Record<"refresh" | "access", string>> {
    const refresh = await this.signRefreshToken(params);
    const access = await this.signAccessToken(params);
    return { access, refresh };
  }
}
