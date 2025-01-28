import * as path from "path";
import { match } from "ts-pattern";

export const env = (environment: any, defaultValue?: string): string => {
  return environment || defaultValue || "";
};

export const isMatch = (value: string, expectedValue: string): boolean => {
  return match(value.trim())
    .returnType<boolean>()
    .with(expectedValue, () => true)
    .otherwise(() => false);
};

export const NODE_ENV = env(process.env.NODE_ENV, "development").toLowerCase();
export const EnvPath = "env/".concat(".env.", NODE_ENV);
export const RootDir = path.join(__dirname, "..", "..");
export const StaticDir = path.join(RootDir, "public");

export const isProduction = (): boolean => isMatch(NODE_ENV, "production");
