import { prisma } from '@/lib';
import { catchError } from '@/utils';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        name: {
          equals: params.name,
          mode: 'insensitive',
        },
      },
      include: {
        category: true,
        variants: true,
        extras: true,
        reviews: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const averageRating = product.reviews.length
      ? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length
      : 0;

    const { reviews, ...productWithoutReviews } = product;

    return NextResponse.json({
      ...productWithoutReviews,
      averageRating,
      totalReviews: reviews.length,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
