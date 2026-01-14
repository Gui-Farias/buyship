import { useMemo, useState } from "react";

type ContactInfo = {
  whatsappDisplay: string;
  whatsappE164: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
};

const CONTACT: ContactInfo = {
  whatsappDisplay: "+55 11 91052-9070",
  whatsappE164: "5511910529070",
  email: "gui.farias@outlook.com.br",
  addressLine1: "Av. Orbital, 9070 - Centro",
  addressLine2: "São Paulo - SP",
};

function buildWhatsAppUrl(params: {
  phoneE164: string;
  name: string;
}) {
  const safeName = params.name.trim();

  const messageLines = [
    "Olá! Gostaria de falar com a BuyShip.",
    `${safeName !== "" ? `Nome: ${safeName}` : ""}`,
  ];

  const text = encodeURIComponent(messageLines.join("\n"));
  return `https://wa.me/${params.phoneE164}?text=${text}`;
}

export default function Contact() {
  const [name, setName] = useState("");

  const waUrl = useMemo(
    () => buildWhatsAppUrl({ phoneE164: CONTACT.whatsappE164, name }),
    [name]
  );

  const canSubmit = name.trim().length >= 2;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold text-white">
          Contato<span className="text-(--accent) text-2xl relative left-0.5 -bottom-1.5">▪</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          Fale com a BuyShip pelo WhatsApp ou envie seus dados para retornarmos.
        </p>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <section className="space-y-6 lg:col-span-1">
          <div className=" border border-white/10 bg-black/50 p-8">
            <h2 className="text-lg font-semibold text-white">Nossos contatos</h2>

            <div className="mt-5 space-y-4 text-sm">
              <div className=" border border-white/10 bg-black/40 p-4">
                <p className="text-xs text-white/60">WhatsApp</p>
                <a
                  href={`https://wa.me/${CONTACT.whatsappE164}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block font-semibold text-white hover:text-(--primary-active)"
                >
                  {CONTACT.whatsappDisplay}
                </a>
              </div>

              <div className=" border border-white/10 bg-black/40 p-4">
                <p className="text-xs text-white/60">E-mail</p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-1 block font-semibold text-white hover:text-(--primary-active)"
                >
                  {CONTACT.email}
                </a>
              </div>

              <div className=" border border-white/10 bg-black/40 p-4">
                <p className="text-xs text-white/60">Endereço</p>
                <p className="mt-1 font-semibold text-white">
                  {CONTACT.addressLine1}
                </p>
                <p className="text-white/80">{CONTACT.addressLine2}</p>
              </div>
            </div>
          </div>

          <div className=" border border-white/10 bg-black/50 p-8">
            <h2 className="text-lg font-semibold text-white">Atendimento</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Resposta mais rápida via WhatsApp. Para solicitações formais, use o
              e-mail.
            </p>
          </div>
        </section>

        <section className="lg:col-span-2">
          <div className=" border border-white/10 bg-black/50 p-8">
            <h2 className="text-lg font-semibold text-white">
              Envie seus dados
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Preencha seu nome e WhatsApp. Ao clicar, abriremos uma conversa já
              com a mensagem pronta.
            </p>

            <form
              className="mt-8 grid gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                if (!canSubmit) return;
                window.open(waUrl, "_blank", "noreferrer");
              }}
            >
              <label className="grid gap-2">
                <span className="text-sm font-medium text-white/80">Nome</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="h-11  border border-white/10 bg-black/40 px-4 text-sm text-white outline-none ring-0 placeholder:text-white/40 focus:border-(--primary-active)"
                />
              </label>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={[
                    "inline-flex h-11 items-center justify-center  px-5 text-sm font-semibold",
                    "bg-(--primary-active) text-black",
                    "disabled:cursor-not-allowed disabled:opacity-40",
                  ].join(" ")}
                >
                  Chamar no WhatsApp
                </button>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center  border border-white/15 bg-transparent px-5 text-sm font-semibold text-white/80 hover:bg-white/5"
                >
                  Abrir link direto
                </a>

                <p className="text-xs text-white/50 sm:ml-auto">
                  Sem envio de dados para servidor.
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}