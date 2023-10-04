import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.todo.deleteMany();

  console.log('Seeding...');

  const todo1 = await prisma.todo.create({
    data: {
      title: "Join Gemini team!",
      detail: "Doing my best!"
    },
  });

  const todo2 = await prisma.todo.create({
    data: {
      title: "Join Gemini team!",
      detail: "Doing my best!"
    },
  });

  const todo3 = await prisma.todo.create({
    data: {
      title: "Join Gemini team!",
      detail: "Doing my best!"
    },
  });

  console.log({ todo1, todo2, todo3 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });