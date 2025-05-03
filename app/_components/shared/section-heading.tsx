import { z } from "@zod/mini";
import Link from "next/link";

import { Button } from "../ui";
import { FadeInUp, WordsPullUp } from "../animation";

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
      className="flex gap-2 justify-between"
      role="banner"
      aria-label={`Section ${title}`}
    >
      <WordsPullUp containerClassName="md:max-w-lg max-w-md justify-start" className="text-2xl  md:text-4xl font-medium" text={title} />
      <FadeInUp>
        <Button
          variant="lime"
          className="h-8 md:h-12 shadow"
          asChild
          aria-label={linkText || `View all ${title}`}
        >
          <Link href={link} aria-describedby="section-title">
            {linkText || "View all"}
          </Link>
        </Button>
      </FadeInUp>
    </div>
  );
}
