import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import Role from '../role.enum';
import RoleGuard from '../role.guard';
import { AdminService } from './admin.service';

@Controller('api')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @Post('get/allusers')
  // @UseGuards(RoleGuard(Role.))
  // @UseGuards(JwtAuthGuard)
  // async createOrder(
  //   @Body() createOrderDto: CreateOrderDto,
  //   @Body() check,
  //   @UserDecorator() _user,
  // ) {
  //   console.log('CHECKING BODY', check);

  //   return this.ordersService.postOrders(createOrderDto, _user);
  // }
  @Get('get/allusers')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('test/admin/getAllOrders')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtAuthGuard)
  async allOrders() {
    return this.adminService.getAllOrders();
  }

  @Patch('test/admin/verification/:id')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtAuthGuard)
  async verifyUser(@Param('id') id: number) {
    return this.adminService.verifyUser(id);
  }

  @Patch('/test/admin/editOrder/:orderId')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtAuthGuard)
  async editOrder(@Param('orderId') orderID, @Body() editParamater) {
    this.adminService.editUserOrder(orderID, editParamater);
  }
}
