import { describe, it, expect, beforeEach } from "vitest";
import { CART_STORAGE_KEY, loadCart, saveCart, addToCart, removeFromCart, clearCart } from "./index";

export type CartItem = {
  id: string;
  type: "ship" | "experience";
  slug: string;
  title: string;
  price: number;
  quantity: 1;
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

describe("Mantem 1 item quando adicina outro", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("não deve duplicar o item se ele já existir no carrinho", () => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([
        {
          id: "exp-1",
          type: "experience",
          slug: "orbital-premium",
          title: "Experiência Orbital Premium",
          price: 29900,
          quantity: 1,
        },
      ])
    );

    addToCart({
      id: "exp-1",
      type: "experience",
      slug: "orbital-premium",
      title: "Experiência Orbital Premium",
      price: 29900,
    });

    const items = loadCart();

    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(1);
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

describe("loadCart (dados inválidos)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("deve retornar array vazio se o JSON estiver inválido", () => {
    localStorage.setItem(CART_STORAGE_KEY, "{ invalid json");
    const result = loadCart();

    expect(result).toEqual([]);
  });

  it("deve retornar array vazio se o valor não for um array", () => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({ id: "1", title: "Fake" })
    );

    const result = loadCart();

    expect(result).toEqual([]);
  });
});