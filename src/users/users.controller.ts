import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Request,
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
import { UserRO } from './user.interface';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Post('user/:id')
  @UseGuards(RoleGuard(Role.USER))
  @UseGuards(JwtAuthGuard)
  async cool(@Request() req) {
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
