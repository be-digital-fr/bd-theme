import { Prisma } from '@/lib';

export type ProductType = Prisma.ProductGetPayload<{
  include: {
    reviews: true;
    extras: true;
  };
}>;

export type IAdditionalIngredient = Prisma.ExtraGetPayload<{}>;

export type IProduct = ProductType & {
  averageRating: number;
  totalReviews: number;
  removeIngredients?: string[];
  additionalIngredients?: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};
