import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";

/**
 * Webhook handler for Deliveroo orders
 * Validates the webhook signature and processes incoming orders
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

    // Process the order based on event type
    switch (body.event_type) {
      case "order.created":
        await handleOrderCreated(body.order);
        break;
      case "order.updated":
        await handleOrderUpdated(body.order);
        break;
      case "order.cancelled":
        await handleOrderCancelled(body.order);
        break;
      default:
        console.warn(`Unhandled event type: ${body.event_type}`);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error processing Deliveroo webhook:", error);
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
 * Handle new order creation
 */
async function handleOrderCreated(order: any) {
  // TODO: Implement order creation logic
  console.log("New order received:", order.id);
}

/**
 * Handle order updates
 */
async function handleOrderUpdated(order: any) {
  // TODO: Implement order update logic
  console.log("Order updated:", order.id);
}

/**
 * Handle order cancellations
 */
async function handleOrderCancelled(order: any) {
  // TODO: Implement order cancellation logic
  console.log("Order cancelled:", order.id);
}
