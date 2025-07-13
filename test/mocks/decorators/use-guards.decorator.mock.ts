import { mockFn } from "jest-mock-extended";
import { UseGuards } from "@nestjs/common";

export const getFreshUseGuardsMock = () => {
  const decorator = mockFn<typeof UseGuards>();

  decorator.mockImplementation((guards) => {
    return () => {};
  });
  return decorator;
};
