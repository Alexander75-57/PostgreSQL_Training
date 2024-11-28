import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTransactionDto } from './dto/transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, id: number) {
    const newTransaction = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      category: { id: +createTransactionDto.category },
      user: { id: id },
    };
    if (!newTransaction) {
      throw new BadRequestException('Transaction not created');
    } else {
      await this.transactionRepository.save(newTransaction);
      return 'Transaction was added';
    }
  }
}

/*
{
  "title": "Car",
  "amount": 15000,
  "type": "expenses",
  "category": 2;
}
*/
