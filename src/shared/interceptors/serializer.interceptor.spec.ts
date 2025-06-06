import { CallHandler, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { of } from "rxjs";
import { serializerConfig } from "src/config/serializer.config";
import { SerializerInterceptor } from "./serializer.interceptor";

describe("SerializerInterceptor", () => {
  let interceptor: SerializerInterceptor;
  let reflector: Reflector;
  let callHandler: CallHandler;
  let context: ExecutionContext;

  beforeEach(() => {
    reflector = new Reflector();
    jest.spyOn(reflector, "getAllAndOverride").mockReturnValue(undefined);
    interceptor = new SerializerInterceptor(reflector);

    callHandler = {
      handle: jest.fn(() => of({ test: "data" })),
    };

    context = {
      getHandler: jest.fn(() => ({})),
      getClass: jest.fn(() => ({})),
    } as unknown as ExecutionContext;
  });

  it("should be defined", () => {
    expect(interceptor).toBeDefined();
  });

  it("should call getContextOptions and merge with default options", (done) => {
    const metadataOptions = { strategy: "excludeAll" };
    jest.spyOn(reflector, "getAllAndOverride").mockReturnValue(metadataOptions);

    const spySerialize = jest.spyOn(interceptor, "serialize").mockImplementation((data, opts) => {
      expect(opts).toEqual(expect.objectContaining(metadataOptions));
      return data;
    });

    interceptor.intercept(context, callHandler).subscribe((result) => {
      expect(reflector.getAllAndOverride).toHaveBeenCalledWith(serializerConfig.META_OPTIONS_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      expect(spySerialize).toHaveBeenCalled();
      expect(result).toEqual({ test: "data" });
      done();
    });
  });

  it("should return original value if no context options", (done) => {
    jest.spyOn(reflector, "getAllAndOverride").mockReturnValue(undefined);

    const spySerialize = jest.spyOn(interceptor, "serialize");

    interceptor.intercept(context, callHandler).subscribe((result) => {
      expect(spySerialize).toHaveBeenCalledWith({ test: "data" }, expect.objectContaining({}));
      expect(result).toEqual({ test: "data" });
      done();
    });
  });
});
