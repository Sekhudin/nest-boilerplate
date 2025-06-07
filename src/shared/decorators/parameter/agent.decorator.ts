import { Request } from "express";
import { createParamDecorator } from "@nestjs/common";
import { UserAgent } from "src/utils/ua";

export const Agent = createParamDecorator((_, context) => {
  const request = context.switchToHttp().getRequest<Request>();
  const agent = UserAgent.parse(request);
  return agent;
});
