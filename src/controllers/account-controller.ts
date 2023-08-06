import { CustomerService } from './../services/customer-service';
import { Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { AccountService } from '../services/account-service';
import { Account } from '@prisma/client';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService,
  ) {}

  @Post()
  async createAccount(
    @Body()
    accountData: {
      customer_id: number;
      agency: number;
      balance: number;
      account_status: number;
    },
  ): Promise<Account | null> {
    return this.accountService.createAccount(accountData);
  }

  @Get(':account_number')
  async getAccount(@Param('account_number') account: string) {
    return this.accountService.getAccount({
      account_number: Number(account),
    });
  }

  @Get('/document/:document')
  async getDocument(@Param('document') document: string) {
    const customer = await this.customerService.getCustomer({
      document_number: Number(document),
    });
    if (customer !== null) {
      return this.accountService.getAccount({
        customer_id: customer.id,
      });
    }
  }

  @Put(':account_number')
  async updateAccount(
    @Param('account_number') account_number: string,
    @Body()
    accountData: {
      customer_id: number;
      agency: number;
      balance: number;
      account_status: number;
    },
  ): Promise<Account> {
    return this.accountService.updateAccount({
      where: {
        account_number: Number(account_number),
      },
      data: accountData,
    });
  }
}
