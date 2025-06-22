import { Injectable } from "@nestjs/common";
import { ContextService } from "src/shared/modules/global/context/context.service";
import { CookieService } from "src/shared/modules/global/context/cookie.service";
import { BillingMailerService } from "src/shared/modules/global/mailer/billing-mailer.service";
import { NewsletterMailerService } from "src/shared/modules/global/mailer/newsletter-mailer.service";
import { OtpMailerService } from "src/shared/modules/global/mailer/otp-mailer.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly cookieService: CookieService,
    private readonly contextService: ContextService,
    private readonly otpMailer: OtpMailerService,
    private readonly billingMailer: BillingMailerService,
    private readonly newsletterMailer: NewsletterMailerService,
  ) {
    console.log("INSTANCE AuthService");
  }

  async create(createAuthDto: CreateAuthDto) {
    this.cookieService.setRefreshToken("CONTOH_REFRESH_TOKEN");
    try {
      await this.otpMailer.send();
      await this.billingMailer.send();
      return "success";
    } catch (error) {
      console.log(error);
      return "failed";
    }
  }

  findAll() {
    const token = this.cookieService.getRefreshToken();
    const requestId = this.contextService.getRequestId();
    const deviceId = this.contextService.getDeviceId();
    const userAgent = this.contextService.getUserAgent();
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove() {
    this.cookieService.clearRefreshToken();
    return `This action removes a # auth`;
  }
}
