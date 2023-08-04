import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Get,
  Param,
} from '@nestjs/common';
import { TransactionService } from '../services/transaction-service';
import { Transaction } from '@prisma/client';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}
  @Post()
  async createTransaction(@Body() transaction: Transaction) {
    const data = await this.transactionService.createTransaction(transaction);
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
