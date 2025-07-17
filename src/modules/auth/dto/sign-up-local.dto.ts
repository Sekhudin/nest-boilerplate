import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/modules/user/entities/user.entity";
import { schema, Schema, z, zr } from "src/utils/validation";

const signUpLocal = schema(
  User.dto
    .pick({
      email: true,
    })
    .extend({
      password: zr.password(),
      confirmPassword: z.string().min(1),
    })
    .check((context) => {
      if (context.value.password !== context.value.confirmPassword) {
        context.issues.push({
          code: "custom",
          input: context.value.confirmPassword,
          message: "password and confirm password not match!",
        });
      }
    })
    .transform(({ email, password }) => ({ email, password })),
);

export class SignUpLocalDto extends Schema(signUpLocal) {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  confirmPassword: string;
}
