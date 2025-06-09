import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { appConfig } from "./config/app.config";
import { cookieConfig } from "./config/cookie.config";
import { corsConfig } from "./config/cors.config";
import { swaggerConfig } from "./config/swagger.config";
import { HttpLoggingInterceptor } from "./shared/interceptors/http-logging.interceptor";
import { SerializerInterceptor } from "./shared/interceptors/serializer.interceptor";
import { LoggerService } from "./shared/services/logger.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  appConfig.setup(app);
  corsConfig.setup(app);
  cookieConfig.setup(app);
  swaggerConfig.setup(app);

  const logger = app.get(LoggerService);
  app.useGlobalInterceptors(
    new SerializerInterceptor(app.get(Reflector)),
    new HttpLoggingInterceptor(logger),
  );

  await app.listen(appConfig.port, () => {
    logger.ws.info(appConfig.runningMessage);
  });
}
bootstrap();
