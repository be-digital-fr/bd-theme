import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";

/**
 * Webhook handler for Deliveroo menu updates
 * Validates the webhook signature and processes menu changes
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

    // Process the menu update based on event type
    switch (body.event_type) {
      case "menu.created":
        await handleMenuCreated(body.menu);
        break;
      case "menu.updated":
        await handleMenuUpdated(body.menu);
        break;
      case "menu.deleted":
        await handleMenuDeleted(body.menu);
        break;
      default:
        console.warn(`Unhandled event type: ${body.event_type}`);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error processing Deliveroo menu webhook:", error);
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
 * Handle new menu creation
 */
async function handleMenuCreated(menu: any) {
  // TODO: Implement menu creation logic
  console.log("New menu received:", menu.id);
}

/**
 * Handle menu updates
 */
async function handleMenuUpdated(menu: any) {
  // TODO: Implement menu update logic
  console.log("Menu updated:", menu.id);
}

/**
 * Handle menu deletions
 */
async function handleMenuDeleted(menu: any) {
  // TODO: Implement menu deletion logic
  console.log("Menu deleted:", menu.id);
}
