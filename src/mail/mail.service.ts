import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendOtpMail(_emailAddress, _otp) {
    await this.mailerService.sendMail({
      to: _emailAddress,
      from: 'freightservicenepal@gmail.com',
      subject: 'Otp Verification',
      text: `Yout OTP code is ${_otp}`,
    });
  }
}
