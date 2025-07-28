import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/shared/base/base.use-case";
import { AuthHistoryService } from "src/modules/auth-history/auth-history.service";
import { SignInLocalDto } from "src/modules/auth/dto/requests/sign-in-local.dto";
import { TokenService } from "src/modules/token/token.service";
import { UserAuthService } from "src/modules/user-auth/user-auth.service";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class SignInLocalUseCase implements BaseUseCase<SignInLocalDto, AuthenticationToken> {
  constructor(
    private readonly userService: UserService,
    private readonly userAuthService: UserAuthService,
    private readonly tokenService: TokenService,
    private readonly authHistoryService: AuthHistoryService,
    private readonly dataSource: DataSource,
  ) {}

  execute({ email, password }: SignInLocalDto): Promise<AuthenticationToken> {
    return this.dataSource.transaction(async (entityManager) => {
      const user = await this.userService.findRegisteredUserOrThrow(email, entityManager);
      const authMethod = await this.userAuthService.findValidLocalUserAuthOrThrow({ user, password }, entityManager);
      const authenticationToken = await this.tokenService.createAuthenticationToken(
        { user, provider: authMethod.provider },
        entityManager,
      );
      await this.authHistoryService.recordSignIn(user, entityManager);
      return authenticationToken;
    });
  }
}
