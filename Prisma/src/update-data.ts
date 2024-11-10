import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateData () {
   await prisma.user.update({
    where: {
      id: 1
    },
    data: {
      password: '123'
    }
   });

 
}

updateData();