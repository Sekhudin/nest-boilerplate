import "reflect-metadata";
import { serializerConfig } from "src/config/serializer.config";
import { Serialize } from "./serialize.decorator";

describe("Serialize Decorator", () => {
  class DummyDto {}

  it("should set metadata with dto and default options", () => {
    class DummyController {
      @Serialize(DummyDto)
      handler() {}
    }

    const dummyController = new DummyController();
    const metadataDto = Reflect.getMetadata(serializerConfig.META_KEY, dummyController.handler);
    const metadataOptions = Reflect.getMetadata(serializerConfig.META_KEY_OPTIONS, dummyController.handler);

    expect(metadataDto).toBe(DummyDto);
    expect(metadataOptions).toEqual({ type: DummyDto });
  });

  it("should set metadata with custom options", () => {
    const options = { groups: ["admin"] };

    class DummyController {
      @Serialize(DummyDto, options)
      handler() {}
    }

    const dummyController = new DummyController();
    const metadataOptions = Reflect.getMetadata(serializerConfig.META_KEY_OPTIONS, dummyController.handler);

    expect(metadataOptions).toEqual({ type: DummyDto, ...options });
  });
});
