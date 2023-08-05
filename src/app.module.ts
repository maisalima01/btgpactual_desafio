import { PrismaService } from './services/prisma-service';
import { CustomerController } from 'src/controllers/customer-controller';
import { Module } from '@nestjs/common';
import { CustomerService } from './services/customer-service';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [PrismaService, CustomerService],
})
export class AppModule {}
