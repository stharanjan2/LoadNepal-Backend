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

  /*
  Passport first verifies the JWT's signature and decodes the JSON. It then invokes our validate()
  method passing the decoded JSON as its single parameter. Based on the way JWT signing works,
  we're guaranteed that we're receiving a valid token that we
  have previously signed and issued to a valid user.

  As a result of all this, our response to the validate() callback is 
  trivial: we simply return an object containing the userId and username 
  properties. Recall again that Passport will build a user object based on
  the return value of our validate() method, and attach it as a property on
   the Request object.
  
  */

  //First verifies access token and decodes payload as sends it back

  async validate(payload: { userId: number; roles: string }) {
    console.log('Verifying token');
    return {
      userId: payload.userId,
      roles: payload.roles,
    };
  }
}
