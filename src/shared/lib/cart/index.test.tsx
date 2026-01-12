import { describe, it, expect } from "vitest";
import { CART_STORAGE_KEY, loadCart, saveCart, addToCart, removeFromCart, clearCart } from "./index";

export type CartItem = {
  id: string;
  type: "ship" | "experience";
  slug: string;
  title: string;
  price: number;
  quantity: number;
  imageSrc?: string;
};


describe("saveCart", () => {
  it("salva itens no localStorage", () => {
    const items: CartItem[] = [
      { id: "1", type: "ship", slug: "falcon", title: "Falcon", price: 100000, quantity: 1, imageSrc: "img.png" },
    ];
    saveCart(items);
    expect(JSON.parse(localStorage.getItem(CART_STORAGE_KEY)!)).toEqual(items);
  });
});

describe("addToCart", () => {
  it("adiciona novo item ao carrinho", () => {
    addToCart({ 
      id: "1",
      type: "ship",
      slug: "falcon",
      title: "Falcon",
      price: 100,
      imageSrc: "img.png",
    });

    const items = loadCart();
    expect(items).toHaveLength(1);
  });
});


describe("removeFromCart", () => {
  it("remove item específico do carrinho", () => {
    saveCart([
      { id: "1", type: "ship", slug: "x", title: "X", price: 100, quantity: 1 },
      { id: "2", type: "experience", slug: "y", title: "Y", price: 200, quantity: 1 },
    ]);

    const items = removeFromCart("1", "ship");

    expect(items).toHaveLength(1);
    expect(items[0].id).toBe("2");
  });
});

describe("clearCart", () => {
  it("remove todos os itens e limpa storage", () => {
    saveCart([
      { id: "1", type: "ship", slug: "x", title: "X", price: 100, quantity: 1 },
    ]);

    clearCart();

    expect(loadCart()).toEqual([]);
    expect(localStorage.getItem(CART_STORAGE_KEY)).toBeNull();
  });
});