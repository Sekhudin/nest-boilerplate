import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/shared/base/base.use-case";
import { AuthHistoryService } from "src/modules/auth-history/auth-history.service";
import { Token } from "src/modules/token/entities/token.entity";
import { TokenService } from "src/modules/token/token.service";

@Injectable()
export class SignOutUseCase implements BaseUseCase<string, Token> {
  constructor(
    private readonly tokenService: TokenService,
    private readonly authHistoryService: AuthHistoryService,
    private readonly dataSource: DataSource,
  ) {}

  execute(refreshToken: string): Promise<Token> {
    return this.dataSource.transaction(async (entityManager) => {
      const token = await this.tokenService.signOutAndRemoveToken(refreshToken, entityManager);
      await this.authHistoryService.recordSignOut(token.user, entityManager);
      return token;
    });
  }
}
