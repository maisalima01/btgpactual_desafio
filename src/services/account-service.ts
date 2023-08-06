import { CustomerService } from './customer-service';
import { PrismaService } from './prisma-service';
import { Injectable } from '@nestjs/common';
import { Account, Prisma } from '@prisma/client';

@Injectable()
export class AccountService {
  constructor(
    private prismaService: PrismaService,
    private cutomerService: CustomerService,
  ) {}

  async createAccount(
    data: Prisma.AccountUncheckedCreateInput,
  ): Promise<Account | null> {
    const customer = await this.cutomerService.getCustomer({
      id: data.customer_id,
    });
    console.log(customer)
    if (customer !== null) {
      return this.prismaService.account.create({ data });
    }
    return null;
  }

  async getAccount(
    accountWhereUniqueInput: Prisma.AccountWhereUniqueInput,
  ): Promise<Account | null> {
    return this.prismaService.account.findUnique({
      where: accountWhereUniqueInput,
    });
  }

  async updateAccount(params: {
    where: Prisma.AccountWhereUniqueInput;
    data: Prisma.AccountUpdateInput;
  }): Promise<Account> {
    const { where, data } = params;
    return this.prismaService.account.update({
      data,
      where,
    });
  }
}
