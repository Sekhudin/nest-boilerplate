import { isMatching } from "ts-pattern";
import { UnknownPattern } from "ts-pattern/dist/types/Pattern";

export const isMatch = (value: unknown, expected: UnknownPattern) => {
  return isMatching(expected)(value);
};

export const isNotMatch = (value: unknown, expected: UnknownPattern) => {
  return !isMatch(value, expected);
};

export const isMatchRegex = (pattern: RegExp, value: string) => {
  return pattern.test(value);
};

export const isNotMatchRegex = (pattern: RegExp, value: string) => {
  return !isMatchRegex(pattern, value);
};
