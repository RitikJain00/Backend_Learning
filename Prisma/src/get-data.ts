import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getData () {
  const users = await prisma.user.findMany({});

  console.log(users);

  // prisma.user.findUnique ({
  //   where: {
  //     id: 1
  //   },

  //   include: {
  //     todos: true
  //   }
  // })
}

getData();