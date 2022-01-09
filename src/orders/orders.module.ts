import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { DatabaseModule } from 'src/config/database.module';
import { orderProviders } from './orders.providers';
import { userProviders } from 'src/users/user.providers';

@Module({
  imports: [DatabaseModule],

  controllers: [OrdersController],
  providers: [...orderProviders, ...userProviders, OrdersService],
})
export class OrdersModule {}
