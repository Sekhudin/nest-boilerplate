import { Global, Module } from "@nestjs/common";
import { AsyncStorageService } from "./async-storage.service";
import { ContextService } from "./context.service";
import { CookieService } from "./cookie.service";

@Global()
@Module({
  providers: [AsyncStorageService, CookieService, ContextService],
  exports: [AsyncStorageService, CookieService, ContextService],
})
export class ContextModule {}
