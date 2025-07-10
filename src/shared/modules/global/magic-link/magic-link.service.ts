import { Inject, Injectable } from "@nestjs/common";
import { magicLinkConfig, MagicLinkOptions } from "src/config/magic-link.config";

@Injectable()
export class MagicLinkService {
  constructor(@Inject(magicLinkConfig.OPTIONS_INJECTOR_KEY) options: MagicLinkOptions) {}
}
