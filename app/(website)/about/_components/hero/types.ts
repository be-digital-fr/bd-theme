import * as z from '@zod/mini';

export const ImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
});

export const HeroContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  mainImage: ImageSchema,
  secondaryImage: ImageSchema,
});

export const PartnerLogoSchema = z.extend(ImageSchema, {
  href: z.string(),
});

export const SectionBlockSchema = z.object({
  image: z.string(),
  title: z.string(),
  description: z.string(),
});

export type SectionBlock = z.infer<typeof SectionBlockSchema>;
export type HeroContent = z.infer<typeof HeroContentSchema>;
export type PartnerLogo = z.infer<typeof PartnerLogoSchema>;
