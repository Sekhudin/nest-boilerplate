import { Request } from "express";
import { createParamDecorator, UnauthorizedException } from "@nestjs/common";

export const User = createParamDecorator((_, context) => {
  const request = context.switchToHttp().getRequest<Request>();
  if (!request.user) throw new UnauthorizedException("Unauthorized: User not found");
  return request.user;
});
