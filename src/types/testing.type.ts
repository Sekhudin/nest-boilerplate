import type { applyDecorators, createParamDecorator } from "@nestjs/common";

export type MockRequest = Record<string, any>;
export type ParamsDecorator = ReturnType<typeof createParamDecorator>;
export type NonParamsDecorator = (...params: any[]) => ReturnType<typeof applyDecorators>;
