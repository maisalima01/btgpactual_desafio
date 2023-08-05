import { PrismaService } from './services/prisma-service';
import { CustomerController } from 'src/controllers/customer-controller';
import { Module } from '@nestjs/common';
import { CustomerService } from './services/customer-service';
import { AccountController } from './controllers/account-controller';
import { AccountService } from './services/account-service';
import { TransactionController } from './controllers/transaction-controller';
import { TransactionService } from './services/transaction-service';

@Module({
  imports: [],
  controllers: [CustomerController, AccountController, TransactionController],
  providers: [
    PrismaService,
    CustomerService,
    AccountService,
    TransactionService,
  ],
})
export class AppModule {}
