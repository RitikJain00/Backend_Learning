import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createTodo() {
  await prisma.todo.create({
    data: {
      title: 'Gym',
      description: 'Go to Gym at 7:00',
      userId: 1
    }
  })
}

createTodo();