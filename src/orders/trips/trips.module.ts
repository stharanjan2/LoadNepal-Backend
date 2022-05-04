import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { OrdersModule } from '../orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { UsersModule } from 'src/users/users.module';
import { NotificationModule } from 'src/notification/notification.module';
import { LedgerModule } from 'src/ledger/ledger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip]),
    UsersModule,
    OrdersModule,
    NotificationModule,
    LedgerModule,
  ],

  controllers: [TripsController],
  providers: [TripsService],
  exports: [TripsService, TypeOrmModule],
})
export class TripsModule {}
