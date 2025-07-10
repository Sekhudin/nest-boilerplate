import { ApiProperty } from "@nestjs/swagger";
import { Schema, schema, z } from "src/utils/validation";

const pageData = schema(
  z.object({
    data: z.array(z.unknown()),
    page: z.number(),
    size: z.number(),
    totalElements: z.number(),
    totalPages: z.number(),
  }),
);

export class PageDataDto extends Schema(pageData) {
  @ApiProperty()
  data: unknown[];

  @ApiProperty()
  page: number;

  @ApiProperty()
  size: number;

  @ApiProperty()
  totalElements: number;

  @ApiProperty()
  totalPages: number;
}
