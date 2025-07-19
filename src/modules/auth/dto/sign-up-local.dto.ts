import { ApiProperty } from "@nestjs/swagger";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { User } from "src/modules/user/entities/user.entity";
import { schema, Schema, z, zr } from "src/utils/validation";

const signUpLocal = schema(
  User.dto
    .pick({
      email: true,
    })
    .extend({
      password: zr.password(),
      confirmPassword: z.string(ErrorCode.STRING_INVALID).min(1, ErrorCode.STRING_EMPTY),
    })
    .check((context) => {
      if (context.value.password !== context.value.confirmPassword) {
        context.issues.push({
          code: "custom",
          input: context.value.confirmPassword,
          message: ErrorCode.PASSWORD_MISMATCH,
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
