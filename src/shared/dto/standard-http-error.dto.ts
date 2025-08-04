import { ApiProperty } from "@nestjs/swagger";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export class StandardHttpError {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ enum: ErrorCode, example: ErrorCode.VALIDATION_FAILED })
  message: ErrorCode;

  @ApiProperty({
    type: "object",
    additionalProperties: {
      type: "array",
      items: { enum: Object.values(ErrorCode) },
    },
    example: {
      email: [ErrorCode.USER_EMAIL_ALREADY_USED],
    },
  })
  errors: {
    [x: string]: ErrorCode[];
  };
}
