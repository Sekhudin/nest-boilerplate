import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/modules/auth/auth.module";
import { UserModule } from "src/modules/users/user.module";
import { DeviceModule } from "src/modules/devices/device.module";
import { AuthProviderModule } from "src/modules/auth-providers/auth-provider.module";
import { LoggerService } from "src/shared/services/logger.service";
import { AppExceptionFilter } from "src/shared/filters/app-exception.filter";
import { databaseConfig } from "src/configs/database.config";
import { APP_FILTER } from "@nestjs/core";

@Module({
  imports: [
    AuthModule,
    UserModule,
    DeviceModule,
    AuthProviderModule,
    TypeOrmModule.forRoot({ ...databaseConfig }),
  ],
  exports: [LoggerService],
  providers: [LoggerService, { provide: APP_FILTER, useClass: AppExceptionFilter }],
})
export class AppModule {}
