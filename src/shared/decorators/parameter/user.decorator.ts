import { Request } from "express";
import { createParamDecorator } from "@nestjs/common";
import { InvalidCredentialsException } from "src/shared/exceptions/auth/invalid-credentials.exception";

export const User = createParamDecorator((_, context) => {
  const request = context.switchToHttp().getRequest<Request>();
  if (!request.user) throw new InvalidCredentialsException();
  return request.user;
});
