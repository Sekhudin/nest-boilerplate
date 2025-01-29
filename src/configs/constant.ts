import * as path from "path";
import { match } from "ts-pattern";

export const env = (environment: string | undefined, defaultValue?: string) => {
  return environment?.trim() || defaultValue?.trim() || "";
};

export const isMatch = (value: any, expectedValue: any): boolean => {
  return match(value)
    .with(expectedValue, () => true)
    .otherwise(() => false);
};

export const NODE_ENV = env(process.env.NODE_ENV, "development").toLowerCase();
export const EnvPath = "env/".concat(".env.", NODE_ENV);
export const RootDir = path.join(__dirname, "..", "..");

export const isProduction = (): boolean => isMatch(NODE_ENV, "production");
export const pathDir = (...paths: string[]) => path.join(RootDir, ...paths);
