import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendOtpMail(_emailAddress: String, _otp: Number) {
    await this.mailerService.sendMail({
      to: _emailAddress.toString(),
      from: process.env.EMAIL,
      subject: 'Otp Verification',
      text: `Yout OTP code is ${_otp}`,
    });
  }
}
