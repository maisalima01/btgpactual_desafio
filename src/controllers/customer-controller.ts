import { Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { CustomerService } from '../services/customer-service';
import { Customer } from '@prisma/client';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(
    @Body()
    customerData: {
      name: string;
      email: string;
      password: string;
      address: string;
      district: string;
      city: string;
      state: string;
      zip_code: string;
      document_number: number;
      issuer: string;
      date_of_birth: Date;
      cel_phone: string;
      profession: string;
      income: number;
      civil_status: string;
    },
  ): Promise<Customer> {
    return this.customerService.createCustomer(customerData);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Customer> {
    return this.customerService.getCustomer({ id: Number(id) });
  }

  @Get('/document/:document')
  async findByDocument(@Param('document') document: string) {
    return this.customerService.getCustomer({
      document_number: Number(document),
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    customerData: {
      name: string;
      email: string;
      password: string;
      address: string;
      district: string;
      city: string;
      state: string;
      zip_code: string;
      document_number: number;
      issuer: string;
      date_of_birth: Date;
      cel_phone: string;
      profession: string;
      income: number;
      civil_status: string;
    },
  ): Promise<Customer> {
    return this.customerService.updateCustomer({
      where: {
        id: Number(id),
      },
      data: customerData,
    });
  }
}
