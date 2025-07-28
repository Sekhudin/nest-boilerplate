import { ApiProperty } from "@nestjs/swagger";
import { AuthProvider } from "src/modules/auth-provider/entities/auth-provider.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Schema, schema } from "src/utils/validation";
import { Token } from "../entities/token.entity";

const createAuthenticationToken = schema(
  Token.dto.pick({ user: true }).extend({
    provider: AuthProvider.plainDto,
  }),
);

export class CreateAuthenticationTokenDto extends Schema(createAuthenticationToken) {
  @ApiProperty()
  user: User;

  @ApiProperty()
  provider: AuthProvider;
}
