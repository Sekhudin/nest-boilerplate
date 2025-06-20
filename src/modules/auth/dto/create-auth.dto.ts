import { ApiProperty } from "@nestjs/swagger";
import { schema, Schema, z, zr } from "src/utils/validation";

const createauth = z.object({
  username: zr.string(),
  password: zr.string(),
});

export class CreateAuthDto extends Schema(schema(createauth)) {
  @ApiProperty()
  username!: string;

  @ApiProperty()
  password!: string;
}
