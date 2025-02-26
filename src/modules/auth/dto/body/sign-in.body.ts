import { ApiProperty } from "@nestjs/swagger";
import { z, zz, createSchema, Dto } from "src/utils/validation.util";

export const signInSchema = createSchema(
  z.object({
    username: zz.username(),
    password: zz.password(),
  }),
);

export class SignInDto implements Dto<typeof signInSchema> {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
