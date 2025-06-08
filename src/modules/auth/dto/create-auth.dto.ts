import { ApiProperty } from "@nestjs/swagger";
import { schema, Schema, z, zr } from "src/utils/validation";

const createauth = z.object({
  name: zr.string(),
  age: z.number(),
  sex: zr.string().optional(),
});

export class CreateAuthDto extends Schema(schema(createauth)) {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  age!: number;

  @ApiProperty({ required: false })
  sex?: string;
}
