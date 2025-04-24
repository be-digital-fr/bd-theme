import { prisma } from "@/lib";

export const searchProducts = async (query: string) => {
  // Search products by name and description content
  const searchResults = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    },
  });

  return searchResults;
};
