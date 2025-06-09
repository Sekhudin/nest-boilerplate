import { BaseConfig } from "./base.config";

class DateTimeConfig extends BaseConfig {
  constructor() {
    super();
  }
}

export const dateTimeConfig = DateTimeConfig.getInstance();
