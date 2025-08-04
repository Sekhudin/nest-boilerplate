import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { Schema, schema, z } from "src/utils/validation";

export const metaPagination = z.object({
  page: z.number(ErrorCode.NUMBER_INVALID),
  limit: z.number(ErrorCode.NUMBER_INVALID),
  totalItems: z.number(ErrorCode.NUMBER_INVALID),
  totalPages: z.number(ErrorCode.NUMBER_INVALID),
  itemCount: z.number(ErrorCode.NUMBER_INVALID),
});

export class MetaPaginationDto extends Schema(schema(metaPagination)) {
  @Expose()
  @ApiProperty()
  page: number;

  @Expose()
  @ApiProperty()
  limit: number;

  @Expose()
  @ApiProperty()
  totalItems: number;

  @Expose()
  @ApiProperty()
  totalPages: number;

  @Expose()
  @ApiProperty()
  itemCount: number;
}
