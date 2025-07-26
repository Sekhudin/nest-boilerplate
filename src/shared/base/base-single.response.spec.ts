import { BaseSingleResponse } from "./base-single.response";

interface DummyData {
  id: number;
  name: string;
}

class DummyResponse extends BaseSingleResponse<DummyData> {
  data: DummyData;
  meta?: Metadata | undefined;

  constructor(value: DummyResponse) {
    super();
    Object.assign(this, value);
  }

  static override from(data: DummyData, meta?: Metadata): DummyResponse {
    return new DummyResponse({ data, meta });
  }
}

describe("BaseSingleResponse", () => {
  describe("abstract base class", () => {
    it("should throw if from() is called directly", () => {
      expect(() => {
        BaseSingleResponse.from({ id: 1, name: "Test" });
      }).toThrow("static method from() not implemented yet");
    });
  });

  describe("DummyResponse subclass", () => {
    it("should return an instance with data and meta", () => {
      const data = { id: 1, name: "Test" };
      const meta = {
        requestId: "abc",
        timestamp: new Date().toISOString(),
        executionTime: "5ms",
      };

      const response = DummyResponse.from(data, meta);

      expect(response).toBeInstanceOf(DummyResponse);
      expect(response.data).toEqual(data);
      expect(response.meta).toEqual(meta);
    });

    it("should allow meta to be optional", () => {
      const data = { id: 2, name: "NoMeta" };
      const response = DummyResponse.from(data);

      expect(response.data).toEqual(data);
      expect(response.meta).toBeUndefined();
    });
  });
});
