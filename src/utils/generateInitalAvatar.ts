/**
 * Generates an initial avatar URL using ui-avatars.com
 * @param name The user's full name
 * @returns URL string for the initial avatar image
 */
export function generateInitialAvatar(name: string): string {
  const baseUrl = "https://ui-avatars.com/api/";
  const params = new URLSearchParams({
    name,
    background: "108470",
    color: "fff"
  });

  return `${baseUrl}?${params.toString()}`;
}
