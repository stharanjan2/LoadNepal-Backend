import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRO } from './user.interface';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  @UsePipes(new ValidationPipe())
  @Post('register')
  async post(@Body() user: CreateUserDto): Promise<UserRO> {
    return this.userService.postAll(user);
  }
}
