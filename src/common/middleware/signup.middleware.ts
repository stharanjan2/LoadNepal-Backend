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
    const { username, email, phoneNumber, roles } = req.body;
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
    if (
      !(
        roles === Role.ADMIN ||
        roles === Role.DRIVER ||
        roles === Role.OWNER ||
        roles === Role.USER
      )
    ) {
      throw new HttpException(
        `Failed! Role ${roles} doesnt exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    next();
  }
}
