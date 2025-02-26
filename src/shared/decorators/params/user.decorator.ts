import { Request } from "express";
import { createParamDecorator, ForbiddenException } from "@nestjs/common";
import type { JwtAuthPayload } from "src/types/global.type";

export type UserValue = JwtAuthPayload;
export const User = () =>
  createParamDecorator<never, UserValue | UserValue>((_, ctx) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    if (!request.user) throw new ForbiddenException("user not authenticated!");
    return request.user as UserValue;
  });
