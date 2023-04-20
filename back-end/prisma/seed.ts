import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.employee.deleteMany();

  const ELEMENTS_QTY = 50;

  Array.from(Array(ELEMENTS_QTY).keys()).forEach(async () => {
    await prisma.employee.create({
      data: {
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
        birthday: faker.date.birthdate(),
        city: faker.address.cityName(),
        job: faker.name.jobTitle(),
      },
    });
  });
}

seed().finally(() => prisma.$disconnect());
