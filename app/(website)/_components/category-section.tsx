"use client";

import { Container } from "@/app/_components/shared";
import { CustomCarousel } from "@/app/_components/ui";
import { CarouselItem } from "@/app/_components/ui/carousel";
import CategoryCard from "./category-card";
import { Category } from "@/lib";
import { motion } from "framer-motion";
import Image from "next/image";
import { WordsPullUp } from "@/app/_components/animation";

const MotionCarouselItem = motion.create(CarouselItem);

export default function CategorySection({ categories }: { categories: Category[] }) {
  return (
    <section className="bg-[#E8DCC6] md:rounded-4xl p-4 py-16 relative">
      <Container as="div">
        <WordsPullUp containerClassName="justify-start mb-6 md:mb-0" className="text-2xl md:text-4xl font-medium " text="Best Categories We Have" />

        <div className="hidden md:grid grid-cols-2 gap-4 lg:grid-cols-4 mt-10">
          {categories?.map((category) => <CategoryCard key={category.id} category={category} />)}
        </div>

        <div className="md:hidden">
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
