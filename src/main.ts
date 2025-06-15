import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { AllExceptionFilter } from "src/shared/filters/all-exception.filter";
import { HttpInterceptor } from "src/shared/interceptors/http.interceptor";
import { SerializerInterceptor } from "src/shared/interceptors/serializer.interceptor";
import { LoggerService } from "src/shared/modules/global/logger/logger.service";
import { appConfig } from "./config/app.config";
import { cookieConfig } from "./config/cookie.config";
import { corsConfig } from "./config/cors.config";
import { swaggerConfig } from "./config/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);
  const reflector = app.get(Reflector);
  const logger = app.get(LoggerService);

  corsConfig.setup(app);
  cookieConfig.setup(app);
  swaggerConfig.setup(app);

  app.useGlobalInterceptors(new SerializerInterceptor(reflector), new HttpInterceptor(logger));
  app.useGlobalFilters(new AllExceptionFilter(httpAdapterHost, logger));

  await app.listen(appConfig.port, () => {
    logger.ws.info(`[${appConfig.name}] running on port ${appConfig.port}`);
  });
}
bootstrap();
