import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { HttpInterceptor } from "src/shared/interceptors/http.interceptor";
import { SerializerInterceptor } from "src/shared/interceptors/serializer.interceptor";

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: SerializerInterceptor },
    { provide: APP_INTERCEPTOR, useClass: HttpInterceptor },
  ],
})
export class AppInterceptorModule {}
