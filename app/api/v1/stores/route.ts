import { StoreSchema } from "@/entities/store.entity";
import { fetchSanityData } from "@/infrastructure/sanity/lib";
import { catchError } from "@/utils";
import { defineQuery } from "next-sanity";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  const STORE_QUERY = defineQuery(`*[_type == "store"] {
   ...
  }`);

  // Fetch and validate data using error boundary pattern
  const [error, result] = await catchError(
    fetchSanityData({
      query: STORE_QUERY,
      schema: z.array(StoreSchema),
    })
  );

  if (error) {
    console.error("[Store API] Error:", error);
    return NextResponse.json({ error: "Failed to fetch stores" }, { status: 500 });
  }

  return NextResponse.json(result);
}
