import { Customer } from '../entities/customer';

export interface Account {
  id: number;
  customer: Customer;
  holder: string;
  agency: number;
  account_number: number;
  balance: number;
  account_status: number;
  createdAt: Date;
  updatedAt?: Date;
}
