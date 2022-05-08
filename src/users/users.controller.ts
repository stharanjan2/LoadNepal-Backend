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
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UserDecorator } from './user.decorators';
import { ApiTags, ApiResponse } from '@nestjs/swagger';


//---------Admin gets list of all users ---------
@ApiTags('admin')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  // @Post('user')
  // @UseGuards(RoleGuard(Role.DRIVER))
  // @UseGuards(JwtAuthGuard)
  // async cool(@UserDecorator() user) {
  //   return `Admin role ${user.userId} ${user.roles}`;
  // }
}
