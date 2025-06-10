import "@nestjs/swagger";
import { ApiOperationOptions } from "@nestjs/swagger";

declare module "@nestjs/swagger" {
  type ControllerDocsOperations<T> = Partial<{
    [k in keyof T]: ApiOperationOptions;
  }>;
}
