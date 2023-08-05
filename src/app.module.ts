import { PrismaService } from './services/prisma-service';
import { CustomerController } from 'src/controllers/customer-controller';
import { Module } from '@nestjs/common';
import { CustomerService } from './services/customer-service';
import { AccountController } from './controllers/account-controller';
import { AccountService } from './services/account-service';

@Module({
  imports: [],
  controllers: [CustomerController, AccountController],
  providers: [PrismaService, CustomerService, AccountService],
})
export class AppModule {}
