import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/modules/user/entities/user.entity";
import { schema, Schema, z, zr } from "src/utils/validation";

const createLocalUser = schema(
  User.dto
    .pick({
      email: true,
    })
    .extend({
      password: zr.password(),
    }),
);

export class CreateLocalUserDto extends Schema(createLocalUser) {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
