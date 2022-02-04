import Role from './role.enum';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  mixin,
  Type,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { ExtractJwt } from 'passport-jwt';
import jwt_decode from 'jwt-decode';
import { InjectRepository } from '@nestjs/typeorm';

// import RequestWithUser from '../authentication/requestWithUser.interface';

const RoleGuard = (role: Role): Type<CanActivate> => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    constructor(
      // @Inject('USER_REPOSITORY')
      @InjectRepository(User)
      private userRepository: Repository<User>,
    ) {}

    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<any>();
      const user = request.user;
      // const user = await this.userRepository.findOne({ id: _id });
      console.log('USER FROM GUARD ', user);

      return user?.roles.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
