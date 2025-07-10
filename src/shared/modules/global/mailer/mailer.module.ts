import { MailerModule as NestMailerModule } from "@nestjs-modules/mailer";
import { Global, Module } from "@nestjs/common";
import { mailerConfig } from "src/config/mailer.config";
import { BillingMailerService } from "./billing-mailer.service";
import { NewsletterMailerService } from "./newsletter-mailer.service";
import { OtpMailerService } from "./otp-mailer.service";

@Global()
@Module({
  imports: [NestMailerModule.forRoot(mailerConfig.mailerOptions)],
  providers: [OtpMailerService, BillingMailerService, NewsletterMailerService],
  exports: [OtpMailerService, BillingMailerService, NewsletterMailerService],
})
export class MailerModule {}
