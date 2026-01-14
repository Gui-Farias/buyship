import { Link, useSearchParams } from "react-router-dom";
import CTA from "@/shared/components/CTA";

export default function CheckoutSuccessPage() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 text-white">
      <section className="border border-white/10 bg-black/50 p-10">
        <h1 className="text-4xl font-bold">
          Compra confirmada
          <span className="text-(--accent) text-2xl relative left-1 -bottom-1.5">
            ▪
          </span>
        </h1>

        <p className="mt-3 text-white/70">
          Obrigado pela compra. Em breve nossa equipe entrará em contato para
          combinar a entrega da nave ou agendar sua experiência de viagem.
        </p>

        {sessionId ? (
          <p className="mt-4 text-sm text-white/50">
            Referência do pagamento: <span className="text-white/80">{sessionId}</span>
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <CTA to="/ships" variant="primary" label="Ver mais naves" />
          <CTA to="/experiences" variant="outline" label="Ver experiências" />
          <CTA to="/" variant="outline" label="Voltar para Home" />
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-sm text-white/60">
            Dúvidas? Fale com a gente pelo{" "}
            <Link to="/contact" className="text-white underline underline-offset-4">
              contato
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}