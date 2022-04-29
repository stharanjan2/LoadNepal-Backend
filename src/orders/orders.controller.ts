import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/accept-order-dto';
import RoleGuard from 'src/users/role.guard';
import Role from 'src/users/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UserDecorator } from 'src/users/user.decorators';
import { ApiTags, ApiResponse, ApiProperty } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('api/test')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  //FIXME ADDITIONAL DESRIPRION NOT WORKING DONT KNOW WHY NEED TO BE FIXED
  @Post('user/postOrder')
  @UseGuards(RoleGuard(Role.USER))
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Body() check,
    @UserDecorator() _user,
  ) {
    console.log('CHECKING BODY', check);
    console.log('Check Order DTO', createOrderDto);

    return this.ordersService.postOrders(createOrderDto, _user);
  }

  @Get('driver/filter/orders')
  @UseGuards(RoleGuard(Role.DRIVER))
  @UseGuards(JwtAuthGuard)
  async getAllOrders(@Query() filter: any) {
    return this.ordersService.getAllOrders(filter);
  }

  @Get('/user/viewCurrentOrder/:id')
  @UseGuards(RoleGuard(Role.USER))
  @UseGuards(JwtAuthGuard)
  async userViewAllOrders(@UserDecorator() _user) {
    return this.ordersService.userViewAllOrders(_user);
  }

  //TODO --duplicate with above route need to change later
  @Get('user/allOrders/:id')
  @UseGuards(RoleGuard(Role.USER))
  @UseGuards(JwtAuthGuard)
  async viewAllOrders(@UserDecorator() _user) {
    return this.ordersService.userViewAllOrders(_user);
  }
  @Get('user/viewAcceptedOrderUser/:id')
  @UseGuards(RoleGuard(Role.USER))
  @UseGuards(JwtAuthGuard)
  async viewAcceptedOrderUser(@UserDecorator() _user) {
    return this.ordersService.viewAcceptedOrderUser(_user);
  }

  //TODO Need to stup lockiing feature
  @Patch('driver/lockRequest/:orderId')
  @UseGuards(RoleGuard(Role.DRIVER))
  @UseGuards(JwtAuthGuard)
  async setLock(@Param('orderId') _orderId, @UserDecorator() _user) {
    return `Order Locked ${_orderId}`;
  }

  @Patch('driver/acceptRequest/:orderId')
  @UseGuards(RoleGuard(Role.DRIVER))
  @UseGuards(JwtAuthGuard)
  async acceptOrder(
    @Param('orderId') _orderId,
    @Body() _vehicle,
    @UserDecorator() _user,
  ) {
    this.ordersService.acceptOrder(_orderId, _vehicle, _user);
  }

  // @ApiResponse({ status: 403 })
  // @Get('user/viewAcceptedOrderDriver/:id')
  // @UseGuards(RoleGuard(Role.DRIVER))
  // @UseGuards(JwtAuthGuard)
  // async viewAcceptedOrderDriver(@UserDecorator() _user) {
  //   return this.ordersService.viewAcceptedOrderDriver(_user);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
