import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createUser() {
  await prisma.user.create({
    data: {
      email: 'ritikjain@gmail.com',
      password: 'ritik',
      firstName: 'Ritik',
      lastName: 'Jain',
    }
  })
}

createUser();