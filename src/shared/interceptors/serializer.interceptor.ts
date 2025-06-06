import {
  CallHandler,
  ClassSerializerContextOptions,
  ClassSerializerInterceptor,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { map, Observable } from "rxjs";
import { serializerConfig } from "src/config/serializer.config";

@Injectable()
export class SerializerInterceptor extends ClassSerializerInterceptor {
  constructor(protected readonly reflector: Reflector) {
    super(reflector, serializerConfig.options);
  }

  override intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextOptions = this.getContextOptions(context);
    const options: ClassSerializerContextOptions = {
      ...this.defaultOptions,
      ...contextOptions,
    };
    return next.handle().pipe(map((res) => this.serialize(res, options)));
  }

  protected override getContextOptions(context: ExecutionContext): ClassSerializerContextOptions | undefined {
    return this.reflector.getAllAndOverride(serializerConfig.META_OPTIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }
}
