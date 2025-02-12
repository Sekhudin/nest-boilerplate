import { Request } from "express";
import { createParamDecorator } from "@nestjs/common";
import { UAParser, UAParserResult } from "src/utils/user-agent";

export type ProfilerValue = UAParserResult;
export const Profiler = createParamDecorator<never, ProfilerValue>((_, ctx) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  const data = UAParser.parse(request);
  return data;
});
