import { BaseCollectionResponse } from "./base-collection.response";

interface DummyItem {
  id: number;
  name: string;
}

class DummyCollectionResponse extends BaseCollectionResponse<DummyItem> {
  constructor(
    public data: DummyItem[],
    public meta?: Metadata,
  ) {
    super();
  }

  static override from(data: DummyItem[], meta?: Metadata): DummyCollectionResponse {
    return new DummyCollectionResponse(data, meta);
  }
}

describe("BaseCollectionResponse", () => {
  describe("abstract base class", () => {
    it("should throw if from() is called directly", () => {
      expect(() => {
        BaseCollectionResponse.from([{ id: 1, name: "Test" }]);
      }).toThrowError("static method from() not implemented yet");
    });
  });

  describe("DummyCollectionResponse subclass", () => {
    it("should return an instance with data and meta", () => {
      const data: DummyItem[] = [
        { id: 1, name: "Alpha" },
        { id: 2, name: "Beta" },
      ];
      const meta: Metadata = {
        requestId: "xyz",
        timestamp: new Date().toISOString(),
        executionTime: "10ms",
      };

      const result = DummyCollectionResponse.from(data, meta);

      expect(result).toBeInstanceOf(DummyCollectionResponse);
      expect(result.data).toEqual(data);
      expect(result.meta).toEqual(meta);
    });

    it("should return an instance with data and no meta if omitted", () => {
      const data: DummyItem[] = [{ id: 3, name: "Gamma" }];
      const result = DummyCollectionResponse.from(data);

      expect(result.data).toEqual(data);
      expect(result.meta).toBeUndefined();
    });
  });
});
