import { z, createSchema, requiredString, Dto } from "src/utils/validation.util";

export const createUserSchema = createSchema(
  z.object({
    email: requiredString.toLowerCase(),
    username: requiredString,
    password: requiredString,
  }),
);

export type CreateUserDto = Dto<typeof createUserSchema>;
