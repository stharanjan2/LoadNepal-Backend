import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateLedgerDto } from './dto/create-ledger.dto';
import { UpdateLedgerDto } from './dto/update-ledger.dto';
import { Ledger } from './entities/ledger.entity';

@Injectable()
export class LedgerService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Ledger)
    private ledgerRepository: Repository<Ledger>,
  ) {}
  async create(createLedgerDto: CreateLedgerDto) {}
  async createLedger(orderId, userId): Promise<Ledger> {
    const ledger: Ledger = this.ledgerRepository.create();
    ledger.user = userId;
    ledger.order = orderId;
    await ledger.save();
    return ledger;
  }
  async updateLedger(ledgerData) {
    try {
      console.log('Data from backend-----', ledgerData);
      const orderId = ledgerData.orderId;
      const toUpdateLedger = await this.ledgerRepository.findOne({
        where: { order: orderId },
      });
      delete ledgerData.orderId;
      console.log('Found ledger', toUpdateLedger);
      let updateLedger = Object.assign(toUpdateLedger, ledgerData);
      await toUpdateLedger.save();
      console.log('Available ledger is ', toUpdateLedger);
    } catch (error) {
      console.log('Error on finding ledger', error);
    }
  }

  async findLedger(_user) {
    try {
      const _userId = _user.userId;
      await this.userService.findUser(_userId);
      const ledgerRecords = await this.ledgerRepository.find({
        where: { user: _userId },
      });
      console.log('ledger record is ', ledgerRecords);

      return ledgerRecords;
    } catch (error) {}
  }

  findAll() {
    return `This action returns all ledger`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ledger`;
  }

  update(id: number, updateLedgerDto: UpdateLedgerDto) {
    return `This action updates a #${id} ledger`;
  }

  remove(id: number) {
    return `This action removes a #${id} ledger`;
  }
}
