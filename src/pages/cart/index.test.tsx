import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import CartPage from ".";
import { CART_STORAGE_KEY } from "@/shared/lib/cart";
import { formatBRLFromCents } from "@/shared/lib/format-currency";

let sessionValue: unknown = null;
const openLoginSpy = vi.fn();
const startStripeCheckoutSpy = vi.fn();

vi.mock("@/shared/hooks/useSession", () => ({
  useSession: () => sessionValue,
}));

vi.mock("@/shared/features/auth/auth-modal-context", () => ({
  useAuthModal: () => ({
    openLogin: openLoginSpy,
    openRegister: vi.fn(),
  }),
}));

vi.mock("@/shared/lib/stripe", () => ({
  startStripeCheckout: (...args: unknown[]) => startStripeCheckoutSpy(...args),
}));

function setCart(items: unknown) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

function getStoredCart() {
  const raw = localStorage.getItem(CART_STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

describe("CartPage (integration)", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionValue = null;
    openLoginSpy.mockClear();
    startStripeCheckoutSpy.mockReset();
  });

  it("mostra 2 itens, soma os valores e ao remover atualiza o total", async () => {
    const ship = {
      id: "ship-1",
      type: "ship",
      slug: "magic-might",
      title: "Magic Might",
      price: 149900,
      quantity: 1,
      imageSrc: "/naves/nave01.webp",
    };

    const xp = {
      id: "xp-1",
      type: "experience",
      slug: "orbital-premium",
      title: "Experiência Orbital Premium",
      price: 29900,
      quantity: 1,
    };

    setCart([ship, xp]);

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Itens \(2\)/i)).toBeInTheDocument();
    expect(screen.getByText("Magic Might")).toBeInTheDocument();
    expect(screen.getByText("Experiência Orbital Premium")).toBeInTheDocument();


    const expectedTotal = ship.price + xp.price;
    const totalText = screen.getByTestId("cart-total").textContent?.replace(/\u00a0/g, " ")
    expect(totalText).toContain(formatBRLFromCents(expectedTotal));

    await user.click(
      screen.getByRole("button", { name: /faça login/i })
    );
    expect(openLoginSpy).toHaveBeenCalledTimes(1);

    const shipItem = screen.getByTestId("cart-item-ship-ship-1");
    await user.click(within(shipItem).getByTestId("cart-remove-ship-ship-1"));

    expect(screen.getByText(/Itens \(1\)/i)).toBeInTheDocument();
    expect(screen.queryByText("Magic Might")).not.toBeInTheDocument();

    const totalTextNew = screen.getByTestId("cart-total").textContent?.replace(/\u00a0/g, " ")
    expect(totalTextNew).toContain(formatBRLFromCents(xp.price));

    const stored = getStoredCart();
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe("xp-1");
  });

  it("carrinho vazio: mostra estado vazio e CTAs", () => {
    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Seu carrinho está vazio/i)).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /Ver experiências/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Ver naves/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Voltar para Home/i })).toBeInTheDocument();
  });

  it("itens no carrinho: botão Limpar carrinho limpa UI e storage", async () => {
    setCart([
      {
        id: "ship-1",
        type: "ship",
        slug: "magic-might",
        title: "Magic Might",
        price: 149900,
        quantity: 1,
      },
    ]);

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Itens \(1\)/i)).toBeInTheDocument();

    const clearBtn = screen.getByRole("button", { name: /Limpar carrinho/i });
    await user.click(clearBtn);

    expect(screen.getByText(/Seu carrinho está vazio/i)).toBeInTheDocument();
    expect(localStorage.getItem(CART_STORAGE_KEY)).toBeTruthy();
    expect(loadCartFromStorage()).toEqual([]);
  });

  it("checkout logado: se Stripe falhar, mostra erro (cobre branch do payError)", async () => {
    sessionValue = { user: { id: "u1" } };
    setCart([
      {
        id: "xp-1",
        type: "experience",
        slug: "orbital-premium",
        title: "Experiência Orbital Premium",
        price: 29900,
        quantity: 1,
      },
    ]);

    startStripeCheckoutSpy.mockRejectedValueOnce(new Error("Stripe falhou"));

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    );

    const checkoutBtn = screen.getByRole("button", { name: /Finalizar compra/i });
    await user.click(checkoutBtn);

    expect(await screen.findByText(/Stripe falhou/i)).toBeInTheDocument();
  });
});

function loadCartFromStorage() {
  const raw = localStorage.getItem(CART_STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}