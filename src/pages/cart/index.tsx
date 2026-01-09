import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CTA from "@/shared/components/CTA";
import { loadCart, saveCart } from "@/shared/lib/cart";
import type { CartItem } from "@/shared/lib/cart";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function formatBRLFromCents(valueInCents: number) {
  return (valueInCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(() => loadCart());

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const subtotal = useMemo(
    () => items.reduce((acc, it) => acc + it.price * it.quantity, 0),
    [items]
  );

  function updateQuantity(id: string, type: CartItem["type"], nextQty: number) {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id && it.type === type
          ? { ...it, quantity: clamp(nextQty, 1, 99) }
          : it
      )
    );
  }

  function removeItem(id: string, type: CartItem["type"]) {
    setItems((prev) => prev.filter((it) => !(it.id === id && it.type === type)));
  }

  function clearCart() {
    setItems([]);
  }

  const total = subtotal;
  const isEmpty = items.length === 0;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white relative">
            Carrinho<span className="text-(--accent) text-2xl relative left-0.5 -bottom-1.5">▪</span>
          </h1>
          <p className="mt-2 text-sm text-white/70">
            Revise seus itens antes de finalizar.
          </p>
        </div>

        {!isEmpty && (
          <button
            type="button"
            onClick={clearCart}
            className="mt-4 w-fit  border border-white/15 px-4 py-2 cursor-pointer text-sm font-semibold text-white/80 hover:bg-white/5 sm:mt-0"
          >
            Limpar carrinho
          </button>
        )}
      </header>

      {isEmpty ? (
        <section className="mt-10  border border-white/10 bg-black/50 p-10">
          <h2 className="text-xl font-semibold text-white">
            Seu carrinho está vazio
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Explore nossas experiências e adicione ao carrinho.
          </p>

          <div className="mt-8 flex gap-3">
            <CTA to="/experiences" variant="primary" label="Ver experiências" />
            <CTA to="/ships" variant="outline" label="Ver naves" />
            <Link
              to="/"
              className="inline-flex h-11 items-center justify-center  border border-white/15 px-5 text-sm font-semibold text-white/80 hover:bg-white/5"
            >
              Voltar para Home
            </Link>
          </div>
        </section>
      ) : (
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Itens */}
          <section className="lg:col-span-2">
            <div className=" border border-white/10 bg-black/50 p-6">
              <h2 className="text-lg font-semibold text-white">
                Itens ({items.length})
              </h2>

              <div className="mt-6 divide-y divide-white/10">
                {items.map((it) => {
                  const lineTotal = it.price * it.quantity;

                  return (
                    <div key={it.id} className="py-6">
                      <div className="flex gap-4">
                        <div className="h-20 w-24 overflow-hidden  border border-white/10 bg-black/40 flex items-center justify-center">
                          {it.imageSrc && (
                            <img
                              src={it.imageSrc}
                              alt={it.title}
                              className="h-full w-4/5 object-contain"
                              loading="lazy"
                            />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between gap-4">
                            <div>
                              <Link
                                  to={it.type === "ship" ? `/ships/${it.slug}` : `/experiences/${it.slug}`}
                                  className="mt-1 inline-block text-xs text-white/60 hover:text-white">
                                <p className="font-semibold text-white text-lg">{it.title}</p>
                                <span>Ver detalhes</span>
                              </Link>
                            </div>

                            <div className="text-right">
                              <p className="text-sm text-white/60">Preço</p>
                              <p className="font-semibold text-white">
                                {formatBRLFromCents(it.price)}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 flex justify-end items-center">
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => removeItem(it.id, it.type)}
                                className=" border border-white/15 px-3 py-2 cursor-pointer text-xs font-semibold text-white/70 hover:bg-white/5"
                              >
                                Remover
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <aside>
            <div className=" border border-white/10 bg-black/50 p-6">
              <h2 className="text-lg font-semibold text-white">Resumo</h2>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">
                    {formatBRLFromCents(subtotal)}
                  </span>
                </div>

                <div className="h-px bg-white/10" />

                <div className="flex justify-between">
                  <span className="text-white/80">Total</span>
                  <span className="text-xl font-bold text-white">
                    {formatBRLFromCents(total)}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <CTA
                  to="/checkout"
                  variant="primary"
                  label="Finalizar compra"
                />
                <CTA
                  to="/contact"
                  variant="outline"
                  label="Finalizar pelo WhatsApp"
                />
              </div>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}