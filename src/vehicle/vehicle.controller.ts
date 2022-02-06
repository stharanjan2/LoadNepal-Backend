import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import Role from 'src/users/role.enum';
import RoleGuard from 'src/users/role.guard';
import { UserDecorator } from 'src/users/user.decorators';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleService } from './vehicle.service';

@Controller('api/test/driver')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post('vehicleRegistration')
  @UseGuards(RoleGuard(Role.DRIVER))
  @UseGuards(JwtAuthGuard)
  async createVehicle(
    @Body() createVehicleDto: CreateVehicleDto,
    @UserDecorator() _user,
  ) {
    return this.vehicleService.createVehicle(createVehicleDto, _user);
  }

  //TODO:Fix post to get request
  @Post('vehicles')
  @UseGuards(RoleGuard(Role.DRIVER))
  @UseGuards(JwtAuthGuard)
  async driverVehiclesSearch(@UserDecorator() _user) {
    console.log('Vehicle searching');
    return this.vehicleService.vehicleSearch(_user);
  }
}
