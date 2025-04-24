/**
 * @file SearchInput.tsx
 * @description A controlled input component for product search.
 * Provides a search field with an icon and handles user input.
 */

'use client';

import { Search } from 'lucide-react';
import { Input } from '@/app/_components/ui';

// Props interface for the SearchInput component
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  /**
   * Handles input change events
   * @param e - The input change event
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      {/* Search icon */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent text-accent-foreground rounded-full p-1.5">
        <Search className="w-4 h-4" aria-hidden="true" />
      </div>
      {/* Search input field */}
      <Input
        placeholder="Search for a product..."
        value={value}
        onChange={handleSearchChange}
        className="rounded-full pl-4 pr-10"
        type="search"
        autoComplete="off"
        autoFocus
        aria-label="Search for a product"
      />
    </div>
  );
} 