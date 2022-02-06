import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { VehicleController } from './vehicle.controller';
import { Vehicle } from './vehicle.entity';
import { VehicleService } from './vehicle.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle]), UsersModule],
  controllers: [VehicleController],
  providers: [VehicleService],
  exports: [VehicleService, TypeOrmModule],
})
export class VehicleModule {}
