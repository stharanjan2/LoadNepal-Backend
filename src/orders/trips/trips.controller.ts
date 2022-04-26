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

@Controller('api/test/')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post('admin/createTrips')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtAuthGuard)
  async create(@Body() createTripDto, @UserDecorator() _admin) {
    return this.tripsService.assignAndAcceptTrips(createTripDto, _admin);
  }

  @Get()
  findAll() {
    return this.tripsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tripsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(+id, updateTripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tripsService.remove(+id);
  }

  @Post('admin/createTrips')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtAuthGuard)
  async createAndAssignTrips(
    @Body() requestBody: CreateTripDto,
    @UserDecorator() _user,
  ) {
    return this.tripsService.assignAndAcceptTrips(requestBody, _user);
  }

  //TODO Edit trips dto not implemented
  @Patch('admin/editTrips')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtAuthGuard)
  async editTrips(@Body() editTripDto) {
    return this.tripsService.editTrips(editTripDto);
  }

  @Post('viewAssignedTrips')
  @UseGuards(JwtAuthGuard)
  async viewAssignedTrips(@Body() orderId) {
    this.tripsService.viewAssignedTrips(orderId);
  }
}