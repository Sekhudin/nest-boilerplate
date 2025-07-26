import { plainToInstance } from "class-transformer";
import { getFreshOtpDtoMock } from "test/mocks/dto/otp.dto.mock";
import { getFreshMetadataMock } from "test/mocks/utils/metadata.mock";
import { OtpDto } from "./otp.dto";
import { OtpResponse } from "./otp.response";

describe("OtpResponse", () => {
  const otpDtoMock = getFreshOtpDtoMock();
  const metadataMock = getFreshMetadataMock();

  describe("constructor", () => {
    it("should assign values from input", () => {
      const input = { data: otpDtoMock, meta: metadataMock };
      const response = new OtpResponse(input);

      expect(response.data).toEqual(otpDtoMock);
      expect(response.meta).toEqual(metadataMock);
    });
  });

  describe("from", () => {
    it("should return a new OtpResponse with data and meta", () => {
      const response = OtpResponse.from(otpDtoMock, metadataMock);

      expect(response).toBeInstanceOf(OtpResponse);
      expect(response.data).toEqual(otpDtoMock);
      expect(response.meta).toEqual(metadataMock);
    });

    it("should work without meta", () => {
      const response = OtpResponse.from(otpDtoMock);

      expect(response).toBeInstanceOf(OtpResponse);
      expect(response.data).toEqual(otpDtoMock);
      expect(response.meta).toBeUndefined();
    });
  });

  describe("plainToInstance", () => {
    it('should transform "data" into an instance of OtpDto', () => {
      const plain: OtpResponse = {
        data: otpDtoMock,
        meta: metadataMock,
      };

      const result = plainToInstance(OtpResponse, plain);

      expect(result.data).toBeInstanceOf(OtpDto);
    });
  });
});
