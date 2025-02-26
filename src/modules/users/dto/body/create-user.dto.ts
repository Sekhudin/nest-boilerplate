import { ApiProperty } from "@nestjs/swagger";
import { z, zz, createSchema, Dto } from "src/utils/validation.util";

export const createUserSchema = createSchema(
  z.object({
    email: zz.email(),
    username: zz.username(),
    password: zz.password(),
  }),
);

export class CreateUserDto implements Dto<typeof createUserSchema> {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
