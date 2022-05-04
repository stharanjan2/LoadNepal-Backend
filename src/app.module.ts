import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
// import { DatabaseModule } from 'src/config/database.module';
import { Connection } from 'typeorm';
import { User } from './users/users.entity';
import { Order } from './orders/entities/order.entity';
import { CommonModule } from './common/common.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { MailModule } from './mail/mail.module';
import { AdminModule } from './users/admin/admin.module';
import { NotificationModule } from './notification/notification.module';
import { TripsModule } from './orders/trips/trips.module';
import { LedgerModule } from './ledger/ledger.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    AdminModule,
    AuthModule,
    OrdersModule,
    CommonModule,
    VehicleModule,
    MailModule,
    NotificationModule,
    TripsModule,
    LedgerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
