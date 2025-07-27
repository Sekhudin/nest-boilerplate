import { plainToInstance } from "class-transformer";
import { getFreshOtpDtoMock } from "test/mocks/dto/otp.dto.mock";
import { getFreshMetadataMock } from "test/mocks/utils/metadata.mock";
import { SignUpLocalOtpDto } from "./sign-up-local-otp.dto";
import { SignUpLocalOtpResponse } from "./sign-up-local-otp.response";

describe("SignUpLocalOtpResponse", () => {
  const dataMock = getFreshOtpDtoMock();
  const metadataMock = getFreshMetadataMock();

  describe("constructor", () => {
    it("should assign values from input", () => {
      const input = { data: dataMock, meta: metadataMock };
      const response = new SignUpLocalOtpResponse(input);

      expect(response.data).toEqual(dataMock);
      expect(response.meta).toEqual(metadataMock);
    });
  });

  describe("from", () => {
    it("should return a new SignUpLocalOtpResponse with data and meta", () => {
      const response = SignUpLocalOtpResponse.from(dataMock, metadataMock);

      expect(response).toBeInstanceOf(SignUpLocalOtpResponse);
      expect(response.data).toEqual(dataMock);
      expect(response.meta).toEqual(metadataMock);
    });

    it("should work without meta", () => {
      const response = SignUpLocalOtpResponse.from(dataMock);

      expect(response).toBeInstanceOf(SignUpLocalOtpResponse);
      expect(response.data).toEqual(dataMock);
      expect(response.meta).toBeUndefined();
    });
  });

  describe("plainToInstance", () => {
    it('should transform "data" into an instance of SignUpLocalOtpDto', () => {
      const plain: SignUpLocalOtpResponse = {
        data: dataMock,
        meta: metadataMock,
      };

      const result = plainToInstance(SignUpLocalOtpResponse, plain);

      expect(result.data).toBeInstanceOf(SignUpLocalOtpDto);
    });
  });
});
