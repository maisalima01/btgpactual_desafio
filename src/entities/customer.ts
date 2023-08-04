export interface Customer {
  id: number;
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
  createdAT: Date;
  updatedAt?: Date;
}
