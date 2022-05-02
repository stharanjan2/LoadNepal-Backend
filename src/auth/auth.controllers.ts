import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Headers,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './jwt.auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

import jwt_decode from 'jwt-decode';
import { UsersService } from 'src/users/users.service';
import { ApiTags } from '@nestjs/swagger';
import { SendOtpDto } from './otp/send.otp.dto';
import { VerifyOtpDto } from './otp/verify.otp.dto';
import RoleGuard from 'src/users/role.guard';
import Role from 'src/users/role.enum';
import { EditOrderDto } from 'src/orders/dto/edit-order-dto';
import { UserDecorator } from 'src/users/user.decorators';
import { EditUserDto } from 'src/users/dto/edit-user.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
@ApiTags('authentication')
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtStrategy: JwtStrategy,
    private readonly usersService: UsersService,
  ) {}

  //-------------FOR SIGNIN-------------------
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signin')
  async login(@Body() authLoginDto: AuthLoginDto) {
    console.log('Signing in');

    return this.authService.login(authLoginDto);
  }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // async test(@Headers() header) {
  //   const head = header['x-access-token'];
  //   console.log('HEadter', head);
  //   console.log('Decoded from header', jwt_decode(head));

  //   // console.log('cool validation', this.jwtStrategy.validate());
  //   return 'Successful person';
  // }

  // --------------- OTP ---------------
  @Post('sendOtp')
  async sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.authService.sendOtp(sendOtpDto);
  }

  @Post('verifyOtp')
  async verifyOtp(@Body() verifyOtpDto) {
    console.log('DTO', verifyOtpDto);

    return this.authService.verifyOtp(verifyOtpDto);
  }

  @Get('adminVerification')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtAuthGuard)
  async adminIsAuthorized() {
    console.log('ADMIN IS VERIFIED');
    return { isAuthorized: true };
  }

  //--------------------------FRONT END  DASHBOARD AUTHORIZATION----------
  @Get('driverVerification')
  @UseGuards(RoleGuard(Role.DRIVER))
  @UseGuards(JwtAuthGuard)
  async driverIsAuthorized() {
    console.log('DRIVER IS VERIFIED');

    return { isAuthorized: true };
  }

  @Get('userVerification')
  @UseGuards(RoleGuard(Role.USER))
  @UseGuards(JwtAuthGuard)
  async userIsAuthorized() {
    console.log('USER IS VERIFIED');
    return { isAuthorized: true };
  }

  //----------------------------SIGNUP----------------
  @ApiProperty()
  @UsePipes(new ValidationPipe())
  @Post('customer/signup')
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('Signininup');
    console.log('DTO', createUserDto);

    return this.authService.signup(createUserDto);
  }

  // @UsePipes(new ValidationPipe())
  // @Post('admin/signup')
  // async createAdmin(@Body() createAdminDto: CreateAdminDto) {
  //   console.log('Signininup');
  //   console.log('DTO', createAdminDto);
  //   return this.authService.signup(createAdminDto);
  // }

  @Patch('editProfile')
  @UseGuards(JwtAuthGuard)
  async editProfile(@Body() editUserDto: EditUserDto, @UserDecorator() _user) {
    console.log('Profile', editUserDto);

    return this.authService.editProfile(editUserDto, _user);
  }
}
