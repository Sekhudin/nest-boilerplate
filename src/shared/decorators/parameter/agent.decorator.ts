import { Request } from "express";
import { createParamDecorator } from "@nestjs/common";

export const Agent = createParamDecorator((_, context) => {
  const request = context.switchToHttp().getRequest<Request>();
  return request.userAgent;
});
