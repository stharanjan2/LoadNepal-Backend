import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() { // private authService: AuthService
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'my-secret-key',
    });
  }
  async validate(payload: { userId: number }) {
    // const user = await this.authService.validateUser(username);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
    return {
      userId: payload.userId,
    };
  }
}
