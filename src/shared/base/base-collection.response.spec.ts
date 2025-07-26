import { BaseCollectionResponse } from "./base-collection.response";

interface DummyItem {
  id: number;
  name: string;
}

class DummyCollectionResponse extends BaseCollectionResponse<DummyItem> {
  constructor(
    public items: DummyItem[],
    public meta?: Metadata,
  ) {
    super();
  }

  static override from(items: DummyItem[], meta?: Metadata): DummyCollectionResponse {
    return new DummyCollectionResponse(items, meta);
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
    it("should return an instance with items and meta", () => {
      const items: DummyItem[] = [
        { id: 1, name: "Alpha" },
        { id: 2, name: "Beta" },
      ];
      const meta: Metadata = {
        requestId: "xyz",
        timestamp: new Date().toISOString(),
        executionTime: "10ms",
      };

      const result = DummyCollectionResponse.from(items, meta);

      expect(result).toBeInstanceOf(DummyCollectionResponse);
      expect(result.items).toEqual(items);
      expect(result.meta).toEqual(meta);
    });

    it("should return an instance with items and no meta if omitted", () => {
      const items: DummyItem[] = [{ id: 3, name: "Gamma" }];
      const result = DummyCollectionResponse.from(items);

      expect(result.items).toEqual(items);
      expect(result.meta).toBeUndefined();
    });
  });
});
