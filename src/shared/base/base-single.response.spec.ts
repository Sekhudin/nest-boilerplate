import { MetadataDto } from "src/shared/dto/metadata.dto";
import { BaseSingleResponse } from "./base-single.response";

interface DummyData {
  id: number;
  name: string;
}

class DummyResponse extends BaseSingleResponse<DummyData> {
  data: DummyData;
  meta: MetadataDto;

  constructor(value: DummyResponse) {
    super();
    Object.assign(this, value);
  }

  static override from(data: DummyData, meta: MetadataDto): DummyResponse {
    return new DummyResponse({ data, meta });
  }
}

describe("BaseSingleResponse", () => {
  describe("abstract base class", () => {
    const meta: MetadataDto = {
      requestId: "abc",
      timestamp: new Date().toISOString(),
      executionTime: "5ms",
    };
    it("should throw if from() is called directly", () => {
      expect(() => {
        BaseSingleResponse.from({ id: 1, name: "Test" }, meta);
      }).toThrow("static method from() not implemented yet");
    });
  });

  describe("DummyResponse subclass", () => {
    it("should return an instance with data and meta", () => {
      const data = { id: 1, name: "Test" };
      const meta: MetadataDto = {
        requestId: "abc",
        timestamp: new Date().toISOString(),
        executionTime: "5ms",
      };

      const response = DummyResponse.from(data, meta);

      expect(response).toBeInstanceOf(DummyResponse);
      expect(response.data).toEqual(data);
      expect(response.meta).toEqual(meta);
    });
  });
});
