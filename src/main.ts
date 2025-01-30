import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { AppModule } from "src/app.module";
import { LoggerService } from "src/shared/services/logger.service";
import { corsOptions } from "src/configs/cors.config";
import { swaggerSetup } from "src/configs/swagger.config";
import * as env from "src/configs/env.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggerService);
  app.enableCors(corsOptions);
  app.useLogger(logger);
  app.use(cookieParser());
  swaggerSetup(app);
  await app.listen(Number(env.APP_PORT));
  logger.appListen(await app.getUrl());
}
bootstrap();
