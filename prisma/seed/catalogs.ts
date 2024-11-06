import { PrismaClient } from '@prisma/client';
import { departments, ticketCategories, ticketLogType, ticketPriorities, ticketStatuses } from './data';

export const catalogSeed = async (prisma: PrismaClient) => {
  const data: { items: string[]; model: any }[] = [
    { items: departments, model: prisma.department },
    { items: ticketCategories, model: prisma.ticketCategory },
    { items: ticketPriorities, model: prisma.ticketPriority },
    { items: ticketStatuses, model: prisma.ticketStatus },
    { items: ticketLogType, model: prisma.ticketLogType },
  ];

  const upserts = data.flatMap(({ items, model }) =>
    items.map((name, index) =>
      model.upsert({
        where: { id: index + 1 },
        update: { name },
        create: { id: index + 1, name },
      }),
    ),
  );

  try {
    await prisma.$transaction(upserts);
  } catch (error) {
    console.error('Error seeding the catalog:', error);
  }
};
