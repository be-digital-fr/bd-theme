import { Prisma } from '@/lib';

export type ProductType = Prisma.ProductGetPayload<{
  include: {
    reviews: true;
  };
}>;
