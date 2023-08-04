import { Account } from '../entities/account';

export interface Transaction {
  id: number;
  account: Account;
  value: number;
  date: Date;
  type: string;
}
