import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";

/**
 * Webhook handler for Deliveroo catalogue updates
 * Validates the webhook signature and processes catalogue changes
 */
export async function POST(request: Request) {
  try {
    // Get the raw request body as text
    const rawBody = await request.text();
    
    // Get Deliveroo webhook signature from headers
    const headersList = await headers();
    const signature = headersList.get("x-deliveroo-signature");
    
    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature header" },
        { status: 401 }
      );
    }

    // Verify webhook signature
    const isValid = verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    // Parse the validated body
    const body = JSON.parse(rawBody);

    // Process the catalogue update based on event type
    switch (body.event_type) {
      case "catalogue.created":
        await handleCatalogueCreated(body.catalogue);
        break;
      case "catalogue.updated":
        await handleCatalogueUpdated(body.catalogue);
        break;
      case "catalogue.deleted":
        await handleCatalogueDeleted(body.catalogue);
        break;
      default:
        console.warn(`Unhandled event type: ${body.event_type}`);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error processing Deliveroo catalogue webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Verify the webhook signature from Deliveroo
 */
function verifyWebhookSignature(payload: string, signature: string): boolean {
  const secret = process.env.DELIVEROO_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("DELIVEROO_WEBHOOK_SECRET is not configured");
  }

  const hmac = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(hmac)
  );
}

/**
 * Handle new catalogue creation
 */
async function handleCatalogueCreated(catalogue: any) {
  // TODO: Implement catalogue creation logic
  console.log("New catalogue received:", catalogue.id);
}

/**
 * Handle catalogue updates
 */
async function handleCatalogueUpdated(catalogue: any) {
  // TODO: Implement catalogue update logic
  console.log("Catalogue updated:", catalogue.id);
}

/**
 * Handle catalogue deletions
 */
async function handleCatalogueDeleted(catalogue: any) {
  // TODO: Implement catalogue deletion logic
  console.log("Catalogue deleted:", catalogue.id);
}
