import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { CustomerService } from '../services/customer-service';
import { Customer } from '@prisma/client';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}
  @Post()
  async createCustomer(@Body() customer: Customer) {
    const data = await this.customerService.createCustomer(customer);
    if (data.name === 'error') {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: data.message,
      });
    }
    return {
      statusCode: HttpStatus.OK,
      message: data.message,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.customerService.findOne(id);
    if (data.name === 'error') {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: data.message,
      });
    }
    return {
      statusCode: HttpStatus.OK,
      message: data.message,
    };
  }

  @Get('/document/:document')
  async findByDocument(@Param('document') document: number) {
    const data = await this.customerService.findByDocument(document);
    if (data.name === 'error') {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: data.message,
      });
    }
    return {
      statusCode: HttpStatus.OK,
      message: data.message,
    };
  }

  @Put(':id')
  async update(@Param('id') id: number) {
    const data = await this.customerService.update(id);
    if (data.name === 'error') {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: data.message,
      });
    }
    return {
      statusCode: HttpStatus.OK,
      message: data.message,
    };
  }
}
