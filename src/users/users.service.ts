import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: // private  @Inject('USER_REPOSITORY')
    Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);

    try {
      await user.save();
    } catch (err) {
      throw new HttpException(` ${err} `, HttpStatus.BAD_REQUEST);
    }

    delete user.password;
    return user;
  }

  async findAll(): Promise<User[]> {
    this.userRepository.create;
    return this.userRepository.find();
  }
  async postAll(dto: CreateUserDto): Promise<User> {
    const { username, email } = dto;
    let user = new User();
    user.username = username;
    user.email = email;
    console.log(user);
    await this.userRepository.save(user);
    return user;
  }

  async findOne(phoneNumber: number): Promise<User | undefined> {
    return this.userRepository.findOne({ phoneNumber: phoneNumber });
  }

  async findUsersByQuery(condition: object): Promise<User[]> {
    return await this.userRepository.find(condition);
  }

  async findUser(_userId: number): Promise<User | undefined> {
    const user = this.userRepository.findOne({ _id: _userId });
    if (!user) {
      throw new HttpException(
        'No User Found With given Id',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
  //TODO need to modify this
  async findUserByConditionAndVerify(
    _query: object,
  ): Promise<User | undefined> {
    const user = await this.userRepository.findOne(_query);
    if (!user) {
      throw new HttpException(
        'No User Found With given Id',
        HttpStatus.NOT_FOUND,
      );
    }
    user.verified = true;
    await user.save();
    delete user.password;
    return user;
  }
}
