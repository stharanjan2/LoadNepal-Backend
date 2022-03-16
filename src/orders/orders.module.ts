import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
// import { DatabaseModule } from 'src/config/database.module';
import { orderProviders } from './orders.providers';
import { userProviders } from 'src/users/user.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersModule } from 'src/users/users.module';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), UsersModule, VehicleModule, TripsModule],

  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
