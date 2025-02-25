import z from "zod";
import * as validation from "src/utils/validation.util";
import type { ExecutionContext } from "@nestjs/common";

export const mockRequest: ExecutionContext = {
  switchToHttp: jest.fn(() => ({
    getRequest: jest.fn(() => ({
      ip: "192.168.1.1",
      headers: {
        "x-forwarded-for": "203.0.113.42, 198.51.100.23, 192.0.2.10",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      socket: {
        remoteAddress: "192.168.1.100",
      },
      param: "1",
      query: {
        page: "1",
        total: "20",
      },
      body: {
        name: "John Doe",
        age: 25,
      },
    })),
  })),
} as unknown as ExecutionContext;

export const mockNumberSchema = validation.createSchema(z.number());
export const mockPersonSchema = validation.createSchema(
  z.object({
    name: z.string().min(1).toLowerCase(),
    age: z.number().min(1),
  }),
);
