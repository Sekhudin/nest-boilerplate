import "@nestjs/common";

declare module "@nestjs/common" {
  type BaseHttpExceptionBody = {
    statusCode: number;
    message: string;
    errors?: Record<string, string[]>;
  };
}
