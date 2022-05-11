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
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import RoleGuard from 'src/users/role.guard';
import Role from 'src/users/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UserDecorator } from 'src/users/user.decorators';
import { UpdateTrackDto } from './dto/update.track.dto';
import { AddtripDto } from './dto/add-trip.dto';
import { UpdateTripStatusDto } from './dto/update.tripStatus.dto';

@Controller('api/test/')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  // ----Admin creates trips Inititally (add trips in bulk)
  @Post('admin/createTrips')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTripDto, @UserDecorator() _admin) {
    return this.tripsService.assignAndAcceptTrips(createTripDto, _admin);
  }

  // Admin updates order location
  @Patch('admin/updateTrack')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtAuthGuard)
  async updateLocation(@Body() updateTrackDto: UpdateTrackDto) {
    return this.tripsService.updateTrackLocation(updateTrackDto);
  }

  // Add new trips individually-----
  @Patch('admin/addTrip')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtAuthGuard)
  async addNewTrip(@Body() addTripDto: AddtripDto, @UserDecorator() _admin) {
    return this.tripsService.addNewTrips(addTripDto, _admin);
  }

  // @Post('admin/createTrips')
  // @UseGuards(RoleGuard(Role.ADMIN))
  // @UseGuards(JwtAuthGuard)
  // async createAndAssignTrips(
  //   @Body() requestBody: CreateTripDto,
  //   @UserDecorator() _user,
  // ) {
  //   return this.tripsService.assignAndAcceptTrips(requestBody, _user);
  // }

  //------Admin can edit trip details

  //TODO Edit trips dto not implemented
  @Patch('admin/editTrips')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtAuthGuard)
  async editTrips(@Body() editTripDto) {
    return this.tripsService.editTrips(editTripDto);
  }

  //-----User/admin can view assigned trips to particular order----

  //TODO make better specification in paramater
  @Post('viewAssignedTrips')
  @UseGuards(JwtAuthGuard)
  async viewAssignedTrips(@Body() body) {
    return this.tripsService.viewAssignedTrips(body);
  }

  @Patch('admin/updateTripStatus')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtAuthGuard)
  async updateTripStatus(
    @Body() updateTripstatusDto: UpdateTripStatusDto,
    @UserDecorator() _admin,
  ) {
    return this.tripsService.updateTripStatus(updateTripstatusDto, _admin);
  }

  // @Post('trips')
  // async getTrip(@Body() tripid) {
  //   return this.tripsService.findTrip(tripid._id);
  // }
}
