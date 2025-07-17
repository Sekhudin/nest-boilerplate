import { BaseHttpExceptionBody, HttpException, HttpStatus } from "@nestjs/common";

export abstract class BaseHttpException extends HttpException {
  protected constructor(statusCode: HttpStatus, message: string, errors?: Record<string, string[]>) {
    const baseHttpExceptionBody: BaseHttpExceptionBody = {
      statusCode,
      message,
    };

    if (BaseHttpException.hasErrors(errors)) {
      baseHttpExceptionBody.errors = errors;
    }

    super(baseHttpExceptionBody, statusCode);
  }

  static hasErrors(errors?: Record<string, string[]>) {
    if (errors && Object.keys(errors).length) return true;
    return false;
  }
}
