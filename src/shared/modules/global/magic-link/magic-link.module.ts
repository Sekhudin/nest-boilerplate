import { Global, Module } from "@nestjs/common";
import { magicLinkConfig } from "src/config/magic-link.config";
import { MagicLinkService } from "./magic-link.service";

@Global()
@Module({
  providers: [
    { provide: magicLinkConfig.OPTIONS_INJECTOR_KEY, useValue: magicLinkConfig.magicLinkOptions },
    MagicLinkService,
  ],
  exports: [MagicLinkService],
})
export class MagicLinkModule {}
