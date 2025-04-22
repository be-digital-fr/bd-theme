"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "@uidotdev/usehooks";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Input
} from "@/app/_components/ui";
import { useSearchProducts } from "../services/use-search-products";

export function ProductSearch() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data: products, isLoading } = useSearchProducts(debouncedSearch);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    startTransition(() => {
      // Update the URL with the search query
      if (value) {
        router.push(`?q=${encodeURIComponent(value)}`);
      } else {
        router.push("");
      }
    });
  };

  return (
    <Dialog open onOpenChange={() => router.back()} aria-label="Recherche de produits">
      <DialogContent className="sm:max-w-[90vw] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Rechercher un produit</DialogTitle>
          <DialogDescription>Trouvez rapidement les produits que vous recherchez</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div className="relative">
            <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-accent-foreground rounded-full p-2">
              <Search className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
              type="search"
              autoComplete="off"
              autoFocus
              aria-label="Rechercher un produit"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {isLoading || isPending ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : products?.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Aucun produit trouvé</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products?.map((product: any) => (
                  <div
                    key={product.id}
                    className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                    onClick={() => {
                      router.push(`/products/${product.id}`);
                      router.back();
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
