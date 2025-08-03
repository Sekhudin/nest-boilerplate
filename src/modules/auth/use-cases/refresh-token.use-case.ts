import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/shared/base/base.use-case";
import { AuthHistoryService } from "src/modules/auth-history/auth-history.service";
import { TokenService } from "src/modules/token/token.service";

@Injectable()
export class RefreshTokenUseCase implements BaseUseCase<string, string> {
  constructor(
    private readonly tokenService: TokenService,
    private readonly authHistoryService: AuthHistoryService,
    private readonly dataSource: DataSource,
  ) {}

  execute(refreshToken: string): Promise<string> {
    return this.dataSource.transaction(async (entityManager) => {
      const result = await this.tokenService.generateAccessTokenFromClaims(refreshToken, entityManager);
      await this.authHistoryService.recordRefresh(result.token.user, entityManager);
      return result.accessToken;
    });
  }
}
