import { ApiProperty } from "@nestjs/swagger";
import { z, zz, createSchema, Dto } from "src/utils/validation.util";

export const updateUserSchema = createSchema(
  z.object({
    email: zz.email(),
    username: zz.username(),
    password: zz.password(),
  }),
);

export class UpdateUserDto implements Dto<typeof updateUserSchema> {
  @ApiProperty({ required: false })
  username: string;

  @ApiProperty({ required: false })
  email: string;

  @ApiProperty({ required: false })
  password: string;
}
