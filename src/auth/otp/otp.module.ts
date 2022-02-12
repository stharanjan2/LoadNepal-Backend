import { Module } from '@nestjs/common';
import { MailModule } from 'src/mail/mail.module';
import { Otp } from './otp.entity';
import { OtpService } from './otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Otp]), MailModule],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
