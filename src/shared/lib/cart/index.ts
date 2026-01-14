export type CartItem = {
  id: string;
  type: "ship" | "experience";
  slug: string;
  title: string;
  price: number;
  quantity: number;
  imageSrc?: string;
};

export const CART_STORAGE_KEY = "buyship_cart_v1";

export function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.map((x) => ({
      id: String(x.id),
      type: x.type === "ship" || x.type === "experience" ? x.type : "experience",
      slug: String(x.slug ?? ""),
      title: String(x.title ?? ""),
      price: Number(x.price ?? 0),
      quantity: 1,
      imageSrc: typeof x.imageSrc === "string" ? x.imageSrc : undefined,
    }));
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn("Falha ao salvar o carrinho no localStorage", err);
    }
  }
}

export function addToCart(next: Omit<CartItem, "quantity">) {
  const items = loadCart();

  const idx = items.findIndex(
    (it) => it.id === next.id && it.type === next.type
  );

  if (idx >= 0) {
    return;
  }

  items.push({
    ...next,
    quantity: 1,
  });

  saveCart(items);
}

export function removeFromCart(id: string, type: CartItem["type"]) {
  const items = loadCart().filter((it) => !(it.id === id && it.type === type));
  saveCart(items);
  return items;
}

export function clearCart() {
  saveCart([]);
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn("Falha ao limpart o carrinho", err);
    }
  }
}