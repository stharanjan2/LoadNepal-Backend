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

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, AuthModule, OrdersModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
