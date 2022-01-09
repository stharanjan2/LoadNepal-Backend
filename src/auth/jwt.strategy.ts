import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // private authService: AuthService
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
      ignoreExpiration: false,
      secretOrKey: 'my-secret-key',
    });
  }
  async validate(payload: { userId: number; roles: string }) {
    // const user = await this.authService.validateUser(username);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
    // console.log('Payload rfrom startegy', payload);

    return {
      userId: payload.userId,
      roles: payload.roles,
    };
  }
}
