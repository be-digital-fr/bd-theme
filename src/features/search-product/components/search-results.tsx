'use client';

import { useRouter } from 'next/navigation';
import * as z from '@zod/mini';

const Product = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

type Product = z.infer<typeof Product>;

interface SearchResultsProps {
  products: Product[];
}

export function SearchResults({ products }: SearchResultsProps) {
  const router = useRouter();

  if (products.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        Aucun produit trouvé
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
          onClick={() => {
            router.push(`/products/${product.id}`);
            router.back();
          }}
          role="button"
          tabIndex={0}>
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>
      ))}
    </div>
  );
}
