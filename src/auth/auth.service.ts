import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { AuthLoginDto } from './dto/auth-login.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);
    const jwt_payload = {
      userIId: user.id,
      roless: user.roles,
    };
    const token = this.jwtService.sign(jwt_payload);

    if (user.roles === 'driver') {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles,
        accessToken: token,
        identification: user.identification,
        phoneNumber: user.phoneNumber,
      };
    } else {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles,
        phoneNumber: user.phoneNumber,
        accessToken: token,
      };
    }
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { phoneNumber, password } = authLoginDto;
    const user = await this.userRepository.findOne({
      phoneNumber: phoneNumber,
    });
    if (!(await user?.validatePassword(password))) {
      throw new HttpException(
        `User not found with entered credentials `,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async signup(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await user.save();
    delete user.password;
    return user;
  }
}
