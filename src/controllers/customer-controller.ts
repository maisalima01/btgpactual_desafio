import * as bcrypt from 'bcryptjs';
import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { CustomerService } from '../services/customer-service';
import { Customer } from '@prisma/client';
import * as moment from 'moment';

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
  ): Promise<Customer | null> {
    if (customerData.password.length < 6 || customerData.password.length > 8) {
      throw new BadRequestException(
        'The password must be between 6 and 8 digits.',
      );
    }
    if (
      customerData.password ==
        moment.utc(customerData.date_of_birth).format('YYYYMMDD') ||
      customerData.password ==
        moment.utc(customerData.date_of_birth).format('DDMMYYYY')
    ) {
      throw new BadRequestException(
        'The password cannot be your date of birth.',
      );
    }
    const encryptedPassword = bcrypt.hashSync(customerData.password, 10);
    customerData.password = encryptedPassword;
    return this.customerService.createCustomer(customerData);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Customer | null> {
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
