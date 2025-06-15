import { Request, Response } from "express";
import { AsyncStorageService } from "./async-storage.service";

describe("AsyncStorageService", () => {
  let service: AsyncStorageService;

  beforeEach(() => {
    service = new AsyncStorageService();
  });

  it("should store and retrieve values using run()", (done) => {
    const store = new Map();
    store.set("key1", "value1");

    service.run(store, () => {
      expect(service.get("key1" as any)).toBe("value1");
      done();
    });
  });

  it("should return null for missing keys", (done) => {
    const store = new Map();

    service.run(store, () => {
      expect(service.get("nonexistent" as any)).toBeNull();
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
      expect(service.get("foo" as any)).toBe("bar");
      done();
    });
  });
});
