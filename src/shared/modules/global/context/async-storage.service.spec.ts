import { Request, Response } from "express";
import { AsyncStorageService } from "./async-storage.service";

describe("AsyncStorageService", () => {
  let service: AsyncStorageService;

  beforeEach(() => {
    service = new AsyncStorageService();
  });

  it("should return null when accessed outside run()", () => {
    expect(service.get("key1" as AsyncStorageKey)).toBeNull();
    expect(service.getRequest()).toBeNull();
    expect(service.getResponse()).toBeNull();
  });

  it("should isolate data between different runs", (done) => {
    const store1 = new Map();
    store1.set("key", "value1");

    const store2 = new Map();
    store2.set("key", "value2");

    service.run(store1, () => {
      expect(service.get("key" as AsyncStorageKey)).toBe("value1");

      service.run(store2, () => {
        expect(service.get("key" as AsyncStorageKey)).toBe("value2");
        done();
      });
    });
  });

  it("should store and retrieve values using run()", (done) => {
    const store = new Map();
    store.set("key1", "value1");

    service.run(store, () => {
      const value = service.get<string>("key1" as any);
      expect(value).toBe("value1");
      done();
    });
  });

  it("should return null for missing keys", (done) => {
    const store = new Map();

    service.run(store, () => {
      const value = service.get("nonexistent" as any);
      expect(value).toBeNull();
      done();
    });
  });

  it("should store and retrieve request object", (done) => {
    const mockRequest = { url: "/test" } as Request;

    const store = new Map();
    store.set("req", mockRequest);

    service.run(store, () => {
      expect(service.getRequest()).toBe(mockRequest);
      done();
    });
  });

  it("should store and retrieve response object", (done) => {
    const mockResponse = { statusCode: 200 } as Response;

    const store = new Map();
    store.set("res", mockResponse);

    service.run(store, () => {
      expect(service.getResponse()).toBe(mockResponse);
      done();
    });
  });

  it("should set and get values after run()", (done) => {
    const store = new Map();

    service.run(store, () => {
      service.set("foo" as any, "bar");
      const value = service.get<string>("foo" as any);
      expect(value).toBe("bar");
      done();
    });
  });
});
