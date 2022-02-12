import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { Otp } from './otp.entity';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
    private readonly mailService: MailService,
  ) {}

  async genSixDigitRandomNumber(): Promise<Number> {
    const _OTP = 100000 + Math.floor(Math.random() * 900000);
    return _OTP;
  }

  async send(_emailAddress: String): Promise<Otp> {
    console.log('OTP SENDING---- ');

    const oldOtp = await this.otpRepository.findOne({ email: _emailAddress });
    if (oldOtp) {
      await this.otpRepository.remove(oldOtp);
    }
    const _OTP = await this.genSixDigitRandomNumber();
    console.log('RANDOM NO GENERATED IS--', _OTP);
    const newOtp = this.otpRepository.create({
      email: _emailAddress,
      otp: _OTP,
    });

    await this.mailService.sendOtpMail(_emailAddress, _OTP);
    await newOtp.save();

    return newOtp;
  }

  async verify(_emailAddress, _otp): Promise<Otp> {
    console.log('VERIFYING OTP');
    const _otpRecord = await this.otpRepository.findOne({
      email: _emailAddress,
      otp: _otp,
    });
    return _otpRecord;
  }
}
