import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import { getFreshMetadataMock } from "test/mocks/utils/metadata.mock";
import { RefreshTokenDto } from "./refresh-token.dto";
import { RefreshTokenResponse } from "./refresh-token.response";

describe("RefreshTokenResponse", () => {
  const dataMock: RefreshTokenDto = { accessToken: "access-token" };
  const metadataMock = getFreshMetadataMock();

  describe("constructor", () => {
    it("should assign values from input", () => {
      const input = { data: dataMock, meta: metadataMock };
      const response = new RefreshTokenResponse(input);

      expect(response.data).toEqual(dataMock);
      expect(response.meta).toEqual(metadataMock);
    });
  });

  describe("from", () => {
    it("should return a new RefreshTokenResponse with data and meta", () => {
      const response = RefreshTokenResponse.from(dataMock, metadataMock);

      expect(response).toBeInstanceOf(RefreshTokenResponse);
      expect(response.data).toEqual(dataMock);
      expect(response.meta).toEqual(metadataMock);
    });
  });

  describe("plainToInstance", () => {
    it('should transform "data" into an instance of RefreshTokenDto', () => {
      const plain: RefreshTokenResponse = {
        data: dataMock,
        meta: metadataMock,
      };

      const result = plainToInstance(RefreshTokenResponse, plain);

      expect(result.data).toBeInstanceOf(RefreshTokenDto);
    });
  });
});
