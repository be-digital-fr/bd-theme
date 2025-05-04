"use client";
import { motion } from "framer-motion";

import { CustomCarousel } from "@/app/_components/ui";
import { Category } from "@/lib";
import { z } from "@zod/mini";
import { CarouselItem } from "@/app/_components/ui/carousel";
import CategoryCard from "./category-card";

const CategoryCarrouselSchema = z.object({
  categories: z.array(z.custom<Category>()),
});

const MotionCarouselItem = motion.create(CarouselItem);

export default function CategoryCarrousel({ categories }: z.infer<typeof CategoryCarrouselSchema>) {
  return (
    <CustomCarousel>
      {categories?.map((category, index) => (
        <MotionCarouselItem
          key={category.id}
          className="pl-4 basis-full"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          role="group"
          aria-label={`category ${index + 1} of ${categories.length}`}
        >
          <CategoryCard category={category} />
        </MotionCarouselItem>
      ))}
    </CustomCarousel>
  );
}
