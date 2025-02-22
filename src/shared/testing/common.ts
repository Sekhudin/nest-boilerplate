import { TypeOrmModule } from "@nestjs/typeorm";
import { ROUTE_ARGS_METADATA } from "@nestjs/common/constants";
import { ModuleMetadata } from "@nestjs/common/interfaces/modules/module-metadata.interface";
import { databaseConfig } from "src/configs/database.config";
import { User } from "src/modules/users/entities/user.entity";
import { Device } from "src/modules/devices/entities/device.entity";
import { AuthProvider } from "src/modules/auth-providers/entities/auth-provider.entity";
import type { ParamsDecorator, MockRequest } from "src/types/testing.type";

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

export function getDecoratorParamsFactory<T>(
  request: MockRequest,
  Decorator: ParamsDecorator,
  property?: string,
) {
  class TestDecorator {
    public test(@Decorator() value: T) {}
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, TestDecorator, "test");
  return args[Object.keys(args)[0]].factory("test", request) as T;
}

// export function getDecoratorFactory<T>(request: MockRequest, Decorator: ParamsDecorator, property?: any) {
//   class TestDecorator {
//     @Decorator(property)
//     public test() {}
//   }
// }
