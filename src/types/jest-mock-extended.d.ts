import "jest-mock-extended";

declare module "jest-mock-extended" {
  type MockConfig<T, V = ""> = Omit<T, "env" | V>;
}
