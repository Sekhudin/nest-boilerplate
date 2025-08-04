import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { ErrorCode } from "src/shared/enums/error-code.enum";
import { Schema, schema, z } from "src/utils/validation";
import { metaFilters } from "./meta-filters.dto";
import { metaPagination } from "./meta-pagination.dto";
import { metaSort } from "./meta-sort.dto";

const metadata = schema(
  z.object({
    requestId: z.string(ErrorCode.STRING_INVALID),
    executionTime: z.string(ErrorCode.STRING_INVALID),
    timestamp: z.string(ErrorCode.STRING_INVALID),
    pagination: metaPagination.optional(),
    sort: metaSort.optional(),
    filters: metaFilters.optional(),
  }),
);

export class MetadataDto extends Schema(metadata) {
  @Expose()
  @ApiProperty()
  requestId: string;

  @Expose()
  @ApiProperty()
  executionTime: string;

  @Expose()
  @ApiProperty()
  timestamp: string;
}
