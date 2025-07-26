import { Test, TestingModule } from "@nestjs/testing";
import { ContextService } from "src/shared/modules/global/context/context.service";
import { getFreshContextServiceMock } from "test/mocks/services/context.service.mock";
import { MetaService } from "./meta.service";

describe("MetaService", () => {
  let service: MetaService;
  const executionTimeMock = { startTime: Date.now(), endTime: Date.now() };
  const contextServiceMock = getFreshContextServiceMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetaService, { provide: ContextService, useValue: contextServiceMock }],
    }).compile();

    service = module.get<MetaService>(MetaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("setPagination", () => {
    beforeEach(() => {
      contextServiceMock.getExecutionTime.mockReset();
    });
    it("should set pagination metadata if object is not empty", () => {
      contextServiceMock.getExecutionTime.mockReturnValue(executionTimeMock);
      service.setPagination({ page: 1, limit: 10 });
      const result = service.build();
      expect(result.pagination).toEqual({ page: 1, limit: 10 });
    });

    it("should not set pagination if empty object provided", () => {
      contextServiceMock.getExecutionTime.mockReturnValue(executionTimeMock);
      service.setPagination({});
      const result = service.build();
      expect(result.pagination).toBeUndefined();
    });
  });

  describe("setFilters", () => {
    beforeEach(() => {
      contextServiceMock.getExecutionTime.mockReset();
    });
    it("should set filters metadata excluding sortBy and sortAs", () => {
      contextServiceMock.getExecutionTime.mockReturnValue(executionTimeMock);

      const input = { sortBy: "name", sortAs: "asc", status: "active" };
      service.setFilters(input);
      const result = service.build();
      expect(result.filters).toEqual({ status: "active" });
    });

    it("should set sort metadata if sortBy and sortAs present", () => {
      contextServiceMock.getExecutionTime.mockReturnValue(executionTimeMock);

      const input = { sortBy: "name", sortAs: "desc" };
      service.setFilters(input);
      const result = service.build();
      expect(result.sort).toEqual({ field: "name", direction: "desc" });
    });

    it("should not set filters if only sortBy and sortAs are provided", () => {
      contextServiceMock.getExecutionTime.mockReturnValue(executionTimeMock);

      service.setFilters({ sortBy: "name", sortAs: "asc" });
      const result = service.build();
      expect(result.filters).toBeUndefined();
    });

    it("should not set sort if sortBy or sortAs missing", () => {
      contextServiceMock.getExecutionTime.mockReturnValue(executionTimeMock);

      service.setFilters({ sortBy: "name" });
      const result = service.build();
      expect(result.sort).toBeUndefined();

      service.setFilters({ sortAs: "asc" });
      const result2 = service.build();
      expect(result2.sort).toBeUndefined();
    });
  });

  describe("build", () => {
    const requestIdMock = "request-123";
    const timestampMock = new Date().toISOString();

    beforeEach(() => {
      contextServiceMock.getRequestId.mockReset();
      contextServiceMock.getExecutionTime.mockReset();
      contextServiceMock.getTimestamp.mockReset();
    });
    it("should return metadata with required fields and merged optional metadata", () => {
      contextServiceMock.getRequestId.mockReturnValue(requestIdMock);
      contextServiceMock.getExecutionTime.mockReturnValue(executionTimeMock);
      contextServiceMock.getTimestamp.mockReturnValue(timestampMock);

      const result = service
        .setPagination({ page: 2 })
        .setFilters({ sortBy: "date", sortAs: "asc", category: "news" })
        .build();

      expect(result.requestId).toBe(requestIdMock);
      expect(result.executionTime).toBe(`${executionTimeMock.endTime - executionTimeMock.startTime}ms`);
      expect(result.timestamp).toBe(timestampMock);
      expect(result.pagination).toEqual({ page: 2 });
      expect(result.filters).toEqual({ category: "news" });
      expect(result.sort).toEqual({ field: "date", direction: "asc" });
    });
  });
});
