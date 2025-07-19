import z from "zod/v4";
import { ErrorCode } from "src/shared/enums/error-code.enum";

export const username = () => z.string(ErrorCode.STRING_INVALID).min(1, ErrorCode.STRING_EMPTY).toLowerCase().trim();

export const password = () => {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;
  return z.string(ErrorCode.STRING_INVALID).trim().regex(pattern, ErrorCode.PASSWORD_WEAK);
};
