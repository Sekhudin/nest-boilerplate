import { LoggerService } from "./logger.service";

describe("LoggerService", () => {
  it("should create a logger instance", () => {
    const logger = new LoggerService();
    expect(logger.ws).toBeDefined();
    expect(typeof logger.ws.info).toBe("function");
  });
});
