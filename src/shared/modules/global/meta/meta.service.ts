import { Injectable } from "@nestjs/common";
import { ContextService } from "src/shared/modules/global/context/context.service";
import { MetaFiltersDto } from "src/shared/dto/meta-filters.dto";
import { MetaPaginationDto } from "src/shared/dto/meta-pagination.dto";
import { MetadataDto } from "src/shared/dto/metadata.dto";

@Injectable()
export class MetaService {
  constructor(private readonly contextService: ContextService) {}

  private metadata: Partial<MetadataDto> = {};

  setPagination(value: MetaPaginationDto) {
    if (Object.keys(value).length) {
      this.metadata.pagination = value;
    }
    return this;
  }

  setFilters<T extends MetaFiltersDto>(value: T) {
    const { sortBy, sortAs, ...filters } = value;
    if (Object.keys(filters).length) {
      this.metadata.filters = filters as unknown as MetaFiltersDto;
    }

    if (sortAs && sortBy) {
      this.metadata.sort = { field: sortBy, direction: sortAs };
    }
    return this;
  }

  build(): MetadataDto {
    const { startTime, endTime } = this.contextService.getExecutionTime();
    return {
      requestId: this.contextService.getRequestId(),
      executionTime: `${endTime - startTime}ms`,
      timestamp: this.contextService.getTimestamp(),
      ...this.metadata,
    } as MetadataDto;
  }
}
