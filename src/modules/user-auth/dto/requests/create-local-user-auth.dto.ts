import { ApiProperty } from "@nestjs/swagger";
import { AuthProvider } from "src/modules/auth-provider/entities/auth-provider.entity";
import { UserAuth } from "src/modules/user-auth/entities/user-auth.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Schema, schema, zr } from "src/utils/validation";

const createLocalUserAuth = schema(
  UserAuth.dto.pick({ user: true, provider: true }).extend({
    password: zr.password(),
  }),
);

export class CreateLocalUserAuthDto extends Schema(createLocalUserAuth) {
  @ApiProperty()
  user: User;

  @ApiProperty()
  provider: AuthProvider;

  @ApiProperty()
  password: string;
}
