import { useQueryState } from 'nuqs';

/**
 * Creates a URL-friendly slug from a category name
 * - Converts to lowercase
 * - Removes diacritics/accents
 * - Replaces non-alphanumeric chars with hyphens
 * - Trims hyphens from start/end
 */
const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/(^-|-$)/g, ''); // Remove leading/trailing hyphens
};

/**
 * Decodes a slug back into a readable category name
 * - Splits on hyphens
 * - Capitalizes first letter of each word
 * - Joins with spaces
 */
const decodeSlug = (slug: string) => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Custom hook for managing category filter state in URL query params
 * @returns {Object} Filter state and handlers
 * - selectedCategory: Current selected category (decoded from slug)
 * - setSelectedCategory: Function to update selected category
 * - resetFilter: Function to clear category filter
 */
export function useFilterStore() {
  const [selectedCategory, setSelectedCategory] = useQueryState('category');
  const [, setPage] = useQueryState('page');

  /**
   * Updates the selected category and resets pagination
   * @param category - Category name to set, or null to clear
   */
  const handleSetCategory = (category: string | null) => {
    setSelectedCategory(category ? createSlug(category) : null);
    // Reset to page 1 when category changes
    setPage('1');
  };

  /**
   * Clears the category filter
   */
  const resetFilter = () => handleSetCategory(null);

  return {
    selectedCategory: selectedCategory ? decodeSlug(selectedCategory) : null,
    setSelectedCategory: handleSetCategory,
    resetFilter,
  };
}