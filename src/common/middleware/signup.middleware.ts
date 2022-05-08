import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Role from 'src/users/role.enum';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SignupMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async use(req: any, res: any, next: () => void) {
    //check for duplicate username,email,phoneNumber
    console.log('Running middleware');

    const { username, email, phoneNumber } = req.body;
    console.log('BODY', req.body);
    //roles is in array so we need first item
    //SETTING ROLES TO ['user'] 
    const _roles = [Role.USER];
    req.body.roles = _roles;

    const user = await this.userRepository.findOne({
      where: [
        {
          username: username,
        },
        {
          email: email,
        },
        {
          phoneNumber: phoneNumber,
        },
      ],
    });

    if (user) {
      throw new HttpException(
        'User Already exists with entered details please enter new credentials',
        HttpStatus.BAD_REQUEST,
      );
    }

    //Check for valid role
    //   if (
    //     !(
    //       _roles === Role.ADMIN ||
    //       _roles === Role.DRIVER ||
    //       _roles === Role.OWNER ||
    //       _roles === Role.USER
    //     )
    //   ) {
    //     throw new HttpException(
    //       `Failed! Role ${_roles} doesnt exist`,
    //       HttpStatus.BAD_REQUEST,
    //     );
    //   }

    next();
  }
}
