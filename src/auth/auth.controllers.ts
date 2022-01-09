import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './jwt.auth.guard';
import { JwtStrategy } from './jwt.strategy';
import jwt_decode from 'jwt-decode';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtStrategy: JwtStrategy,
  ) {}
  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
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
}
