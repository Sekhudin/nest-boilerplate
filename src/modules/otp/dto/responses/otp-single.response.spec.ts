import { plainToInstance } from "class-transformer";
import { getFreshOtpDtoMock } from "test/mocks/dto/otp.dto.mock";
import { getFreshMetadataMock } from "test/mocks/utils/metadata.mock";
import { OtpSingleResponse } from "./otp-single.response";
import { OtpDto } from "./otp.dto";

describe("OtpSingleResponse", () => {
  const otpDtoMock = getFreshOtpDtoMock();
  const metadataMock = getFreshMetadataMock();

  describe("constructor", () => {
    it("should assign values from input", () => {
      const input = { data: otpDtoMock, meta: metadataMock };
      const response = new OtpSingleResponse(input);

      expect(response.data).toEqual(otpDtoMock);
      expect(response.meta).toEqual(metadataMock);
    });
  });

  describe("from", () => {
    it("should return a new OtpSingleResponse with data and meta", () => {
      const response = OtpSingleResponse.from(otpDtoMock, metadataMock);

      expect(response).toBeInstanceOf(OtpSingleResponse);
      expect(response.data).toEqual(otpDtoMock);
      expect(response.meta).toEqual(metadataMock);
    });

    it("should work without meta", () => {
      const response = OtpSingleResponse.from(otpDtoMock);

      expect(response).toBeInstanceOf(OtpSingleResponse);
      expect(response.data).toEqual(otpDtoMock);
      expect(response.meta).toBeUndefined();
    });
  });

  describe("plainToInstance", () => {
    it('should transform "data" into an instance of OtpDto', () => {
      const plain: OtpSingleResponse = {
        data: otpDtoMock,
        meta: metadataMock,
      };

      const result = plainToInstance(OtpSingleResponse, plain);

      expect(result.data).toBeInstanceOf(OtpDto);
    });
  });
});
