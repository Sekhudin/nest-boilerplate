import { MetadataDto } from "src/shared/dto/metadata.dto";
import { BaseCollectionResponse } from "./base-collection.response";

interface DummyItem {
  id: number;
  name: string;
}

class DummyCollectionResponse extends BaseCollectionResponse<DummyItem> {
  constructor(
    public data: DummyItem[],
    public meta: MetadataDto,
  ) {
    super();
  }

  static override from(data: DummyItem[], meta: MetadataDto): DummyCollectionResponse {
    return new DummyCollectionResponse(data, meta);
  }
}

describe("BaseCollectionResponse", () => {
  describe("abstract base class", () => {
    const meta: MetadataDto = {
      requestId: "xyz",
      timestamp: new Date().toISOString(),
      executionTime: "10ms",
    };
    it("should throw if from() is called directly", () => {
      expect(() => {
        BaseCollectionResponse.from([{ id: 1, name: "Test" }], meta);
      }).toThrow("static method from() not implemented yet");
    });
  });

  describe("DummyCollectionResponse subclass", () => {
    it("should return an instance with data and meta", () => {
      const data: DummyItem[] = [
        { id: 1, name: "Alpha" },
        { id: 2, name: "Beta" },
      ];
      const meta: MetadataDto = {
        requestId: "xyz",
        timestamp: new Date().toISOString(),
        executionTime: "10ms",
      };

      const result = DummyCollectionResponse.from(data, meta);

      expect(result).toBeInstanceOf(DummyCollectionResponse);
      expect(result.data).toEqual(data);
      expect(result.meta).toEqual(meta);
    });
  });
});
