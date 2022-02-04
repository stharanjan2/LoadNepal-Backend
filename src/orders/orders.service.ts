import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import Role from 'src/users/role.enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
  constructor(
    // @Inject('ORDER_REPOSITORY')
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    // @Inject('USER_REPOSITORY')
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const clientId = createOrderDto.clientId;
    const user = await this.userRepository.findOne({ id: clientId });
    if (!user) {
      throw new HttpException(
        `${Role.USER} Not Found With given Id  `,
        HttpStatus.NOT_FOUND,
      );
    }

    const order = this.orderRepository.create(createOrderDto);
    order.user = user;
    console.log('Order', createOrderDto);

    await order.save();
    delete order.user.password;
    return order;
  }

  async getAllOrders() {
    try {
      const records = await this.orderRepository.find({
        // isAccepted: false,
      });
      if (records) {
        return records;
      }
    } catch (error) {
      throw new HttpException(
        ` Intenal Server Error  `,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
