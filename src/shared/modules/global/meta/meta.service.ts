import { Injectable } from "@nestjs/common";
import { ContextService } from "src/shared/modules/global/context/context.service";

@Injectable()
export class MetaService {
  constructor(private readonly contextService: ContextService) {}

  private metadata: Partial<Metadata> = {};

  setPagination(value: MetaPayload) {
    if (Object.keys(value).length) {
      this.metadata.pagination = value;
    }
    return this;
  }

  setFilters(value: MetaPayload) {
    const { sortBy, sortAs, ...filters } = value;
    if (Object.keys(filters).length) {
      this.metadata.filters = filters;
    }

    if (sortAs && sortBy) {
      this.metadata.sort = { field: String(sortBy), direction: String(sortAs) };
    }
    return this;
  }

  build(): Metadata {
    const { startTime, endTime } = this.contextService.getExecutionTime();
    return {
      requestId: this.contextService.getRequestId(),
      executionTime: `${endTime - startTime}ms`,
      timestamp: this.contextService.getTimestamp(),
      ...this.metadata,
    };
  }
}
