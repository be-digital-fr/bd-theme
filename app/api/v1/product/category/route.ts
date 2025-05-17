import { prisma } from "@/lib";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    if (!categories || categories.length === 0) {
      return NextResponse.json(
        { error: "No categories found" },
        { status: 500 }
      );
    }

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
