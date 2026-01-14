import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type Item = {
  name: string;
  unit_amount: number;
  quantity: number;
};

type CheckoutBody = {
  items: Item[];
  email?: string;
};

function mustUrl(input: string | undefined, fallback: string) {
  const raw = (input ?? fallback).trim().replace(/\/+$/, "");
  const u = new URL(raw);
  if (u.protocol !== "http:" && u.protocol !== "https:") {
    throw new Error(
      `APP_URL precisa começar com http:// ou https:// (recebido: ${raw})`
    );
  }
  return u.toString().replace(/\/+$/, "");
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body: CheckoutBody =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { items, email } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Missing items" });
    }

    const appUrl = mustUrl(process.env.APP_URL, "http://localhost:5173");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      success_url: `${appUrl}/#/checkoutSuccess`,
      cancel_url: `${appUrl}/#/cart`,
      line_items: items.map((it) => ({
        price_data: {
          currency: "brl",
          product_data: {
            name: it.name || "Item",
          },
          unit_amount: it.unit_amount,
        },
        quantity: it.quantity || 1,
      })),
    });

    return res.status(200).json({ url: session.url });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Server error";

    return res.status(500).json({ error: message });
  }
}