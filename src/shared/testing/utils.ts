import { ROUTE_ARGS_METADATA } from "@nestjs/common/constants";
import type { ParamsDecorator, MockRequest } from "src/types/testing.type";

export function getDecoratorParamsFactory<T>(request: MockRequest, Decorator: ParamsDecorator, property?: string) {
  class TestDecorator {
    public test(@Decorator() value: T) {}
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, TestDecorator, "test");
  return args[Object.keys(args)[0]].factory("test", request) as T;
}
