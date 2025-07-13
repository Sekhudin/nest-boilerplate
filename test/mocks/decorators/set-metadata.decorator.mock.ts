import { mockFn } from "jest-mock-extended";
import { CustomDecorator, SetMetadata } from "@nestjs/common";

export const getFreshSetMetadataMock = () => {
  const decorator = mockFn<typeof SetMetadata>();

  decorator.mockImplementation(<K = string, V = unknown>(metadataKey: K, metadataValue: V) => {
    const customDecoratorMock: CustomDecorator<K> = Object.assign(() => {}, { KEY: metadataKey });
    return customDecoratorMock;
  });
  return decorator;
};
