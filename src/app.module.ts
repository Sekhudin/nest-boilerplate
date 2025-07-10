import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { OtpModule } from "./modules/otp/otp.module";
import { RoleModule } from "./modules/role/role.module";
import { TokenModule } from "./modules/token/token.module";
import { UserModule } from "./modules/user/user.module";
import { ContextMiddleware } from "./shared/middlewares/context.middleware";
import { AppFilterModule } from "./shared/modules/global/app-filter/app-filter.module";
import { AppGuardModule } from "./shared/modules/global/app-guard/app-guard.module";
import { AppInterceptorModule } from "./shared/modules/global/app-interceptor/app-interceptor.module";
import { AppPipeModule } from "./shared/modules/global/app-pipe/app-pipe.module";
import { ContextModule } from "./shared/modules/global/context/context.module";
import { CryptoModule } from "./shared/modules/global/crypto/crypto.module";
import { DatabaseModule } from "./shared/modules/global/database/database.module";
import { JwtTokenModule } from "./shared/modules/global/jwt-token/jwt-token.module";
import { LoggerModule } from "./shared/modules/global/logger/logger.module";
import { MagicLinkModule } from "./shared/modules/global/magic-link/magic-link.module";
import { MailerModule } from "./shared/modules/global/mailer/mailer.module";
import { OtpGeneratorModule } from "./shared/modules/global/otp-generator/otp-generator.module";
import { ThrottlerModule } from "./shared/modules/global/throttler/throttler.module";

@Module({
  imports: [
    AuthModule,
    OtpModule,
    RoleModule,
    TokenModule,
    UserModule,
    AppFilterModule,
    AppGuardModule,
    AppInterceptorModule,
    AppPipeModule,
    ContextModule,
    CryptoModule,
    DatabaseModule,
    JwtTokenModule,
    LoggerModule,
    MailerModule,
    ThrottlerModule,
    OtpGeneratorModule,
    MagicLinkModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware).forRoutes("*path");
  }
}
