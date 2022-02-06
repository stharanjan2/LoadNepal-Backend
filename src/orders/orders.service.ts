import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/accept-order-dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import Role from 'src/users/role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { timeStamp } from 'console';
import { Vehicle } from 'src/vehicle/vehicle.entity';
import { VehicleService } from 'src/vehicle/vehicle.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly vehicleService: VehicleService,
    private readonly usersService: UsersService,
  ) {}

  async postOrders(createOrderDto: CreateOrderDto, _user) {
    console.log('Posting Orders');
    console.log('ORDER', createOrderDto);

    const user: User = await this.verifyOrder(createOrderDto, _user); //Verify whetehr order meets certain criterai and return back user
    await this.createOrders(createOrderDto, user); //Finally call create orders to crete orders
  }
  // const _userId = _user.userId;
  // const user = await this.usersService.findUser(_userId);
  // if (!user) {
  //   throw new HttpException(
  //     `${Role.USER} No User Found With given Id  `,
  //     HttpStatus.NOT_FOUND,
  //   );
  // }
  // const order = this.orderRepository.create(createOrderDto);
  // order.user = user;
  // console.log('Order', createOrderDto);

  // try {
  //   await order.save();
  //   delete order.user.password;
  //   return order;
  // } catch (error) {
  //   throw new HttpException(` ${error} `, HttpStatus.BAD_REQUEST);
  // }

  async createOrder(createOrderDto: CreateOrderDto, user) {
    console.log('Creating order');
    const order = this.orderRepository.create(createOrderDto);
    order.user = user;
    console.log('Order Created', createOrderDto);

    try {
      await order.save();
      return;
    } catch (error) {
      console.log('ERROR IN ORDER', error);

      throw new HttpException(` ${error} `, HttpStatus.BAD_REQUEST);
    }
  }

  async createOrders(createOrderDto: CreateOrderDto, user: User) {
    console.log('creating orders');
    const { noOfTruck } = createOrderDto;
    const _tempNoOfTruck = noOfTruck;
    console.log('TYPE OF VALUE', typeof noOfTruck);
    createOrderDto.noOfTruck = 1;
    for (let i = 0; i < _tempNoOfTruck; i++) {
      this.createOrder(createOrderDto, user);
    }
  }

  async verifyOrder(createOrderDto: CreateOrderDto, _user): Promise<User> {
    console.log('Verifying');

    const { noOfTruck } = createOrderDto;
    console.log('TYPE OF VALUE', typeof noOfTruck);
    console.log('No of truck', noOfTruck);

    const _userId = _user.userId;
    const user: User = await this.usersService.findUser(_userId);

    if (!user) {
      throw new HttpException(
        `${Role.USER} No User Found With given Id  `,
        HttpStatus.NOT_FOUND,
      );
    }

    if (noOfTruck < 1 || noOfTruck > 10)
      throw new HttpException(
        'No of Truck must be betwwn 1 - 10',
        HttpStatus.BAD_REQUEST,
      );
    console.log('Verified');

    return user;
  }

  async getAllOrders(filter): Promise<Order[]> {
    let filt = {};
    Object.keys(filter).map(function (key, index) {
      if (filter[key]) {
        filt[key] = filter[key];
      }
    });
    filt['isAccepted'] = false;
    filt['isLocked'] = false;

    try {
      const records = await this.orderRepository.find(
        filt,
        // isAccepted: false,
      );
      if (records) {
        console.log('ReCORDES', records);
        return records;
      }
    } catch (error) {
      console.log('ERROR IN DISPLAYING ORDERS');

      throw new HttpException(
        ` Intenal Server Error  `,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async userViewAllOrders(_user): Promise<Order[]> {
    const _userId = _user.userId;
    try {
      const user: User = await this.usersService.findUser(_userId);

      const orders = await this.orderRepository.find({
        user: user,
      });

      console.log('USER VIEWS HIS ALL ORDERS', orders);
      if (orders) {
        return orders;
      }
    } catch (error) {
      throw new HttpException(` No order found  `, HttpStatus.NOT_FOUND);
    }
  }

  async viewAcceptedOrderUser(_user): Promise<Order[]> {
    console.log('View Accepted Order');
    const _userId = _user.userId;
    try {
      const user: User = await this.usersService.findUser(_userId);

      const orders = await this.orderRepository.find({
        user: user,
        isDestinationReached: false,
        isAccepted: true,
      });

      console.log('USER VIEWS ACCEPTED ORDER', orders);
      if (orders) {
        return orders;
      }
    } catch (error) {
      throw new HttpException(` No order found  `, HttpStatus.NOT_FOUND);
    }
  }

  //TODO need to handle better before accepting order

  async acceptOrder(_orderId, _vehicle, _user) {
    console.log('ACCEPTING ORDER');
    const _userId = _user.userId;
    const _vehicleId = _vehicle.vehicleId;

    const user: User = await this.usersService.findUser(_userId);

    const order: Order = await this.findOrder(_orderId);

    //TODO handle in vehicel service

    const vehicle: Vehicle = await this.vehicleService.findVehicle(_vehicleId);

    order.isAccepted = true;
    order.vehicle = vehicle;
    order.driver = user;

    try {
      await order.save();
      return order;
    } catch (error) {
      throw new HttpException(
        'UNABLE TO ACCEPT ORDER',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async viewAcceptedOrderDriver(_user): Promise<Order[]> {
    console.log('View Accepted Order');
    const _userId = _user.userId;
    try {
      const driver: User = await this.usersService.findUser(_userId);

      const orders = await this.orderRepository.find({
        driver: driver,
        isDestinationReached: false,
        isAccepted: true,
      });

      console.log('DRIVER VIEWS ACCEPTED ORDER', orders);
      if (orders) {
        return orders;
      }
    } catch (error) {
      throw new HttpException(` No order found  `, HttpStatus.NOT_FOUND);
    }
  }

  async findOrder(_orderId): Promise<Order> {
    const order = await this.orderRepository.findOne({
      _id: _orderId,
    });
    if (!order) {
      throw new HttpException(
        'No order found with given id',
        HttpStatus.NOT_FOUND,
      );
    }
    return order;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
