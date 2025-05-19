import { prisma } from '@/lib';
import { NextResponse } from 'next/server';

type CategoryName = 'Burgers' | 'Pizzas' | 'Desserts' | 'Beverages' | 'Soups';

interface RecommendedProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: {
    id: string;
    name: string;
  };
  popularityScore: number;
  reviewScore: number;
  isBestSeller: boolean;
  isNew: boolean;
}

// Configuration des catégories complémentaires
const complementaryCategories: Record<CategoryName, string[]> = {
  'Burgers': ['Beverages', 'Desserts', 'Sides'],
  'Pizzas': ['Beverages', 'Desserts', 'Sides'],
  'Desserts': ['Beverages', 'Burgers', 'Pizzas'],
  'Beverages': ['Desserts', 'Burgers', 'Pizzas'],
  'Soups': ['Burgers', 'Pizzas', 'Beverages'],
};

// Fonction pour calculer le score de popularité
const calculatePopularityScore = (reviews: { rating: number }[]) => {
  if (reviews.length === 0) return 0;
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  return totalRating / reviews.length;
};

// Fonction pour récupérer les produits recommandés
async function getRecommendedProducts(
  currentProductId: string,
  categoryId: string,
  categoryName: CategoryName,
  limit: number
): Promise<RecommendedProduct[]> {
  const targetCategories = complementaryCategories[categoryName] || [];

  // Récupérer un pool plus large de produits pour le mélange
  const products = await prisma.product.findMany({
    where: {
      AND: [
        {
          OR: [
            { categoryId }, // Même catégorie
            {
              category: {
                name: {
                  in: targetCategories,
                },
              },
            },
          ],
        },
        { id: { not: currentProductId } },
        { isAvailable: true },
      ],
    },
    take: 50, // Pool plus large pour le mélange
    include: {
      category: true,
      reviews: {
        select: {
          rating: true,
        },
      },
      orderItems: {
        select: {
          quantity: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Transformer les produits avec des scores
  const scoredProducts = products.map(product => {
    const reviewScore = calculatePopularityScore(product.reviews);
    const totalSales = product.orderItems.reduce((acc, item) => acc + item.quantity, 0);
    const isNew = new Date().getTime() - new Date(product.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000; // 7 jours

    return {
      ...product,
      popularityScore: reviewScore * 0.6 + (totalSales > 10 ? 0.4 : 0), // Score combiné
      reviewScore,
      isBestSeller: totalSales > 10,
      isNew,
    };
  });

  // Mélanger les produits avec une distribution pondérée
  return scoredProducts
    .sort((a, b) => {
      const random = Math.random();
      
      // 30% de chance de prioriser les meilleures ventes
      if (random < 0.3 && (a.isBestSeller || b.isBestSeller)) {
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      }
      
      // 25% de chance de prioriser les mieux notés
      if (random < 0.55) {
        return b.reviewScore - a.reviewScore;
      }
      
      // 25% de chance de prioriser les nouveaux
      if (random < 0.8 && (a.isNew || b.isNew)) {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      
      // 20% de chance de mélange aléatoire
      return Math.random() - 0.5;
    })
    .slice(0, limit);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const limit = parseInt(searchParams.get('limit') || '4');

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Récupérer le produit actuel
    const currentProduct = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: true,
      },
    });

    if (!currentProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Récupérer les produits recommandés
    const recommendedProducts = await getRecommendedProducts(
      productId,
      currentProduct.categoryId,
      currentProduct.category.name as CategoryName,
      limit
    );

    return NextResponse.json(recommendedProducts);
  } catch (error) {
    console.error('Error in picked-for-you route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
