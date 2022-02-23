import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users.entity';
import { UsersService } from '../users.service';

@Injectable()
export class AdminService {
  constructor(private readonly userService: UsersService) {}

  async getAllUsers(): Promise<Object> {
    const allUserAndDriver = await this.userService.findAll();
    console.log('ALL', allUserAndDriver);
    return { allusers: allUserAndDriver };
  }

  //TODO need to make query paramater more organized
  async verifyUser(user_id: number): Promise<Object> {
    try {
      console.log('VERIFICATION REQUEST RECEIVED');
      const _user = await this.userService.findUserByConditionAndVerify({
        _id: user_id,
        verified: false,
      });
      return { allusers: _user };
    } catch (error) {}
  }
}
