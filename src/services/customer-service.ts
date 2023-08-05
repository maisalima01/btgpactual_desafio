import { PrismaService } from './prisma-service';
import { Injectable } from '@nestjs/common';
import { Customer, Prisma } from '@prisma/client';

@Injectable()
export class CustomerService {
  constructor(private prismaService: PrismaService) {}

  async createCustomer(data: Prisma.CustomerCreateInput): Promise<Customer> {
    const customerAlreadyExists = await this.prismaService.customer.findFirst({
      where: {
        email: data.email,
      },
    });
    if (customerAlreadyExists === null) {
      return this.prismaService.customer.create({ data });
    }
    return null;
  }

  async getCustomer(
    customerWhereUniqueInput: Prisma.CustomerWhereUniqueInput,
  ): Promise<Customer | null> {
    return this.prismaService.customer.findUnique({
      where: customerWhereUniqueInput,
    });
  }

  async updateCustomer(params: {
    where: Prisma.CustomerWhereUniqueInput;
    data: Prisma.CustomerUpdateInput;
  }): Promise<Customer> {
    const { where, data } = params;
    return this.prismaService.customer.update({
      data,
      where,
    });
  }
}
