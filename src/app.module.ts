import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { TokenModule } from "./modules/token/token.module";
import { UserModule } from "./modules/user/user.module";
import { ContextMiddleware } from "./shared/middlewares/context.middleware";
import { AppFilterModule } from "./shared/modules/global/app-filter/app-filter.module";
import { AppGuardModule } from "./shared/modules/global/app-guard/app-guard.module";
import { AppInterceptorModule } from "./shared/modules/global/app-interceptor/app-interceptor.module";
import { ContextModule } from "./shared/modules/global/context/context.module";
import { DatabaseModule } from "./shared/modules/global/database/database.module";
import { LoggerModule } from "./shared/modules/global/logger/logger.module";
import { MailerModule } from "./shared/modules/global/mailer/mailer.module";
import { ThrottlerModule } from "./shared/modules/global/throttler/throttler.module";

@Module({
  imports: [
    AppGuardModule,
    AppFilterModule,
    AppInterceptorModule,
    ContextModule,
    DatabaseModule,
    LoggerModule,
    MailerModule,
    AuthModule,
    UserModule,
    TokenModule,
    ThrottlerModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware).forRoutes("*path");
  }
}
