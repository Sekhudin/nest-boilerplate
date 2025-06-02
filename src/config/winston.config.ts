import { format, transports } from "winston";
import { BaseConfig } from "./base.config";

class WinstonConfig extends BaseConfig {
  private readonly _transportConsole: transports.ConsoleTransportInstance;
  private readonly _transportFile: transports.FileTransportInstance;

  constructor() {
    super();
    this._transportConsole = new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    });

    this._transportFile = new transports.File({});
  }

  get transportConsole() {
    return this._transportConsole;
  }

  get transportFile() {
    return this._transportFile;
  }
}

export const winstonConfig = WinstonConfig.getInstance();
