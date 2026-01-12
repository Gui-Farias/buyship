import type { CartItem } from "@/shared/lib/cart";

type StripeCheckoutItem = { name: string; unit_amount: number; quantity: number };

export async function startStripeCheckout(cartItems: CartItem[]) {
  const items: StripeCheckoutItem[] = cartItems.map((it) => ({
    name: it.title,
    unit_amount: it.price,
    quantity: it.quantity,
  }));

  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });

   const data = await res.json();

if (!res.ok) {
  throw new Error(data?.error || "Erro ao iniciar checkout");
}

if (typeof data?.url !== "string") {
  throw new Error("API não retornou uma URL válida do Stripe.");
}


  window.location.href = data.url;
}