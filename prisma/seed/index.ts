import { PrismaClient } from '@/generated/prisma';
import productSeed from './product.seed';

const prisma = new PrismaClient();

async function seed() {
  await productSeed();
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
