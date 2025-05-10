'use client';

import { CustomCarousel } from '@/app/_components/ui';
import React from 'react';
import TeamCard from './team-card';
import { motion } from 'framer-motion';
import { CarouselItem } from '@/app/_components/ui/carousel';
import { TeamMember } from './type';

const MotionCarouselItem = motion.create(CarouselItem);

export default function TeamMobile({
  teamMembers,
}: {
  teamMembers: TeamMember[];
}) {
  return (
    <section className="md:hidden">
      <CustomCarousel>
        {teamMembers.map((member) => (
          <MotionCarouselItem
            key={member.name}
            className="pl-4 basis-full"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            role="group">
            <TeamCard {...member} />
          </MotionCarouselItem>
        ))}
      </CustomCarousel>
    </section>
  );
}
