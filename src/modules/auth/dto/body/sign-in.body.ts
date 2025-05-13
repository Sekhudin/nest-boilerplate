import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { z, zz, createSchema, Dto } from "src/utils/validation.util";

export const signInSchema = createSchema(
  z.object({
    username: zz.username(),
    password: zz.password(),
  }),
);

// not solved
export class SignInDto implements Dto<typeof signInSchema> {
  @ApiProperty()
  username: string;

  @ApiProperty()
  @Exclude()
  password: string;
}
