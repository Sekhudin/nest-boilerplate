import { Request } from "express";
import { HttpException, HttpStatus } from "@nestjs/common";
import { JsonLogFormatter } from "./json-log-formatter";

describe("JsonLogFormatter", () => {
  const mockRequest = {
    method: "post",
    path: "/test-path",
    query: { foo: "bar" },
    body: { key: "value" },
  } as unknown as Request;

  describe("transform", () => {
    it("should transform the value to Logform.TransformableInfo", () => {
      const value = { method: "GET", path: "/test" };
      const result = JsonLogFormatter.transform(value);
      expect(result).toBeInstanceOf(JsonLogFormatter);
      expect(result).toMatchObject(value);
    });
  });

  describe("http", () => {
    it("should create a correct http log format", () => {
      const startTime = Date.now();
      const endTime = startTime + 150;

      const result = JsonLogFormatter.http({
        req: mockRequest,
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

  describe("httpError", () => {
    it("should create a correct http error log format", () => {
      const exception = new HttpException({ message: "Forbidden" }, HttpStatus.FORBIDDEN);

      const result = JsonLogFormatter.httpError({
        req: mockRequest,
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
  });

  describe("unknownError", () => {
    it("should create a correct unknown error log format", () => {
      const error = new Error("Unexpected error");

      const result = JsonLogFormatter.unknownError({
        req: mockRequest,
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
  });
});
