"use client";

import { Container } from "@/app/_components/shared";
import { CustomCarousel } from "@/app/_components/ui";
import { CarouselItem } from "@/app/_components/ui/carousel";
import CategoryCard from "./category-card";
import { Category } from "@/lib";
import { motion } from "framer-motion";
import Image from "next/image";

const MotionCarouselItem = motion.create(CarouselItem);

export default function CategorySection({ categories }: { categories: Category[] }) {
  return (
    <section className="bg-[#E8DCC6] rounded-4xl p-4 py-16 relative">
      <Container as="div">
        <h2 className="text-xl md:text-4xl font-medium md:max-w-lg" id="section-title">
          Best Categories We Have
        </h2>

        <div className="hidden md:grid grid-cols-2 gap-4 md:grid-cols-4 mt-10">
          {categories?.map((category) => <CategoryCard key={category.id} category={category} />)}
        </div>

        <div className="md:hidden">
          <CustomCarousel>
            {categories?.map((category, index) => (
              <MotionCarouselItem
                key={category.id}
                className="pl-4 basis-full md:basis-1/3"
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
        </div>
      </Container>

      <Image
        src="/images/decoration-left-shape.svg"
        alt="Decoration left shape"
        width={200}
        height={200}
        className="absolute bottom-20 -left-6"
      />
      <Image
        src="/images/decoration-right-shape.svg"
        alt="Decoration right shape"
        width={400}
        height={400}
        className="absolute top-16 right-0"
      />
    </section>
  );
}
