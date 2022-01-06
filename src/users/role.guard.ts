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

// import RequestWithUser from '../authentication/requestWithUser.interface';

const RoleGuard = (role: Role): Type<CanActivate> => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    constructor(
      @Inject('USER_REPOSITORY')
      private userRepository: Repository<User>,
    ) {}

    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<any>();
      const user_req_body = request.body;
      const _id = request.params.id;

      const user = await this.userRepository.findOne({ id: _id });
      return user?.roles.includes(role);
      // // return user_id.email.includes(role);
      // console.log('USer id from', user_id);

      // return user_req_body?.roles.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
