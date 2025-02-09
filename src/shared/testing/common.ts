import { ModuleMetadata } from "@nestjs/common/interfaces/modules/module-metadata.interface";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfig } from "src/configs/database.config";
import { User } from "src/modules/users/entities/user.entity";
import { Device } from "src/modules/devices/entities/device.entity";
import { AuthProvider } from "src/modules/auth-providers/entities/auth-provider.entity";

export const Imports = (...modules: ModuleMetadata["imports"]): ModuleMetadata["imports"] => {
  return [
    TypeOrmModule.forRoot({ ...databaseConfig }),
    TypeOrmModule.forFeature([User, Device, AuthProvider]),
    ...modules,
  ];
};

export const Providers = (...providers: ModuleMetadata["providers"]): ModuleMetadata["providers"] => {
  return [...providers];
};
