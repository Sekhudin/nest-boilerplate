import { ExecutionContext } from "@nestjs/common";

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
    })),
  })),
} as unknown as ExecutionContext;
