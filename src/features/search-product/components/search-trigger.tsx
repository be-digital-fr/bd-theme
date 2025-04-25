/**
 * External library imports
 */
import { Button } from '@/app/_components/ui';
import { Search } from 'lucide-react';
import Link from 'next/link';

/**
 * SearchTrigger Component
 *
 * A simple button component that triggers the product search dialog
 * when clicked by navigating to the search-product route.
 *
 * Uses the Search icon from Lucide and Next.js Link for client-side navigation.
 *
 * @returns {JSX.Element} A clickable search icon that opens the search dialog
 */
export default function SearchTrigger() {
  return (
      <Link href="/search-product">
        <Search className="w-5 h-5" aria-hidden="true" />
        <span className="sr-only">Search</span>
      </Link>
  );
}
