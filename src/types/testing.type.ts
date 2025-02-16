import type { PipeTransform, Type } from "@nestjs/common";

export type MockRequest = Record<string, any>;
export type ParamsDecorator = (...dataOrPipes: (Type<PipeTransform> | PipeTransform)[]) => ParameterDecorator;
