import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import { UserRO } from './user.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async postAll(dto: CreateUserDto): Promise<User> {
    const { username, email, district } = dto;
    let user = new User();
    user.username = username;
    user.dristrict = district;
    user.email = email;
    console.log(user);
    await this.userRepository.save(user);
    return user;
  }
}
