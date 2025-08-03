import "reflect-metadata";
import { getFreshSerializerConfigMock } from "test/mocks/config/serializer.config.mock";
import { Serialize } from "./serialize.decorator";

let serializerConfigMock: ReturnType<typeof getFreshSerializerConfigMock>;
jest.mock("src/config/serializer.config", () => ({
  get serializerConfig() {
    return serializerConfigMock;
  },
}));

describe("Serialize decorator", () => {
  beforeEach(() => {
    serializerConfigMock = getFreshSerializerConfigMock();
  });

  class DummyDto {}

  it("should set metadata with dto and default options", () => {
    class DummyController {
      @Serialize(DummyDto)
      handler() {}
    }

    const dummyController = new DummyController();
    const metadataDto = Reflect.getMetadata(serializerConfigMock.SERIALIZER_META_KEY, dummyController.handler);
    const metadataOptions = Reflect.getMetadata(
      serializerConfigMock.SERIALIZER_OPTIONS_META_KEY,
      dummyController.handler,
    );

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
    const metadataOptions = Reflect.getMetadata(
      serializerConfigMock.SERIALIZER_OPTIONS_META_KEY,
      dummyController.handler,
    );

    expect(metadataOptions).toEqual({ type: DummyDto, ...options });
  });
});
