import { TransactionService } from 'src/services/transaction-service';
import { PrismaService } from 'src/services/prisma-service';
import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { Transaction } from '@prisma/client';

const dataTransaction: Transaction = {
  id: faker.datatype.number(),
  account_number: faker.datatype.number(),
  value: faker.datatype.float(),
  date: faker.date.past(),
  type: faker.finance.transactionType(),
};

interface prismaMock.customer {
  create: jest.Mock;
  findMany: jest.Mock;
}

const prismaMock.customer: prismaMock.customer = {
  create: jest.fn(),
  findMany: jest.fn(),
};
