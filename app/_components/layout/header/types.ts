import * as z from '@zod/mini';

/**
 * Navigation link validation schema
 * @property {string} href - URL path
 * @property {string} label - Display text
 * @property {string} description - Tooltip/aria description
 */
export const NavigationLinkSchema = z.object({
  href: z.string(),
  label: z.string(),
  description: z.optional(z.string()),
});

/**
 * Navigation links array schema
 */
export const NavigationLinksSchema = z.array(NavigationLinkSchema);

// Types inferred from schemas
export type NavigationLink = z.infer<typeof NavigationLinkSchema>;
export type NavigationLinks = z.infer<typeof NavigationLinksSchema>;
