import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/modules/auth/auth.module";
import { UserModule } from "src/modules/users/user.module";
import { DeviceModule } from "src/modules/devices/device.module";
import { AuthProviderModule } from "src/modules/auth-providers/auth-provider.module";
import { LoggerService } from "src/shared/services/logger.service";
import { databaseConfig } from "src/configs/database.config";

@Module({
  imports: [
    AuthModule,
    UserModule,
    DeviceModule,
    AuthProviderModule,
    TypeOrmModule.forRoot({ ...databaseConfig }),
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class AppModule {}
