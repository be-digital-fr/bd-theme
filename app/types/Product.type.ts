import { Prisma } from '@/lib';

export type ProductType = Prisma.ProductGetPayload<{
  include: {
    reviews: true;
  };
}>;

export type IProduct = ProductType & {
  averageRating: number;
  totalReviews: number;
};
