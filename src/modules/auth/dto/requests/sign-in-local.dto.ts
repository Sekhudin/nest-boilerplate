import { ApiProperty } from "@nestjs/swagger";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { User } from "src/modules/user/entities/user.entity";
import { schema, Schema, z } from "src/utils/validation";

const signInLocal = schema(
  User.dto
    .pick({ email: true })
    .extend({ password: z.string(ErrorCode.STRING_INVALID).min(1, ErrorCode.STRING_EMPTY) }),
);

export class SignInLocalDto extends Schema(signInLocal) {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
