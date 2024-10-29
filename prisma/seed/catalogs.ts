import { PrismaClient } from '@prisma/client';
import { departments, ticketCategories, ticketLogType, ticketPriorities, ticketStatuses } from './data';

export const catalogSeed = async (prisma: PrismaClient) => {
  await prisma.department.createMany({
    data: departments.map((name, index) => ({ id: index + 1, name })),
  });

  await prisma.ticketCategory.createMany({
    data: ticketCategories.map((name, index) => ({ id: index + 1, name })),
  });

  await prisma.ticketPriority.createMany({
    data: ticketPriorities.map((name, index) => ({ id: index + 1, name })),
  });

  await prisma.ticketStatus.createMany({
    data: ticketStatuses.map((name, index) => ({ id: index + 1, name })),
  });

  await prisma.ticketLogType.createMany({
    data: ticketLogType.map((name, index) => ({ id: index + 1, name })),
  });
};
