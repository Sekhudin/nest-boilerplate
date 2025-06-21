import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { ContextMiddleware } from "./shared/middlewares/context.middleware";
import { ContextModule } from "./shared/modules/global/context/context.module";
import { LoggerModule } from "./shared/modules/global/logger/logger.module";

@Module({
  imports: [ContextModule, LoggerModule, AuthModule, UserModule],
  providers: [],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware).forRoutes("*path");
  }
}
