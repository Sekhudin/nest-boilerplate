import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { OtpService } from "./otp.service";

@Controller("otp")
export class OtpController {
  constructor(private readonly otpService: OtpService) {}
}
