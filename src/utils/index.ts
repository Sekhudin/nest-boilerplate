export const isMatchRegex = (pattern: RegExp, value: string) => {
  return pattern.test(value);
};

export const isNotMatchRegex = (pattern: RegExp, value: string) => {
  return !isMatchRegex(pattern, value);
};
