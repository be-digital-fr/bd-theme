/**
 * Formats a number as a price string with the Euro (€) symbol
 * @param price - The price to format
 * @returns Formatted price string (e.g. "19,99 €")
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);
};
