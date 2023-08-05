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
    return this.transactionService.createTransaction(transactionData);
  }

  @Get('/transactions/:account')
  async findTransactionsByAccount(@Param('account') account: number) {
    const data = await this.transactionService.findTransactionsByAccount(
      account,
    );
    if (data.name === 'error') {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: data.message,
      });
    }
    return {
      statusCode: HttpStatus.OK,
      message: data.message,
    };
  }
}
