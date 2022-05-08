import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { title } from 'process';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly userService: UsersService,
  ) {}
  async sendNotification(
    createNotificationDto: CreateNotificationDto,
    _user,
  ): Promise<Object> {
    try {
      const { title, message, type, receiverId } = createNotificationDto;
      console.log('ID --------', _user);

      const senderId = _user.userId;
      console.log('NOTIFICTTION SENDER ID', senderId);
      console.log('NOTIFICATION DTO', createNotificationDto);

      const sender = await this.userService.findUser(senderId);
      const receiver = await this.userService.findUser(receiverId);
      const notification: Notification = this.notificationRepository.create(
        createNotificationDto,
      );
      notification.sender = sender;
      notification.receiver = receiver;

      await notification.save();
      console.log('NOTIFICATION CREATED', notification);
      return {
        message: 'Request successful ! , Notification will be sent to cilent',
      };
    } catch (error) {
      console.log('ERROR ON SENDING NOTIFICATION', error);

      throw new HttpException(` ${error} `, HttpStatus.BAD_REQUEST);
    }
  }

  async getNotification(_user): Promise<Notification[]> {
    try {
      const receiverId = _user.userId;
      const receiver = await this.userService.findUser(receiverId);
      const notifications = await this.notificationRepository.find({
        receiver: receiver,
      });
      console.log('FETECHED NOTIFICATION', notifications);

      return notifications;
    } catch (error) {
      console.log('ERROR IN FETCHING NOTIFICATION', error);
      throw new HttpException(` ${error} `, HttpStatus.BAD_REQUEST);
    }
  }

  async updateIsViewed(_user): Promise<Object> {
    try {
      const receiver = await this.userService.findUser(_user.userId);
      // const response = await Notification.updateMany(
      //   { receiverId: userId, isViewed: false },
      //   { $set: { isViewed: true } },
      // );
      const response = await this.notificationRepository.update(
        { receiver: receiver, isViewed: false },
        { isViewed: true },
      );
      console.log('Notifications  UPDATED', response);
      return response;
    } catch (error) {
      console.log('ERROR ON UPDATING NOTIFICATION STATUS', error);
    }
  }
}
