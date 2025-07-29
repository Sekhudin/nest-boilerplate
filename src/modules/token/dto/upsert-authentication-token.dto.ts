import { ApiProperty } from "@nestjs/swagger";
import { AuthProvider } from "src/modules/auth-provider/entities/auth-provider.entity";
import { Token } from "src/modules/token/entities/token.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Schema, schema } from "src/utils/validation";

const upsertAuthenticationToken = schema(
  Token.dto.pick({ user: true }).extend({
    provider: AuthProvider.plainDto,
  }),
);

export class UpsertAuthenticationTokenDto extends Schema(upsertAuthenticationToken) {
  @ApiProperty()
  user: User;

  @ApiProperty()
  provider: AuthProvider;
}
