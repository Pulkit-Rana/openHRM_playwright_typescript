import { faker } from '@faker-js/faker';


interface UserDate {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  },
  company: string;
  jobTitle: string;
  bio: string; 
}

// Generate fake user data
export function generateFakeUser(): UserDate {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    phoneNumber: faker.phone.number(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country()
    },
    company: faker.company.name(),
    jobTitle: faker.person.jobTitle(),
    bio: faker.lorem.sentence(),
  };
};


