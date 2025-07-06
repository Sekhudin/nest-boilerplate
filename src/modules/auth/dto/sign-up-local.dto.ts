import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/modules/user/entities/user.entity";
import { schema, Schema, z } from "src/utils/validation";
import { isNotMatch } from "src/utils";

const signUpLocal = schema(
  User.dto
    .pick({
      email: true,
      password: true,
    })
    .extend({
      confirmPassword: z.string().min(1),
    })
    .check((context) => {
      if (isNotMatch(context.value.password, context.value.confirmPassword)) {
        context.issues.push({
          code: "custom",
          input: context.value.confirmPassword,
          message: "password and confirm password not match!",
        });
      }
    }),
);

export class SignUpLocalDto extends Schema(signUpLocal) {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  confirmPassword: string;
}
