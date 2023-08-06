import { AccountService } from 'src/services/account-service';
import { PrismaService } from 'src/services/prisma-service';
import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { Account } from '@prisma/client';

const dataAccount: Account = {
  account_number: faker.datatype.number(),
  customer_id: faker.datatype.number(),
  agency: faker.datatype.number(),
  balance: faker.datatype.float(),
  account_status: faker.datatype.number(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

interface prismaMock.customer {
  getCustomer: jest.Mock;
  create: jest.Mock;
  findUnique: jest.Mock;
  update: jest.Mock;
}

const prismaMock.customer: prismaMock.customer = {
  getCustomer: jest.fn(),
  create: jest.fn(),
  findUnique: jest.fn(),
  update: jest.fn(),
};

describe('AccountService', () => {
  let accountService: AccountService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: PrismaService,
          useValue: prismaMock.customer,
        },
      ],
    }).compile();

    accountService = module.get<AccountService>(AccountService);
    prismaService = module.get<PrismaService>(PrismaService);
  });
});
