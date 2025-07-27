import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import { getFreshMetadataMock } from "test/mocks/utils/metadata.mock";
import { SignInTokenDto } from "./sign-in-token.dto";
import { SignInTokenResponse } from "./sign-in-token.response";

describe("SignInTokenResponse", () => {
  const dataMock: SignInTokenDto = { accessToken: "access-token", refreshToken: "refreshToken" };
  const metadataMock = getFreshMetadataMock();

  describe("constructor", () => {
    it("should assign values from input", () => {
      const input = { data: dataMock, meta: metadataMock };
      const response = new SignInTokenResponse(input);

      expect(response.data).toEqual(dataMock);
      expect(response.meta).toEqual(metadataMock);
    });
  });

  describe("from", () => {
    it("should return a new SignInTokenResponse with data and meta", () => {
      const response = SignInTokenResponse.from(dataMock, metadataMock);

      expect(response).toBeInstanceOf(SignInTokenResponse);
      expect(response.data).toEqual(dataMock);
      expect(response.meta).toEqual(metadataMock);
    });

    it("should work without meta", () => {
      const response = SignInTokenResponse.from(dataMock);

      expect(response).toBeInstanceOf(SignInTokenResponse);
      expect(response.data).toEqual(dataMock);
      expect(response.meta).toBeUndefined();
    });
  });

  describe("plainToInstance", () => {
    it('should transform "data" into an instance of SignInTokenDto', () => {
      const plain: SignInTokenResponse = {
        data: dataMock,
        meta: metadataMock,
      };

      const result = plainToInstance(SignInTokenResponse, plain);

      expect(result.data).toBeInstanceOf(SignInTokenDto);
    });
  });
});
