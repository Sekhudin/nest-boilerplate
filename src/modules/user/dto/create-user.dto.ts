import { schema, Schema, z, zr } from "src/utils/validation";

const createUser = z.object({});

createUser.partial().pick({});

export class CreateUserDto {}
