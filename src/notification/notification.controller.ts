import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { UserDecorator } from 'src/users/user.decorators';
import RoleGuard from 'src/users/role.guard';
import Role from 'src/users/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

// ----------------To send notification to concerened user----------------
@Controller('api/test/notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtAuthGuard)
  sendNotification(
    @Body() createNotificationDto: CreateNotificationDto,
    @UserDecorator() _user,
  ) {
    return this.notificationService.sendNotification(
      createNotificationDto,
      _user,
    );
  }

  // --------Get all unread notifications------------------
  @Get('getNotification')
  @UseGuards(JwtAuthGuard)
  getNotification(@UserDecorator() _user) {
    return this.notificationService.getNotification(_user);
  }

  //-----------Update notification as read ---------------------
  @Patch('updateIsViewed')
  // @UseGuards(RoleGuard(Role.USER))
  @UseGuards(JwtAuthGuard)
  updateIsViewed(@UserDecorator() _user) {
    return this.notificationService.updateIsViewed(_user);
  }
}
