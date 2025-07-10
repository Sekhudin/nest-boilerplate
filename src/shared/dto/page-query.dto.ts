import { ApiProperty } from "@nestjs/swagger";
import { Schema, schema, z } from "src/utils/validation";

const pageQuery = schema(
  z.object({
    page: z.number().default(1),
    size: z.number().default(20),
    sortBy: z.string().default("id"),
    sortAs: z.enum(["asc", "desc"]).default("asc"),
  }),
);

export class PageQueryDto extends Schema(pageQuery) {
  @ApiProperty({ required: false, default: 1 })
  page: number;

  @ApiProperty({ required: false, default: 20 })
  size: number;

  @ApiProperty({ required: false, default: "id" })
  sortBy: string;

  @ApiProperty({ required: false, enum: ["asc", "desc"], default: "asc" })
  sortAs: "asc" | "desc";
}
