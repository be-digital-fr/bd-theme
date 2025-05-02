import { Category } from "@/lib";
import Image from "next/image";
import React from "react";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <div key={category.id} className="bg-white/20 rounded-2xl p-4 py-8 space-y-4">
      <div className="flex items-center justify-center bg-white w-max rounded-full p-3">
        <div className="bg-white w-20 h-20 p-3 rounded-full relative">
          <Image src={category.image || ""} alt={category.name} fill className="object-cover" />
        </div>
      </div>
      <h3 className="text-lg font-medium">{category.name}</h3>
      <p className="text-sm text-[#6D6A4B]">{category.description}</p>
    </div>
  );
}
