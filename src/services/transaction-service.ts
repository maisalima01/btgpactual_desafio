import { PrismaService } from './prisma-service';
import { Injectable } from '@nestjs/common';
import { Transaction, Prisma } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private prismaService: PrismaService) {}

  async createTransaction(
    data: Prisma.TransactionCreateInput,
  ): Promise<Transaction> {
    return this.prismaService.transaction.create({ data });
  }

  async getTransaction(
    transactionWhereUniqueInput: Prisma.TransactionWhereUniqueInput,
  ): Promise<Transaction | null> {
    return this.prismaService.transaction.findUnique({
      where: transactionWhereUniqueInput,
    });
  }
}
