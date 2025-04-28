import { z } from "@zod/mini";
import Link from "next/link";

import { Button } from "../ui";

/**
 * Schema of validation for the props of the SectionHeading component
 * @property {string} title - The title of the section
 * @property {string} link - The URL of redirection
 * @property {string} [linkText] - The text of the link (optional, default "View all")
 */
const SectionHeadingSchema = z.object({
  title: z.string(),
  link: z.string(),
  linkText: z.optional(z.string()),
});

type SectionHeadingProps = z.infer<typeof SectionHeadingSchema>;

/**
 * Composant SectionHeading - Display a section title with a redirection link
 *
 * @component
 * @example
 * ```tsx
 * <SectionHeading
 *   title="Our products"
 *   link="/products"
 *   linkText="View all products"
 * />
 * ```
 */
export default function SectionHeading({ title, link, linkText }: SectionHeadingProps) {
  // Validate props with Zod
  SectionHeadingSchema.parse({ title, link, linkText });

  return (
    <div
      className="grid grid-cols-2 gap-4 md:flex md:justify-between"
      role="banner"
      aria-label={`Section ${title}`}
    >
      <h2 className="text-xl md:text-3xl font-medium md:max-w-lg" id="section-title">
        {title}
      </h2>
      <Button variant="lime" className="h-8 md:h-12" asChild aria-label={linkText || `View all ${title}`}>
        <Link href={link} aria-describedby="section-title">
          {linkText || "View all"}
        </Link>
      </Button>
    </div>
  );
}


