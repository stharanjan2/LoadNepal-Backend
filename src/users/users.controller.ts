import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Request,
  Headers,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import RoleGuard from './role.guard';
import Role from './role.enum';

import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Post('user')
  @UseGuards(RoleGuard(Role.DRIVER))
  @UseGuards(JwtAuthGuard)
  async cool() {
    return 'Admin role';
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  // async post(@Body() user: CreateUserDto): Promise<UserRO> {
  //   return this.userService.postAll(user);
  // }
}
