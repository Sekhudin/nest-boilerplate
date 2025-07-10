import { Global, Module } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { GlobalValidationPipe } from "src/shared/pipes/global-validation.pipe";

@Global()
@Module({
  providers: [{ provide: APP_PIPE, useClass: GlobalValidationPipe }],
})
export class AppPipeModule {}
