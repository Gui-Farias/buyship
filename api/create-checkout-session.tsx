import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type Item = { name: string; unit_amount: number; quantity: number };

function mustUrl(input: string | undefined, fallback: string) {
  const raw = (input ?? fallback).trim().replace(/\/+$/, ""); // remove espaços e trailing /
  // valida URL absoluta
  const u = new URL(raw); // lança erro se inválida
  if (u.protocol !== "http:" && u.protocol !== "https:") {
    throw new Error(`APP_URL precisa começar com http:// ou https:// (recebido: ${raw})`);
  }
  return u.toString().replace(/\/+$/, "");
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    // Vercel pode entregar body como string em alguns cenários
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const items = body?.items as Item[];

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Missing items" });
    }

    const appUrl = mustUrl(process.env.APP_URL, "http://localhost:5173");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cart`,
      line_items: items.map((it) => ({
        price_data: {
          currency: "brl",
          product_data: { name: String(it.name ?? "Item") },
          unit_amount: Number(it.unit_amount), // centavos
        },
        quantity: Number(it.quantity) || 1,
      })),
    });

    return res.status(200).json({ url: session.url });
  } catch (e: any) {
    // expõe a mensagem real do Stripe (quando existir)
    const stripeMsg = e?.raw?.message || e?.message || "Server error";
    return res.status(500).json({ error: stripeMsg });
  }
}