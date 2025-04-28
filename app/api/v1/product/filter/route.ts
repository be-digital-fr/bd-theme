import { NextRequest, NextResponse } from "next/server";
import { prisma, Prisma } from "@/lib";

type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    category: true;
    variants: true;
    extras: true;
    reviews: {
      include: {
        user: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Récupération des paramètres de filtrage
    const categoryId = searchParams.get("categoryId");
    const categoryName = searchParams.get("categoryName");
    const minPrice = searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")!) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : undefined;
    const isAvailable = searchParams.get("isAvailable") === "true" ? true : undefined;
    const searchQuery = searchParams.get("search") || undefined;
    const minCalories = searchParams.get("minCalories") ? parseInt(searchParams.get("minCalories")!) : undefined;
    const maxCalories = searchParams.get("maxCalories") ? parseInt(searchParams.get("maxCalories")!) : undefined;
    const minRating = searchParams.get("minRating") ? parseFloat(searchParams.get("minRating")!) : undefined;
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Construction de la requête de filtrage
    const where: Prisma.ProductWhereInput = {
      AND: [
        // Filtre par catégorie (ID ou nom)
        categoryId ? { categoryId } : {},
        categoryName ? {
          category: {
            name: {
              contains: categoryName,
              mode: "insensitive"
            }
          }
        } : {},
        
        // Filtre par prix
        {
          price: {
            ...(minPrice && { gte: minPrice }),
            ...(maxPrice && { lte: maxPrice }),
          },
        },
        
        // Filtre par disponibilité
        isAvailable !== undefined ? { isAvailable } : {},
        
        // Filtre par calories
        {
          calories: {
            ...(minCalories && { gte: minCalories }),
            ...(maxCalories && { lte: maxCalories }),
          },
        },
        
        // Recherche par nom ou description
        searchQuery
          ? {
              OR: [
                { name: { contains: searchQuery, mode: "insensitive" } },
                { description: { contains: searchQuery, mode: "insensitive" } },
              ],
            }
          : {},
      ],
    };

    // Récupération des produits avec filtrage
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
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
        orderBy: {
          [sortBy]: sortOrder,
        },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    // Calcul de la moyenne des notes pour chaque produit
    const productsWithRatings = products.map((product: ProductWithRelations) => {
      const averageRating = product.reviews.length
        ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
        : 0;

      // Filtrer les produits par note minimale si spécifiée
      if (minRating && averageRating < minRating) {
        return null;
      }

      const { reviews, ...productWithoutReviews } = product;
      return {
        ...productWithoutReviews,
        averageRating,
        totalReviews: reviews.length,
      };
    }).filter(Boolean);

    return NextResponse.json({
      products: productsWithRatings,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error filtering products:", error);
    return NextResponse.json(
      { error: "Error filtering products" },
      { status: 500 }
    );
  }
}
