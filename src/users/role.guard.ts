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
import { InjectRepository } from '@nestjs/typeorm';

const RoleGuard = (role: Role): Type<CanActivate> => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
    ) {}

    async canActivate(context: ExecutionContext) {
      console.log('Role checking');

      const request = context.switchToHttp().getRequest<any>();
      const user = request.user;
      console.log('Role check complete', user.roles);
      console.log('ROLE----', role);

      console.log('ROOOR', user?.roles.includes(role));

      return user?.roles.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
