import * as path from "path";
import { match, P } from "ts-pattern";

export const env = (environment: any, defaultValue?: string): string => {
  return environment || defaultValue || "";
};

export const envMatch = (value: any, expectedValue: any): boolean => {
  return match(value)
    .returnType<boolean>()
    .with(expectedValue, () => true)
    .otherwise(() => false);
};

export const NodeEnv = env(process.env.NODE_ENV, "development").toLowerCase();
export const EnvPath = "env/".concat(".env.", NodeEnv);
export const RootDir = path.join(__dirname, "..", "..");

export const isProduction = (): boolean => envMatch(NodeEnv, "production");
