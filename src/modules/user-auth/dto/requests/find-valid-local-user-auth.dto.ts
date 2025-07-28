import { ApiProperty } from "@nestjs/swagger";
import { UserAuth } from "src/modules/user-auth/entities/user-auth.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Schema, schema, zr } from "src/utils/validation";

const findValidLocalUserAuth = schema(
  UserAuth.dto.pick({ user: true }).extend({
    password: zr.password(),
  }),
);

export class FindValidLocalUserAuthDto extends Schema(findValidLocalUserAuth) {
  @ApiProperty()
  user: User;

  @ApiProperty()
  password: string;
}
