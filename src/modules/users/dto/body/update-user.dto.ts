import { createUserSchema } from "./create-user.dto";
import { z, createSchema, requiredString, Dto } from "src/utils/validation.util";

export const updateUserSchema = createSchema(
  z.object({
    email: requiredString.toLowerCase(),
    username: requiredString,
    password: requiredString,
  }),
);

export type UpdateUserDto = Dto<typeof updateUserSchema>;
