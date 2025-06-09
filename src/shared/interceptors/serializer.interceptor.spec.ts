import { CallHandler, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Expose } from "class-transformer";
import { of } from "rxjs";
import { serializerConfig } from "src/config/serializer.config";
import { SerializerInterceptor } from "./serializer.interceptor";

describe("SerializerInterceptor", () => {
  let interceptor: SerializerInterceptor;
  let reflector: Reflector;
  let callHandler: CallHandler;
  let context: ExecutionContext;

  class Person {
    @Expose()
    name!: string;

    age?: number;
  }

  beforeEach(() => {
    reflector = new Reflector();
    jest.spyOn(reflector, "getAllAndOverride").mockReturnValue(undefined);
    interceptor = new SerializerInterceptor(reflector);

    const person = new Person();
    person.name = "john";
    person.age = 27;

    callHandler = {
      handle: jest.fn(() => of(person)),
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
    const metadataOptions = { strategy: "excludeAll", excludeExtraneousValues: false };
    jest.spyOn(reflector, "getAllAndOverride").mockReturnValue(metadataOptions);

    const spySerialize = jest.spyOn(interceptor, "serialize").mockImplementation((data, opts) => {
      expect(opts).toEqual(expect.objectContaining(metadataOptions));
      return data;
    });

    interceptor.intercept(context, callHandler).subscribe((result) => {
      expect(reflector.getAllAndOverride).toHaveBeenCalledWith(serializerConfig.META_KEY_OPTIONS, [
        context.getHandler(),
        context.getClass(),
      ]);
      expect(spySerialize).toHaveBeenCalled();
      expect(result).toEqual({ name: "john", age: 27 });
      done();
    });
  });

  it("should return original value if no context options", (done) => {
    jest.spyOn(reflector, "getAllAndOverride").mockReturnValue(undefined);

    const spySerialize = jest.spyOn(interceptor, "serialize");
    const person = new Person();
    person.name = "john";
    person.age = 27;
    interceptor.intercept(context, callHandler).subscribe((result) => {
      expect(spySerialize).toHaveBeenCalledWith(person, expect.objectContaining({}));
      expect(result).toEqual({ name: "john" });
      done();
    });
  });
});
