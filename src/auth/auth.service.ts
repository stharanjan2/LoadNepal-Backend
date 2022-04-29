import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { AuthLoginDto } from './dto/auth-login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { SendOtpDto } from './otp/send.otp.dto';
import { Otp } from './otp/otp.entity';
import { VerifyOtpDto } from './otp/verify.otp.dto';
import { MailService } from 'src/mail/mail.service';
import { OtpService } from './otp/otp.service';
import { EditUserDto } from 'src/users/dto/edit-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly otpService: OtpService,
    public readonly userService: UsersService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);
    const jwt_payload = {
      userId: user._id,
      roles: user.roles,
    };
    const token = this.jwtService.sign(jwt_payload);

    if (user.roles === 'driver') {
      return {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: ['Roles_DRIVER'],
        accessToken: token,
        // identification: user.identification,
        phoneNumber: user.phoneNumber,
        verified: user.verified,
      };
    } else if (user.roles === 'admin') {
      return {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: ['Roles_ADMIN'],
        phoneNumber: user.phoneNumber,
        accessToken: token,
      };
    } else {
      return {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: ['Roles_USER'],
        phoneNumber: user.phoneNumber,
        accessToken: token,
        verified: user.verified,
        city: user.city,
        district: user.district,
        street: user.street,
        state: user.state,
        pan: user.pan,
        contact_person: user.contact_person,
      };
    }
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { email, password } = authLoginDto;
    const user = await this.userRepository.findOne({
      email: email,
    });
    console.log('FOUND PHONE NO', user);

    if (!(await user?.validatePassword(password))) {
      throw new HttpException(
        `User not found with entered credentials `,
        HttpStatus.NOT_FOUND,
      );
    }
    delete user.password;
    return user;
  }

  async signup(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await user.save();
    delete user.password;
    return user;
  }

  async sendOtp(otpDto: SendOtpDto) {
    const { email } = otpDto;
    console.log('RECEIVED MAIL', email);
    try {
      const _otpEntity = await this.otpService.send(email);
      return {
        message: 'Successfully sent Otp',
        otp: _otpEntity.otp,
        email: _otpEntity.email,
      };
    } catch (error) {
      console.log('Error while sending otp', error);

      throw new HttpException(
        `Unable to send otp mail  : ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyOtp(otpDto) {
    const { email, otp } = otpDto;
    console.log('OTP FROM FRONTEND', otp, email);
    try {
      const _otpRecord = await this.otpService.verify(email, otp);
      if (_otpRecord) {
        return 'Otp Successfully Verified ';
      } else {
        return new HttpException(
          "Sorry Couldn't vaerify OTP",
          HttpStatus.NOT_FOUND,
        );
        // throw new HttpException(
        //   "Sorry Couldn't vaerify OTP",
        //   HttpStatus.NOT_FOUND,
        // );
      }
    } catch (error) {
      throw new HttpException(
        ` ERROR WHILE VERIFYING OTP   ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async editProfile(editUserDto: EditUserDto, _user): Promise<Object> {
    try {
      console.log('Edit paramaters', editUserDto);

      const userId = _user.userId;
      let toUpdateUser = await this.userService.findUser(userId);
      if (!toUpdateUser) {
        throw new HttpException(` No User Found`, HttpStatus.NOT_FOUND);
      }
      delete toUpdateUser.password;
      delete toUpdateUser.email;
      let updatedUser = Object.assign(toUpdateUser, editUserDto);
      console.log('Updated profile is', updatedUser);
      await toUpdateUser.save();
      return { message: 'successfully updated user profile' };
    } catch (error) {
      console.log('Error while editing user profile', error);
      throw new HttpException(
        ` ERROR WHILE EDITING PROFILE   ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
