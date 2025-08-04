import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import { mock } from "jest-mock-extended";
import { TokenDto } from "src/modules/token/dto/responses/token.dto";
import { getFreshMetadataMock } from "test/mocks/utils/metadata.mock";
import { SignOutResponse } from "./sign-out.response";

describe("SignOutResponse", () => {
  const dataMock = mock<TokenDto>();
  const metadataMock = getFreshMetadataMock();

  describe("constructor", () => {
    it("should assign values from input", () => {
      const input = { data: dataMock, meta: metadataMock };
      const response = new SignOutResponse(input);

      expect(response.data).toEqual(dataMock);
      expect(response.meta).toEqual(metadataMock);
    });
  });

  describe("from", () => {
    it("should return a new SignOutResponse with data and meta", () => {
      const response = SignOutResponse.from(dataMock, metadataMock);

      expect(response).toBeInstanceOf(SignOutResponse);
      expect(response.data).toEqual(dataMock);
      expect(response.meta).toEqual(metadataMock);
    });
  });

  describe("plainToInstance", () => {
    it('should transform "data" into an instance of TokenDto', () => {
      const plain: SignOutResponse = {
        data: dataMock,
        meta: metadataMock,
      };

      const result = plainToInstance(SignOutResponse, plain);

      expect(result.data).toBeInstanceOf(TokenDto);
    });
  });
});
