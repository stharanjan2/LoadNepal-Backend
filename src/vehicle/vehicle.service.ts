import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
  ) {}

  async createVehicle(
    createVehicleDto: CreateVehicleDto,
    _user,
  ): Promise<Vehicle> {
    const _driverId = _user.userId;
    // const _driver = await this.userRepository.findOne({ id: _driverId });
    const _driver = await this.usersService.findUser(_driverId);
    if (!_driver) {
      throw new HttpException(
        'No Driver found with given id',
        HttpStatus.NOT_FOUND,
      );
    }

    //No need to handle no driver exception

    const vehicle = this.vehicleRepository.create(createVehicleDto);
    vehicle.driver = _driver;
    try {
      await vehicle.save();
      console.log('Vehilce created dto ', createVehicleDto);
      return vehicle;
    } catch (err) {
      throw new HttpException(` ${err} `, HttpStatus.BAD_REQUEST);
    }
  }

  async vehicleSearch(_user): Promise<Vehicle[]> {
    const _driverId = _user.userId;
    const _driver = await this.usersService.findUser(_driverId);
    // const _driver = await this.userRepository.findOne({ id: _driverId });
    const vehicle = await this.vehicleRepository.find({ driver: _driver });

    if (!vehicle) {
      throw new HttpException(
        'No vehicle registered under given driver',
        HttpStatus.NOT_FOUND,
      );
    }
    return vehicle;
  }
  async findVehicle(_vehicleId): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({ id: _vehicleId });
    if (!vehicle) {
      throw new HttpException(
        'No vehicle registered under given idr',
        HttpStatus.NOT_FOUND,
      );
    }
    return vehicle;
  }
}
