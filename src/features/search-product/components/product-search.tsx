/**
 * @file ProductSearch.tsx
 * @description Product search component that handles the UI and API calls.
 * Uses local state to manage search query and results.
 */

'use client';

import { useState } from 'react';
import { SearchInput } from './search-input';
import { SearchResults } from './search-results';
import { catchError } from '@/utils';

// Type definition for a product returned by the API
interface Product {
  id: string;
  name: string;
  description: string;
}

export function ProductSearch() {
  // Local states for search management
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles product search
   * @param searchQuery - The search string entered by the user
   */
  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    setIsLoading(true);

    // If search is empty, reset results
    if (!searchQuery.trim()) {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    // API call with error handling using catchError utility
    const [error, results] = await catchError(
      fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`).then(
        (response) => {
          if (!response.ok) {
            throw new Error('Failed to search products');
          }
          return response.json();
        }
      ),
      [Error]
    );

    if (error) {
      console.error('Error searching products:', error);
      setProducts([]);
    } else {
      setProducts(results);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <SearchInput value={query} onChange={handleSearch} />
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : (
          <SearchResults products={products} />
        )}
      </div>
    </div>
  );
}
