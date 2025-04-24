/**
 * @file route.ts
 * @description API route handler for product search functionality.
 * Provides a GET endpoint that accepts a search query and returns matching products.
 */

import { NextResponse } from 'next/server';
import { searchProducts } from '@/features/search-product/services/search-products';

/**
 * GET handler for product search
 * @param request - The incoming HTTP request
 * @returns JSON response with search results or error message
 */
export async function GET(request: Request) {
  // Extract search query from URL parameters
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';

  try {
    // Perform search using the products service
    const products = await searchProducts(query);
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    );
  }
} 