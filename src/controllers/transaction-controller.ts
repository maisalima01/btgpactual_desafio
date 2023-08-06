import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { TransactionService } from '../services/transaction-service';
import { Transaction } from '@prisma/client';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async createTransaction(
    @Body()
    transactionData: {
      account_number: number;
      value: number;
      date: Date;
      type: string;
    },
  ): Promise<Transaction> {
    transactionData.date = new Date();
    return this.transactionService.createTransaction(transactionData);
  }

  @Get('/transactions/:account')
  async findTransactionsByAccount(@Param('account') account: string) {
    return this.transactionService.getTransactionsByAccount(Number(account));
  }
}
