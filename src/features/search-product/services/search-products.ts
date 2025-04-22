import * as z from '@zod/mini';

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.optional(z.string()),
});

export type Product = z.infer<typeof ProductSchema>;

export async function searchProducts(query: string): Promise<Product[]> {
  if (!query) return [];

  try {
    const response = await fetch(
      `/api/products/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return z.array(ProductSchema).parse(data);
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
}
