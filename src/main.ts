import { AppModule } from "src/app.module";
import { NestFactory } from "@nestjs/core";
import { LoggerService } from "src/shared/modules/global/logger/logger.service";
import { AppConfig, appConfig } from "./config/app.config";
import { cookieConfig } from "./config/cookie.config";
import { corsConfig } from "./config/cors.config";
import { swaggerConfig } from "./config/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggerService);

  AppConfig.register(app, [corsConfig, cookieConfig, swaggerConfig]);
  await app.init();
  await app.listen(appConfig.port);
  logger.ws.info(`[${appConfig.name}] running on port ${appConfig.port}`);
}

bootstrap().catch((error) => {
  console.error("Error during bootstrap:", error);
  process.exit(1);
});
