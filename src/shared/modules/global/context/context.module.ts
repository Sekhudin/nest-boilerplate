import { Global, Module } from "@nestjs/common";
import { AsyncStorageService } from "./async-storage.service";
import { CookieService } from "./cookie.service";

@Global()
@Module({
  providers: [AsyncStorageService, CookieService],
  exports: [AsyncStorageService, CookieService],
})
export class ContextModule {}
