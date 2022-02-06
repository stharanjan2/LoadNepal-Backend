import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './jwt.auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { CreateUserDto } from './dto/create-user.dto';

import jwt_decode from 'jwt-decode';
import { UsersService } from 'src/users/users.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtStrategy: JwtStrategy,
    private readonly usersService: UsersService,
  ) {}

  @Post('signin')
  async login(@Body() authLoginDto: AuthLoginDto) {
    console.log('Signing in');

    return this.authService.login(authLoginDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async test(@Headers() header) {
    const head = header['x-access-token'];
    console.log('HEadter', head);
    console.log('Decoded from header', jwt_decode(head));

    // console.log('cool validation', this.jwtStrategy.validate());
    return 'Successful person';
  }

  @UsePipes(new ValidationPipe())
  @Post('customer/signup')
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('Signininup');
    console.log('DTO', createUserDto);

    return this.authService.signup(createUserDto);
  }
}
