import { prisma } from '@/lib';
import { NextResponse } from 'next/server';

/**
 * GET /api/v1/product
 * Récupère tous les produits avec leurs relations
 * 
 * @returns {Promise<NextResponse>} Liste des produits avec leurs catégories, variants et extras
 */
export async function GET() {
  try {
    // Récupération de tous les produits avec leurs relations
    const products = await prisma.product.findMany({
      include: {
        category: true,    // Inclut les informations de la catégorie
        variants: true,    // Inclut les variantes disponibles
        extras: true,      // Inclut les extras disponibles
      },
      orderBy: {
        createdAt: 'desc'  // Trie par date de création décroissante
      }
    });

    return NextResponse.json(products);
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
