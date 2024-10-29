import { PrismaClient } from '@prisma/client';
import { userSeed } from './user.seed';
import { catalogSeed } from './catalogs';

const prisma = new PrismaClient();

const main = async () => {
  await catalogSeed(prisma);
  await userSeed(prisma);
};

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
