import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/modules/role/entities/role.entity";
import { User } from "src/modules/user/entities/user.entity";
import { schema, Schema } from "src/utils/validation";

const createLocalUser = schema(
  User.dto.pick({
    email: true,
    role: true,
  }),
);

export class CreateLocalUserDto extends Schema(createLocalUser) {
  @ApiProperty()
  email: string;

  @ApiProperty()
  role: Role;
}
