import { CustomerService } from '../../src/services/customer-service';
import { PrismaService } from '../../src/services/prisma-service';
import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { Customer } from '@prisma/client';
import { prismaMock } from '../singleton'

const dataCustomer: Customer = {
  id: faker.datatype.number(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  address: faker.address.streetAddress(),
  district: faker.name.middleName(),
  city: faker.address.city(),
  state: faker.address.state(),
  zip_code: faker.address.zipCode(),
  document_number: faker.datatype.number(),
  issuer: faker.company.name(),
  date_of_birth: faker.date.past(),
  cel_phone: faker.phone.number(),
  profession: faker.name.jobTitle(),
  income: faker.datatype.float(),
  civil_status: faker.name.firstName(),
  createdAt: new Date(),
  updatedAt: new Date(),
};


describe('CustomerService', () => {
  let customerService: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
  });

  describe('createCustomer', () => {
    it('it should return the created customer', async () => {
      prismaMock.customer.findFirst.mockResolvedValue(null);
      prismaMock.customer.create.mockResolvedValue(dataCustomer);

      const customer = await customerService.createCustomer(dataCustomer);

      expect(customer?.id).toBe(dataCustomer.id);
      expect(customer?.name).toBe(dataCustomer.name);
    });

    it('it should return null when customer already exists', async () => {
      prismaMock.customer.findFirst.mockResolvedValue(null);

      const customer = await customerService.createCustomer(dataCustomer);

      expect(customer).toBeUndefined();
    });
  });

  describe('getCustomer', () => {
    it('it should return the customer', async () => {
      prismaMock.customer.findUnique.mockResolvedValue(dataCustomer);

      const customer = await customerService.getCustomer({id: dataCustomer.id});

      expect(customer?.id).toBe(dataCustomer.id);
      expect(customer?.name).toBe(dataCustomer.name);
    });
    it('it should return null when the customer is not found', async () => {
      prismaMock.customer.findFirst.mockResolvedValue(null);

      const customer = await customerService.getCustomer({id: dataCustomer.id});

      expect(customer).toBeUndefined();
    });
  });

  describe('updateCustomer', () => {
    it('it should return the updated customer', async () => {
      prismaMock.customer.update.mockResolvedValue(dataCustomer);

      const customer = await customerService.updateCustomer({
        data: dataCustomer,
        where: {id: dataCustomer.id}
      });

      expect(customer?.id).toBe(dataCustomer.id);
      expect(customer?.name).toBe(dataCustomer.name);
    });
  });
});
