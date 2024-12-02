import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTransactionDto } from './dto/transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { UpdateTransactionDto } from './dto/update.transaction.dto';

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

  async findAll(id: number) {
    const transactions = await this.transactionRepository.find({
      where: { user: { id: id } },
      order: {
        createdAt: 'DESC', // сортируем отновых к старым
      },
    });
    return transactions;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where: { id: id },
    });
    if (!transaction) {
      throw new BadRequestException('Transaction not found');
    } else {
      await this.transactionRepository.update(id, updateTransactionDto);
      return 'Transaction was updated';
    }
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id: id },
    });
    if (!transaction) {
      throw new BadRequestException('Transaction not found');
    } else {
      await this.transactionRepository.delete(id);
      return 'Transaction was deleted';
    }
  }

  async findAllWithPagination(id: number, page: number, limit: number) {
    const transactions = await this.transactionRepository.find({
      where: { user: { id: id } },
      //   relations: {
      //     user: true,
      //     category: true,
      //   },
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });
    return transactions;
  }

  async findOne() {}
}

/*
{
  "title": "Car",
  "amount": 15000,
  "type": "expenses",
  "category": 2
}
*/
