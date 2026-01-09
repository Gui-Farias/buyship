export type CartItemType = "ship" | "experience";

export type CartItem = {
  id: string;
  type: CartItemType;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  imageSrc?: string;
};

export const CART_STORAGE_KEY = "buyship_cart_v1";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

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
      quantity: clamp(Number(x.quantity ?? 1), 1, 99),
      imageSrc: typeof x.imageSrc === "string" ? x.imageSrc : undefined,
    }));
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function addToCart(next: Omit<CartItem, "quantity">, qty = 1) {
  const items = loadCart();
  const addQty = clamp(qty, 1, 99);

  const idx = items.findIndex((it) => it.id === next.id && it.type === next.type);

  if (idx >= 0) {
    items[idx] = {
      ...items[idx],
      quantity: clamp(items[idx].quantity + addQty, 1, 99),
    };
  } else {
    items.push({
      ...next,
      quantity: addQty,
    });
  }

  saveCart(items);
}

export function updateCartQuantity(id: string, type: CartItemType, qty: number) {
  const items = loadCart().map((it) =>
    it.id === id && it.type === type ? { ...it, quantity: clamp(qty, 1, 99) } : it
  );
  saveCart(items);
  return items;
}

export function removeFromCart(id: string, type: CartItemType) {
  const items = loadCart().filter((it) => !(it.id === id && it.type === type));
  saveCart(items);
  return items;
}

export function clearCart() {
  saveCart([]);
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch {}
}