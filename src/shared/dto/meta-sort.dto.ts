import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { Schema, schema, z } from "src/utils/validation";

export const metaSort = z.object({
  field: z.string(ErrorCode.STRING_INVALID),
  direction: z.enum(["asc", "desc"], ErrorCode.ENUM_INVALID),
});

export class MetaSortDto extends Schema(schema(metaSort)) {
  @Expose()
  @ApiProperty()
  field: string;

  @Expose()
  @ApiProperty({ enum: ["asc", "desc"], default: "asc" })
  direction: "asc" | "desc";
}
