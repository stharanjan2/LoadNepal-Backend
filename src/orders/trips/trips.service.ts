import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LedgerService } from 'src/ledger/ledger.service';
import { NotificationService } from 'src/notification/notification.service';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrdersService } from '../orders.service';
import { AddtripDto } from './dto/add-trip.dto';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { UpdateTrackDto } from './dto/update.track.dto';
import { UpdateTripStatusDto } from './dto/update.tripStatus.dto';
import { Trip } from './entities/trip.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private readonly orderService: OrdersService,
    private readonly userService: UsersService,
    private readonly notificationService: NotificationService,
    private readonly ledgerService: LedgerService,

    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
  ) {}
  create(createTripDto: CreateTripDto) {
    return 'This action adds a new trip';
  }

  findAll() {
    return `This action returns all trips`;
  }

  update(id: number, updateTripDto: UpdateTripDto) {
    return `This action updates a #${id} trip`;
  }

  remove(id: number) {
    return `This action removes a #${id} trip`;
  }

  async findTrip(_tripId): Promise<Trip> {
    try {
      console.log('TRIp IS', _tripId);

      const trip = await this.tripRepository.findOne({
        where: { _id: _tripId },
        loadRelationIds: true,
      });
      if (!trip) {
        throw new HttpException(
          `No trip found with given id ${_tripId}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return trip;
    } catch (error) {
      throw new HttpException(
        `Error on finding trip ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //FIXME whenrever try to save both  order and trip null value in set in trips.order_id foreign key reference, need to fix this
  async addNewTrips(addTripDto: AddtripDto, _admin) {
    try {
      console.log('ADD trip dto', addTripDto);
      addTripDto.order_id = addTripDto._id;
      const { total, advance, amount_payed } = addTripDto;
      const _order: Order = await this.orderService.findOrder(
        addTripDto.order_id,
      );

      // Due amount calculation
      const due = total - amount_payed;

      addTripDto['due'] = due;

      const userId = _order.user;
      const adminId = _admin.userId;

      //Check if noOfTrips exceeds noOfTruck
      if (_order.noOfTrips >= _order.noOfTruck) {
        //check if we can add new trips or not(check if no of trips<no of trucks)
        throw new HttpException(
          `Can't add new trips. No of truck exceeds no of trips   `,
          HttpStatus.BAD_REQUEST,
        );
      }
      const user: User = _order.user;
      const trip = this.tripRepository.create(addTripDto);
      trip.user = user;
      trip.order = _order;
      await trip.save();
      await this.orderService.updateNoOfTrips(_order._id, ++_order.noOfTrips);
      await this.ledgerService.updateLedger({
        order: _order._id,
        totalAmount: total,
        totalAdvance: advance,
        totalDue: due,
        totalPaid: amount_payed,
      });

      const notificationParamater = {
        title: 'Admin',
        message: `Your Trip No  ${trip._id} assigned to  Order No ${_order._id} has been accepted `,
        type: 'trip_accepted',
        receiverId: userId,
        senderId: adminId,
      };

      await this.notificationService.sendNotification(notificationParamater, {
        userId: adminId,
      });

      return trip;
    } catch (error) {
      console.log('ERROR', error);
      throw new HttpException(
        `Error while adding ${error} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /*

  // Individually add new trips and update order status and send notifications and update ledger
  async addNewTrips(addTripDto: AddtripDto): Promise<any> {
    try {
      const orderId = addTripDto.order_id;
      const _order = await this.orderService.findOrder(orderId);

      console.log('FOUND ORDER', _order);

      if (_order.noOfTrips >= _order.noOfTruck) {
        //check if we can add new trips or not(check if no of trips<no of trucks)
        throw new HttpException(
          `Can't add new trips. No of truck exceeds no of trips   `,
          HttpStatus.BAD_REQUEST,
        );
      }
      const userId = _order.user;
      //TODO Doesn't work referencing without deleting orer_id dontknow why
      // delete addTripDto.order_id;
      // addTripDto.order = _order_id;
      addTripDto.user = userId;
      // addTripDto.order = _order._id;

      // const returnCreatedTrips =
      // const createdTrip = await this.createTrip(addTripDto, _order);
      const createdTrip = this.tripRepository.create(addTripDto);

      // await createdTrip.save();
      // await createdTrip.save();

      // createdTrip.user = userId;
      await createdTrip.save();

      await _order.addTrips(createdTrip);

      this.ledgerService.updateLedger({
        order: _order._id,
        totalAmount: addTripDto.total,
        totalAdvance: addTripDto.advance,
        totalDue: addTripDto.due,
        totalPaid: addTripDto.amount_paid,
      });

      // createdTrip.save();
      // _order.save();

      //TODO Checking promise use for optimization
      // await Promise.all([createdTrip.save(), _order.save()]);

      // await createdTrip.save()
      // await _order.save()
      console.log('New Trip Added ', createdTrip);
      return createdTrip;
    } catch (error) {
      console.log('Error on creating  trip', error);
      throw new HttpException(
        `Error while creating trip ${error} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  */

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
      let totalPrice = 0,
        totalAdvance = 0,
        totalDue = 0,
        totalPaid = 0,
        totalAmount = 0; //Equal to total Price just diff variable name for ledger data
      for (let i = 0; i < noOfTrips; i++) {
        trips[i].due = trips[i].total - trips[i].amount_payed;
        totalPrice += trips[i].total;
        totalAdvance += trips[i].advance;
        totalPaid += trips[i].amount_payed;
        totalDue += trips[i].due;
        totalAmount += trips[i].total;

        trips[i].order = _order._id;
        trips[i].user = userId;
        const returnedTrip = await this.createTrip(trips[i], _order);

        _order.addTrips(returnedTrip);

        const notificationParamater = {
          title: 'Admin',
          message: `Your Trip No  ${returnedTrip._id}  assigned to Order No ${_order._id} has been accepted `,
          type: 'trip_accepted',
          receiverId: userId,
          senderId: adminId,
        };

        await this.notificationService.sendNotification(notificationParamater, {
          userId: adminId,
        });
      }

      console.log('All trips created');

      //FIXME need to add different route for accept order

      _order.isAccepted = true;
      _order.price = totalPrice;
      _order.noOfTrips = noOfTrips;
      await _order.save();
      console.log('ADMIN CREATEd TRIPS');

      //TODO tomorrow
      ///Neew to now call ledger to update ledger
      this.ledgerService.updateLedger({
        order: _order._id,
        totalAmount,
        totalAdvance,
        totalDue,
        totalPaid,
      });

      return { message: 'Successfully added trips' };
    } catch (error) {
      console.log('ERROR ON CREATING TRIPS', error);
      throw new HttpException(
        `Error while assigning trips ${error} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createTrip(tripData: Trip, _order: Order): Promise<Trip> {
    try {
      console.log('Creating TRIP', tripData);
      const _trip = this.tripRepository.create(tripData);
      const createdTrip = await this.tripRepository.save(_trip);
      console.log('TRIP CREATED', _trip);

      return createdTrip;
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
      if (!_order) {
        throw new HttpException(
          `Error no order found of given order id `,
          HttpStatus.BAD_REQUEST,
        );
      }
      let totalPrice = 0,
        totalAdvance = 0,
        totalDue = 0,
        totalPaid = 0,
        totalAmount = 0;
      for (let i = 0; i < noOfTrips; i++) {
        // totalPrice += trips[i].total;
        const tripId = trips[i]._id;
        trips[i].due = trips[i].total - trips[i].amount_payed;
        const editedTrip = await this.editTrip(tripId, trips[i]);
        totalPrice += editedTrip.total;
        totalAdvance += editedTrip.advance;
        totalPaid += editedTrip.amount_payed;
        totalDue += totalPrice - totalPaid;
      }

      await this.orderService.updatePrice(_order._id, totalPrice);

      await this.ledgerService.updateLedgerAEDIT({
        order: _order._id,
        totalAmount: totalPrice,
        totalAdvance: totalAdvance,
        totalDue: totalDue,
        totalPaid: totalPaid,
      });

      // _order.price = totalPrice;
      // await _order.save();
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

  //TODO bad formating add dto . need to change later
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

  async viewAssignedTrips(body): Promise<Trip[]> {
    try {
      console.log('oRDER ID', body.orderId);
      const orderId = body.orderId;

      const tripsRecord = await this.tripRepository.find({
        order: orderId,
        // where: { orderid: body.orderId },
      });
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

  async updateTrackLocation(upateTrack: UpdateTrackDto, _admin): Promise<any> {
    try {
      const trackId = upateTrack.trip_id;
      const location = upateTrack.track;
      const adminId = _admin.userId;

      //Updating track location
      let _trip = await this.tripRepository.findOne(trackId);
      _trip.track = location;
      await _trip.save();

      //Sending track noticiation to user
      const notificationParamater = {
        title: 'Admin',
        message: `Your trip id   ${_trip._id} of order id ${_trip.order} reached ${location} `,
        type: 'order_shipped',
        receiverId: _trip.user,
        senderId: adminId,
      };

      await this.notificationService.sendNotification(notificationParamater, {
        userId: adminId,
      });
      console.log('Updated Track ', _trip.track);
      return `Successfully updated track to ${location}`;
    } catch (error) {
      console.log('Error while updating track', error);
      throw new HttpException(
        `Error on updating track ${error} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Update status of trip by query  possible query update status are  isAccepted,isConfirmed,isShipped,isDestinationReached
  async updateTripStatus(
    updateTripstatusDto: UpdateTripStatusDto,
    _admin,
  ): Promise<any> {
    try {
      const adminId = _admin.userId;
      const { trip_id, updateParamater } = updateTripstatusDto;
      const _trip = await this.findTrip(trip_id);
      const userId = _trip.user;
      let messageType = '';

      switch (updateParamater) {
        case 'accept':
          _trip.isAccepted = true;
          messageType = 'accepted';
          break;
        case 'confirm':
          _trip.isConfirmed = true;
          messageType: 'confirmed';

        case 'ship':
          _trip.isShipped = true;
          messageType = 'shipped';
          break;
        case 'destination':
          _trip.isDestinationReached = true;
          messageType = 'at destination';
          break;
        // case 'complete':
        //   _order.isCompleted = true;
        //   messageType = 'completed';
        //   break;
        // default:
      }
      await _trip.save();

      const notificationParamater = {
        title: 'Admin',
        message: `Your order is ${messageType}`,
        type: `order_${updateParamater}`,
        receiverId: userId,
        senderId: adminId,
      };
      this.notificationService.sendNotification(notificationParamater, _admin);
      return;
    } catch (error) {
      throw new HttpException(
        `Error on updating trip status ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
