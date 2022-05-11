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
import Distance from './entities/utils/distance';
import { EditOrderDto } from './dto/edit-order-dto';
import { LedgerService } from 'src/ledger/ledger.service';
import { Ledger } from 'src/ledger/entities/ledger.entity';
import { UpdateOrderStatusDto } from './dto/update.orderStatus.dto';
import { NotificationService } from 'src/notification/notification.service';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly notificationService: NotificationService,
    private readonly vehicleService: VehicleService,
    private readonly usersService: UsersService,
    private readonly ledgerService: LedgerService,
  ) {}

  async postOrders(createOrderDto: CreateOrderDto, _user): Promise<Order> {
    try {
      console.log('Posting Orders');
      console.log('ORDER', createOrderDto);
      const user: User = await this.verifyOrder(createOrderDto, _user); //Verify whetehr order meets certain criterai and return back user
      // await this.createOrders(createOrderDto, user); //Finally call create orders to crete orders
      const postedOrder = await this.createOrder(createOrderDto, user);
      return postedOrder;
    } catch (error) {
      console.log('ERROR', error);

      throw new HttpException(` ${error} `, HttpStatus.BAD_REQUEST);
    }
  }

  //With order also create ledger for same order

  async createOrder(createOrderDto: CreateOrderDto, user: User) {
    try {
      console.log('Creating order');
      const order: Order = this.orderRepository.create(createOrderDto);
      const _user = await this.usersService.findUser(user._id);
      // const _distance: number = await this.calculateDistance(createOrderDto);
      // order.distance = _distance;
      order.user = user;
      order.customer_username = user.username;
      order.customer_phoneNumber = user.phoneNumber;
      await order.save();
      await user.save();
      const createdLedger = await this.ledgerService.createLedger(
        order._id,
        user._id,
      );
      console.log('Order Created', createOrderDto);
      console.log('Ledger created', createdLedger);
      return order;
    } catch (error) {
      console.log('ERROR IN ORDER', error);

      throw new HttpException(
        `Error while creating order ${error} `,
        HttpStatus.BAD_REQUEST,
      );
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

  //Verifying if load is posted by existing user or not
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
        where: { user: user },
        order: { _id: 'ASC' },
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
    //---No need for now----
    // order.vehicle = vehicle;
    // order.driver = user;

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

  //--No need for now-----

  // async viewAcceptedOrderDriver(_user): Promise<Order[]> {
  //   console.log('View Accepted Order');
  //   const _userId = _user.userId;
  //   try {
  //     const driver: User = await this.usersService.findUser(_userId);

  //     const orders = await this.orderRepository.find({
  //       driver: driver,
  //       isDestinationReached: false,
  //       isAccepted: true,
  //     });

  //     console.log('DRIVER VIEWS ACCEPTED ORDER', orders);
  //     if (orders) {
  //       return orders;
  //     }
  //   } catch (error) {
  //     throw new HttpException(` No order found  `, HttpStatus.NOT_FOUND);
  //   }
  // }

  async findOrder(_orderId): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { _id: _orderId },
      loadRelationIds: true,
    });
    if (!order) {
      throw new HttpException(
        'No order found with given id',
        HttpStatus.NOT_FOUND,
      );
    }
    return order;
  }

  async findAllOrders(): Promise<Order[]> {
    try {
      return await Order.find({ order: { _id: 'ASC' }, loadRelationIds: true });
    } catch (error) {
      throw new HttpException(
        `Error on getting all orders :${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async calculateDistance(createOrderDto: CreateOrderDto): Promise<number> {
    try {
      const { loadFrom, unloadTo } = createOrderDto;
      if (Distance[loadFrom][unloadTo]) {
        console.log('ORIGIN DESTINATION IS ', Distance[loadFrom][unloadTo]);
        const distance = Distance[loadFrom][unloadTo];
        return distance;
      }
      if (Distance[unloadTo][loadFrom]) {
        console.log('destination origin is', Distance[unloadTo][loadFrom]);
        const distance = Distance[unloadTo][loadFrom];
        return distance;
      } else {
        console.log('NO RESULT');
        const distance = 0;
        return distance;
      }
    } catch (error) {
      const distance = 0;
      return distance;
    }
  }
  //TODO change this to make more abstract and use repository pattern
  async adminViewAllOrders(): Promise<Order[]> {
    try {
      return this.findAllOrders();
    } catch (error) {
      throw new HttpException(
        `Error on fetching all orders ${error}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async editOrder(orderId, editOrderDto: EditOrderDto): Promise<Order> {
    try {
      let toEditOrder = await this.orderRepository.findOne(orderId);
      let updatedOrder = Object.assign(toEditOrder, editOrderDto);
      return await this.orderRepository.save(updatedOrder);
    } catch (error) {
      throw new HttpException(
        `Problem in editing request please try with valid values   ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateNoOfTrips(id: number | Number, noOfTrips: number) {
    try {
      const updatedOrder = await this.orderRepository
        .createQueryBuilder()
        .update(Order)
        .set({ noOfTrips: noOfTrips })
        .where('_id = :_id', { _id: id })
        .execute();

      console.log('Updated order is', updatedOrder);
    } catch (error) {
      throw new HttpException(
        `Problem in updating order  ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePrice(id: number | Number, price: number) {
    try {
      const updatedOrder = await this.orderRepository
        .createQueryBuilder()
        .update(Order)
        .set({ price: price })
        .where('_id = :_id', { _id: id })
        .execute();
    } catch (error) {
      throw new HttpException(
        `Problem in updating order  ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //FIXME As operation order.save() is behaving unlogically (i.e deleting trips of given order) had to go with this query builder implementation
  async updateOrderStatus(updateParamater, body, _admin): Promise<any> {
    try {
      const adminId = _admin.userId;

      const { orderId } = body;
      const _order: Order = await this.findOrder(orderId);
      const userId = _order.user;
      let messageType = '';

      switch (updateParamater) {
        case 'accept':
          _order.isAccepted = true;
          // messageType = 'accepted';
          await this.orderRepository
            .createQueryBuilder()
            .update(Order)
            .set({ isAccepted: true })
            .where('_id = :_id', { _id: _order._id })
            .execute();
        case 'confirm':
          // _order.isConfirmed = true;
          messageType = 'confirmed';
          await this.orderRepository
            .createQueryBuilder()
            .update(Order)
            .set({ isConfirmed: true })
            .where('_id = :_id', { _id: _order._id })
            .execute();
          break;
        case 'ship':
          // _order.isShipped = true;
          messageType = 'shipped';
          await this.orderRepository
            .createQueryBuilder()
            .update(Order)
            .set({ isShipped: true })
            .where('_id = :_id', { _id: _order._id })
            .execute();
          break;

        case 'destination':
          // _order.isDestinationReached = true;
          messageType = 'at destination';
          await this.orderRepository
            .createQueryBuilder()
            .update(Order)
            .set({ isDestinationReached: true })
            .where('_id = :_id', { _id: _order._id })
            .execute();
          break;
        default:
      }

      const notificationParamater = {
        title: 'Admin',
        message: `Your order id ${_order._id} is ${messageType}`,
        type: `order_${updateParamater}`,
        receiverId: userId,
        senderId: adminId,
      };
      this.notificationService.sendNotification(notificationParamater, _admin);
      return 'Order Status updated';
    } catch (error) {
      throw new HttpException(
        `Error on updating trip status ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
