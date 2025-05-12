import { prisma } from '@/lib';
import { NextResponse } from 'next/server';

// Fonction pour décoder un slug en nom de catégorie
const decodeSlug = (slug: string) => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * GET /api/v1/product
 * Récupère les produits avec pagination et filtrage par catégorie
 * 
 * @param {Request} request - La requête contenant les paramètres de pagination et de filtrage
 * @returns {Promise<NextResponse>} Liste paginée des produits avec leurs catégories, variants et extras
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const categorySlug = searchParams.get('category');
    const skip = (page - 1) * limit;

    // Construction de la requête avec filtrage
    const where = categorySlug
      ? {
          category: {
            name: decodeSlug(categorySlug),
          },
        }
      : {};

    // Récupération du nombre total de produits avec filtrage
    const total = await prisma.product.count({ where });

    // Récupération des produits avec pagination et filtrage
    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        variants: true,
        extras: true,
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    });

    // Calcul des métadonnées de pagination
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return NextResponse.json({
      data: products,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage,
        hasPreviousPage
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des produits' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/v1/product
 * Crée un nouveau produit
 * 
 * @param {Request} request - La requête contenant les données du produit
 * @returns {Promise<NextResponse>} Le produit créé
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validation des champs requis
    if (!body.name || !body.description || !body.price || !body.categoryId) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    // Création du produit
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: parseFloat(body.price),
        image: body.image || '',
        calories: body.calories ? parseInt(body.calories) : null,
        isAvailable: body.isAvailable ?? true,
        preparationTime: body.preparationTime ? parseInt(body.preparationTime) : null,
        categoryId: body.categoryId,
      },
      include: {
        category: true,
        variants: true,
        extras: true,
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du produit' },
      { status: 500 }
    );
  }
}
