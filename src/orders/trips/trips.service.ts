import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationService } from 'src/notification/notification.service';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrdersService } from '../orders.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './entities/trip.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly orderService: OrdersService,
    private readonly userService: UsersService,
    private readonly notificationService: NotificationService,
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
  ) {}
  create(createTripDto: CreateTripDto) {
    return 'This action adds a new trip';
  }

  findAll() {
    return `This action returns all trips`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trip`;
  }

  update(id: number, updateTripDto: UpdateTripDto) {
    return `This action updates a #${id} trip`;
  }

  remove(id: number) {
    return `This action removes a #${id} trip`;
  }

  async assignAndAcceptTrips(
    createTripDto: CreateTripDto,
    _admin,
  ): Promise<any> {
    try {
      console.log('TRIP DATA BODY', createTripDto);
      const adminId = _admin.userId;
      const { trips } = createTripDto;
      const orderId = createTripDto.order_id;
      const _order = await this.orderService.findOrder(orderId);
      const userId = _order.user;
      // const _user=await this.userService.findUser(userId)

      console.log('ORDER USER', userId);

      const { noOfTrips } = createTripDto;
      let totalPrice = 0;
      for (let i = 0; i < noOfTrips; i++) {
        totalPrice += trips[i].total;
        trips[i].order = _order._id;
        trips[i].user = userId;
        await this.createTrip(trips[i], _order);
      }

      console.log('All trips created');
      _order.isAccepted = true;
      _order.price = totalPrice;
      _order.noOfTrips = noOfTrips;
      await _order.save();
      console.log('ADMIN CREATEd TRIPS');

      const notificationParamater = {
        title: 'Admin',
        message: 'Your order has been accepted',
        type: 'order_accepted',
        receiverId: userId,
        senderId: adminId,
      };

      await this.notificationService.sendNotification(
        notificationParamater,
        adminId,
      );
      return { message: 'Successfully added trips' };
    } catch (error) {
      console.log('ERROR ON CREATING TRIPS', error);
      throw new HttpException(
        `Error while assigning trips ${error} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createTrip(tripData, _order: Order) {
    try {
      console.log('Creating TRIP', tripData);
      const _trip = this.tripRepository.create(tripData);
      await this.tripRepository.save(_trip);
      console.log('TRIP CREATED', _trip);
    } catch (error) {
      console.log('Error while creating trip', error);
      throw new HttpException(
        `Error while assigning trips ${error} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async editTrips(editTripDto): Promise<any> {
    try {
      console.log('EDIT TRIPS DATA', editTripDto);
      const { trips, noOfTrips } = editTripDto;
      const orderId = editTripDto.order_id;
      const _order = await this.orderService.findOrder(orderId);
      let totalPrice = 0;
      for (let i = 0; i < noOfTrips; i++) {
        // totalPrice += trips[i].total;
        const tripId = trips[i]._id;
        const editedTrip = await this.editTrip(tripId, trips[i]);
        totalPrice += editedTrip.total;
      }

      _order.price = totalPrice;
      await _order.save();
      console.log('TRIPS EDITED SUCCESSFUL');

      return { message: 'Trips edited successfully' };
    } catch (error) {
      console.log('ERROR ON EDITING TRIPS');
      throw new HttpException(
        `Error on editing trips ${error} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //TODO bad firmating need to change later
  async editTrip(tripId, tripUpdateParamater): Promise<Trip> {
    try {
      let toUpdateTrip = await this.tripRepository.findOne(tripId);

      let updatedTrip = Object.assign(toUpdateTrip, tripUpdateParamater);
      await this.tripRepository.save(updatedTrip);
      console.log('UPDATED TRIP', updatedTrip);
      return updatedTrip;
    } catch (error) {
      console.log('ERROR ON EDITING TRIp');
      throw new HttpException(` ${error} `, HttpStatus.BAD_REQUEST);
    }
  }

  async viewAssignedTrips(orderId): Promise<Trip[]> {
    try {
      console.log('oRDER ID', orderId);

      const tripsRecord = await this.tripRepository.find({});
      console.log('Assigned trips are', tripsRecord);

      return tripsRecord;
    } catch (error) {
      console.log('ERROR ON FETCHING ASSIGNED TRIPS', error);

      throw new HttpException(
        `Error on fetching assigned trips ${error} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
