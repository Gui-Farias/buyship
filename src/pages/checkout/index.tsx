import { Link } from "react-router-dom";

export default function CheckoutSuccess() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 text-white">
      <h1 className="text-3xl font-bold">Pagamento iniciado</h1>
      <p className="mt-2 text-white/70">
        Se estiver em modo de teste, finalize no Stripe Checkout.
      </p>
      <Link className="mt-6 inline-block underline" to="/cart">
        Voltar ao carrinho
      </Link>
    </main>
  );
}