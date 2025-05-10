import React from 'react';
import Image from 'next/image';
import { TeamMember } from './type';

export default function TeamCard({ image, name, position }: TeamMember) {
  return (
    <article
      className="flex flex-col items-center p-4 "
      aria-labelledby={`team-member-${name
        .toLowerCase()
        .replace(/\s+/g, '-')}`}>
      <div className="relative w-full max-w-64 h-64 mb-4 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <Image
          src={image}
          alt={`Photo de ${name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="text-center">
        <h3
          id={`team-member-${name.toLowerCase().replace(/\s+/g, '-')}`}
          className="text-xl font-semibold text-gray-200 mb-1">
          {name}
        </h3>
        <p className="text-gray-100 text-sm" aria-label={`Poste: ${position}`}>
          {position}
        </p>
      </div>
    </article>
  );
}
