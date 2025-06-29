import { ApiProperty } from "@nestjs/swagger";
import { schema, Schema, z } from "src/utils/validation";

const createauth = z.object({
  username: z.string(),
  password: z.string(),
});

export class CreateAuthDto extends Schema(schema(createauth)) {
  @ApiProperty()
  username!: string;

  @ApiProperty()
  password!: string;
}
