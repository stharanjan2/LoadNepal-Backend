import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { createQueryBuilder, Repository } from 'typeorm';
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
      const orderId = ledgerData.order;
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

      // return ledgerRecords;

      const ledgers = await this.ledgerRepository
        .createQueryBuilder('ledger') // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
        .innerJoinAndSelect('ledger.order', 'order')
        .where(`ledger.user = ${_userId}`)
        .select([
          'order._id',
          'order.loadFrom',
          'order.unloadTo',
          'order.createdAt',
          'order.updatedAt',
          'ledger._id',
          'ledger.totalAmount',
          'ledger.totalDue',
          'ledger.totalPaid',
          'ledger.totalAdvance',
        ])
        .getMany();

      return ledgers;
    } catch (error) {
      console.log('error ', error);
      throw new HttpException(` ${error} `, HttpStatus.BAD_REQUEST);
    }
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
