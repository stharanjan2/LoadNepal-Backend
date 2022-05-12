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
import { LedgerService } from './ledger.service';
import { CreateLedgerDto } from './dto/create-ledger.dto';
import { UpdateLedgerDto } from './dto/update-ledger.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import RoleGuard from 'src/users/role.guard';
import Role from 'src/users/role.enum';
import { UserDecorator } from 'src/users/user.decorators';

@Controller('api/test/ledger')
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Post()
  create(@Body() createLedgerDto: CreateLedgerDto) {
    return this.ledgerService.create(createLedgerDto);
  }

  // User views all transactions
  @Get('userLedger')
  @UseGuards(RoleGuard(Role.USER))
  @UseGuards(JwtAuthGuard)
  async getLedger(@UserDecorator() _user) {
    return this.ledgerService.findLedger(_user);
  }

  @Get('admin/getAllLedgers')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtAuthGuard)
  async getAllLedgers() {
    return this.ledgerService.findAllLedgers();
  }
}
