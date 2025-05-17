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
 * - selectedCategories: Array of currently selected categories
 * - toggleCategory: Function to toggle a category selection
 * - resetFilter: Function to clear all category filters
 */
export function useFilterStore() {
  const [selectedCategories, setSelectedCategories] = useQueryState('categories');
  const [, setPage] = useQueryState('page');

  /**
   * Toggles a category selection
   * @param category - Category name to toggle
   */
  const toggleCategory = (category: string) => {
    const currentCategories = selectedCategories ? selectedCategories.split(',') : [];
    const categorySlug = createSlug(category);
    
    const newCategories = currentCategories.includes(categorySlug)
      ? currentCategories.filter(c => c !== categorySlug)
      : [...currentCategories, categorySlug];

    setSelectedCategories(newCategories.length > 0 ? newCategories.join(',') : null);
    // Reset to page 1 when categories change
    setPage('1');
  };

  /**
   * Clears all category filters
   */
  const resetFilter = () => {
    setSelectedCategories(null);
    setPage('1');
  };

  return {
    selectedCategories: selectedCategories ? selectedCategories.split(',').map(decodeSlug) : [],
    toggleCategory,
    resetFilter,
  };
}