/**
 * Converts a slugified string back to a readable format
 * Replaces hyphens with spaces and capitalizes words
 * Handles special cases like apostrophes (e.g. "soupe-a-l'oignon" -> "Soupe à l'Oignon")
 * @param slug - The slugified string to convert
 * @returns The unslugified string
 */
export function unslugify(slug: string): string {
  return slug
    .split('-')
    .map(word => {
      // Handle special case for words with apostrophes
      if (word.includes("l'")) {
        return "l'" + word.slice(2).charAt(0).toUpperCase() + word.slice(3);
      }
      // Replace 'a' with 'à' when it's a single letter
      if (word === 'a') {
        return 'à';
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}
