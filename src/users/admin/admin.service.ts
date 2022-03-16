import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EditOrderDto } from 'src/orders/dto/edit-order-dto';
import { Order } from 'src/orders/entities/order.entity';
import { OrdersService } from 'src/orders/orders.service';
import { User } from '../users.entity';
import { UsersService } from '../users.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UsersService,
    private readonly ordersService: OrdersService,
  ) {}

  async getAllUsers(): Promise<Object> {
    const allUserAndDriver = await this.userService.findUsersByQuery({
      roles: 'user',
    });
    console.log('ALL', allUserAndDriver);
    return { allusers: allUserAndDriver };
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.ordersService.adminViewAllOrders();
  }

  async editUserOrder(orderId, editParamater: EditOrderDto): Promise<Order> {
    return await this.ordersService.editOrder(orderId, editParamater);
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
