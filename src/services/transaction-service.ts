import { PrismaService } from './prisma-service';
import { Injectable } from '@nestjs/common';
import { Transaction, Prisma } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private prismaService: PrismaService) {}

  async createTransaction(
    data: Prisma.TransactionUncheckedCreateInput,
  ): Promise<Transaction> {
    return this.prismaService.transaction.create({ data });
  }

  async getTransactionsByAccount(
    accountNumber: number,
  ): Promise<Transaction[] | null> {
    return this.prismaService.transaction.findMany({
      where: {
        account_number: accountNumber,
      },
    });
  }
}
