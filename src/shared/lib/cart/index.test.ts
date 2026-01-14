import { describe, it, expect, beforeEach } from "vitest";
import { CART_STORAGE_KEY, loadCart, saveCart, addToCart, removeFromCart, clearCart } from "./index";
import type { CartItem } from "./index";

beforeEach(() => localStorage.clear());

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


describe("loadCart", () => {
  it("retorna [] quando não existe storage", () => {
    expect(loadCart()).toEqual([]);
  });

  it("faz fallback do type para experience quando vier inválido", () => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([
        {
          id: "x1",
          type: "invalid-type",
          slug: "abc",
          title: "Item",
          price: 10,
          quantity: 1,
        },
      ])
    );

    const [item] = loadCart();
    expect(item.type).toBe("experience");
  });

  it("normaliza campos opcionais (slug/title/price/imageSrc) quando vierem ausentes ou inválidos", () => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([
        {
          id: 123,              
          type: "ship",
          slug: null,      
          title: undefined,
          price: undefined,
          quantity: 1,     
          imageSrc: null,
        },
      ])
    );

    const [item] = loadCart();

    expect(item.id).toBe("123");
    expect(item.slug).toBe("");
    expect(item.title).toBe("");
    expect(item.price).toBe(0);
    expect(item.imageSrc).toBeUndefined();
  });
});