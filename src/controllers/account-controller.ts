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
import { AccountService } from '../services/account-service';
import { Account } from '@prisma/client';

@Controller('account')
export class AccountController {
  @Post()
  async createAccount(@Body() account: Account) {
    const data = await this.accountService.createAccount(account);
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

  @Get('id')
  async findOne(@Param('id') id: number) {
    const data = await this.accountService.findOne(id);
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

  @Get('/account/:account')
  async findByAccount(@Param('account') account: number) {
    const data = await this.accountService.findByAccount(account);
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
    const data = await this.accountService.update(id);
    if (data.name === 'error') {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: data.message,
      });
    }
    return {
      statudCode: HttpStatus.OK,
      message: data.message,
    };
  }
}
