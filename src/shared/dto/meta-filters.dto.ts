import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { Schema, schema, z } from "src/utils/validation";

export const metaFilters = z.looseObject({
  sortBy: z.string(ErrorCode.STRING_INVALID),
  sortAs: z.enum(["asc", "desc"], ErrorCode.ENUM_INVALID),
});

export class MetaFiltersDto extends Schema(schema(metaFilters)) {
  @Expose()
  @ApiProperty()
  sortBy: string;

  @Expose()
  @ApiProperty({ enum: ["asc", "desc"], default: "asc" })
  sortAs: "asc" | "desc";

  [x: string]: string | number | boolean;
}
