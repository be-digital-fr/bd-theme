'use server';

import { prisma } from '@/lib/prisma-client';
import { catchError } from '@/utils/catchError';
import { authSession } from '@/infrastructure/better-auth/lib';
import { z } from '@zod/mini';

const schema = z.object({
  productId: z.string(),
  isFavorite: z.boolean(),
});

export const toggleFavorite = async (input: unknown) => {
  const { productId, isFavorite } = schema.parse(input);
  const session = await authSession();
  const userId = session?.user?.id;
  if (!userId) {
    return { success: false, isFavorite: false, error: 'NOT_AUTHENTICATED' };
  }

  if (isFavorite) {
    // Remove favorite (idempotent)
    const [error] = await catchError(
      prisma.favorite.deleteMany({ where: { userId, productId } })
    );
    if (error) {
      return { success: false, isFavorite: true, error: error.message };
    }
    // Toujours success même si rien n'était à supprimer
    return { success: true, isFavorite: false };
  } else {
    // Add favorite (idempotent)
    const [error] = await catchError(
      prisma.favorite.create({
        data: {
          userId: userId,
          productId: productId,
        },
      })
    );
    if (error) {
      return { success: false, isFavorite: false, error: error.message };
    }
    return { success: true, isFavorite: true };
  }
};
