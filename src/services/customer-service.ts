import MESSAGE from '../constants/messages';
import { Injectable } from '@nestjs/common';
import { CustomerController } from 'src/controllers/customer-controller';
import { Customer } from '@prisma/client';

@Injectable()
export class CustomerService {
   async createCustomer(customer: Customer): Promise<any> {
    try {
        
    }
   }
}