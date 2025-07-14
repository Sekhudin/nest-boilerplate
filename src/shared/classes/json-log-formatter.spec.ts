import { Request } from "express";
import { HttpException, HttpStatus } from "@nestjs/common";
import { JsonLogFormatter } from "./json-log-formatter";

describe("JsonLogFormatter", () => {
  const mockRequest: Partial<Request> = {
    method: "post",
    path: "/test-path",
    query: { foo: "bar" },
    body: { key: "value" },
    userAgent: {
      browser: { name: "Chrome", version: "114.0" },
      device: "android",
      ip: "192.168.0.1",
      os: { name: "Android", version: "13" },
      userAgent: "Mozilla/5.0 (Linux; Android 13; ...)",
    },
  };

  it("should instantiate JsonLogFormatter directly with valid value", () => {
    const formatter = new JsonLogFormatter({ method: "GET", path: "/direct" } as any) as any;
    expect(formatter).toBeInstanceOf(JsonLogFormatter);
    expect(formatter.method).toBe("GET");
    expect(formatter.path).toBe("/direct");
  });

  describe("http", () => {
    it("should set queryParams to null when query is empty", () => {
      const result = JsonLogFormatter.http({
        req: { ...mockRequest, query: {} } as Request,
        statusCode: 200,
        startTime: 0,
        endTime: 10,
      });

      expect(result).toMatchObject({
        queryParams: null,
      });
    });

    it("should set userId to null when user is not present", () => {
      const result = JsonLogFormatter.http({
        req: { ...mockRequest, user: undefined } as Request,
        statusCode: 200,
        startTime: 0,
        endTime: 10,
      });

      expect(result).toMatchObject({
        userId: null,
      });
    });

    it("should set body to null when body is undefined", () => {
      const result = JsonLogFormatter.http({
        req: { ...mockRequest, body: undefined } as Request,
        statusCode: 200,
        startTime: 0,
        endTime: 5,
      });

      expect(result).toMatchObject({
        body: null,
      });
    });

    it("should set queryParams to null when query is empty", () => {
      const result = JsonLogFormatter.http({
        req: { ...mockRequest, query: {} } as Request,
        statusCode: 200,
        startTime: 0,
        endTime: 10,
      });

      expect(result).toMatchObject({
        queryParams: null,
      });
    });

    it("should set userId to null when user is not present", () => {
      const result = JsonLogFormatter.http({
        req: { ...mockRequest, user: undefined } as Request,
        statusCode: 200,
        startTime: 0,
        endTime: 10,
      });

      expect(result).toMatchObject({
        userId: null,
      });
    });

    it("should create a correct http log format", () => {
      const startTime = Date.now();
      const endTime = startTime + 150;

      const result = JsonLogFormatter.http({
        req: mockRequest as Request,
        statusCode: 200,
        startTime,
        endTime,
      });

      expect(result).toBeInstanceOf(JsonLogFormatter);
      expect(result).toMatchObject({
        method: "POST",
        path: "/test-path",
        queryParams: { foo: "bar" },
        body: { key: "value" },
        statusCode: 200,
        responseTime: 150,
        responseTimeMs: "+150ms",
      });
    });
  });

  describe("transform", () => {
    it("should transform the value to Logform.TransformableInfo", () => {
      const value = { method: "GET", path: "/test" };
      const result = JsonLogFormatter.transform(value);
      expect(result).toBeInstanceOf(JsonLogFormatter);
      expect(result).toMatchObject(value);
    });

    it("should handle transform with empty object", () => {
      const result = JsonLogFormatter.transform({});
      expect(result).toBeInstanceOf(JsonLogFormatter);
    });
  });

  describe("httpError", () => {
    it("should create a correct http error log format", () => {
      const exception = new HttpException({ message: "Forbidden" }, HttpStatus.FORBIDDEN);

      const result = JsonLogFormatter.httpError({
        req: mockRequest as Request,
        exception,
      });

      expect(result).toBeInstanceOf(JsonLogFormatter);
      expect(result).toMatchObject({
        method: "POST",
        path: "/test-path",
        queryParams: { foo: "bar" },
        body: { key: "value" },
        statusCode: HttpStatus.FORBIDDEN,
        error: { message: "Forbidden" },
      });
    });

    it("should set body to null when body is undefined", () => {
      const exception = new HttpException({ message: "Forbidden" }, HttpStatus.FORBIDDEN);
      const result = JsonLogFormatter.httpError({
        req: { ...mockRequest, body: undefined } as Request,
        exception,
      });

      expect(result).toMatchObject({
        body: null,
      });
    });
  });

  describe("unknownError", () => {
    it("should create a correct unknown error log format", () => {
      const error = new Error("Unexpected error");

      const result = JsonLogFormatter.unknownError({
        req: mockRequest as Request,
        statusCode: 500,
        exception: error,
      });

      expect(result).toBeInstanceOf(JsonLogFormatter);
      expect(result).toMatchObject({
        method: "POST",
        path: "/test-path",
        queryParams: { foo: "bar" },
        body: { key: "value" },
        statusCode: 500,
        error,
      });
    });

    it("should set body to null when body is undefined", () => {
      const result = JsonLogFormatter.unknownError({
        req: { ...mockRequest, body: undefined } as Request,
        statusCode: 500,
        exception: { message: "error" },
      });

      expect(result).toMatchObject({
        body: null,
      });
    });
  });
});
