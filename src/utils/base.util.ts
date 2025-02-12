import { match } from "ts-pattern";

export const isMatch = (value: any, expectedValue: any): boolean => {
  return match(value)
    .with(expectedValue, () => true)
    .otherwise(() => false);
};
