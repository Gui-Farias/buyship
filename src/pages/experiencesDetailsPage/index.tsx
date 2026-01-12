import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/shared/components/Breadcrumb";
import CTA from "@/shared/components/CTA";
import { addToCart } from "@/shared/lib/cart";
import { formatBRLFromCents } from "@/shared/lib/format-currency";


type Experience = {
  id: string;
  slug: string;
  title: string;
  price: number;
  description: string;
  highlight?: boolean;
  heroImageSrc?: string; // public/
  durationLabel?: string;
  altitudeLabel?: string;
  included: string[];
  requirements: string[];
  itinerary: { title: string; description: string }[];
  faq: { q: string; a: string }[];
};

const experiencesCatalog: Experience[] = [
  {
    id: "1",
    slug: "orbital-premium",
    title: "Experiência Orbital Premium",
    price: 29900,
    description:
      "Voo orbital exclusivo com vistas panorâmicas da Terra, cabine de luxo, equipe dedicada e treinamento pré-voo completo.",
    highlight: true,
    heroImageSrc: "/images/experiences/orbital-premium.webp",
    durationLabel: "Duração total: 3 dias (inclui treinamento)",
    altitudeLabel: "Perfil: Órbita baixa (LEO)",
    included: [
      "Treinamento pré-voo completo",
      "Cabine premium com assentos ergonômicos",
      "Equipe dedicada durante toda a jornada",
      "Registro de vídeo e fotos",
      "Kit de viagem BuyShip",
    ],
    requirements: [
      "Idade mínima: 18 anos",
      "Apto médico para voo (exame cardiológico)",
      "Treinamento obrigatório (incluído)",
      "Documento válido (passaporte/ID)",
    ],
    itinerary: [
      {
        title: "Dia 1 — Check-in e preparação",
        description:
          "Boas-vindas, brief de missão, ajustes de traje e avaliações rápidas de segurança.",
      },
      {
        title: "Dia 2 — Treinamento e simulações",
        description:
          "Simulações de cabine, procedimentos de decolagem e protocolo de emergência com instrutores.",
      },
      {
        title: "Dia 3 — Decolagem e experiência orbital",
        description:
          "Embarque, decolagem assistida, janela panorâmica e retorno com acompanhamento da equipe.",
      },
    ],
    faq: [
      {
        q: "O cancelamento é garantido em caso de clima?",
        a: "Sim. Em caso de condições climáticas desfavoráveis, reagendamos sem custo adicional.",
      },
      {
        q: "Posso levar acompanhante?",
        a: "A experiência é individual por assento. Acompanhantes podem participar do check-in e áreas autorizadas.",
      },
      {
        q: "O que acontece se eu ficar ansioso durante o voo?",
        a: "A equipe é treinada para suporte e condução. O treinamento prévio reduz muito a chance de desconforto.",
      },
    ],
  },
  {
    id: "2",
    slug: "suborbital-adventure",
    title: "Aventura Suborbital",
    price: 19900,
    description:
      "Experiência suborbital de alta performance com gravidade zero, ideal para quem deseja sentir o espaço pela primeira vez.",
    heroImageSrc: "/images/experiences/suborbital-adventure.webp",
    durationLabel: "Duração total: 1 dia",
    altitudeLabel: "Perfil: Suborbital (microgravidade)",
    included: [
      "Treinamento rápido (mesmo dia)",
      "Sessão de microgravidade",
      "Registro de vídeo e fotos",
      "Briefing de segurança",
    ],
    requirements: [
      "Idade mínima: 18 anos",
      "Apto médico básico",
      "Peso e altura dentro do limite do assento",
      "Documento válido (passaporte/ID)",
    ],
    itinerary: [
      {
        title: "Manhã — Check-in e briefing",
        description:
          "Apresentação, segurança, instruções práticas e ajuste de traje.",
      },
      {
        title: "Tarde — Voo suborbital",
        description:
          "Decolagem, microgravidade e retorno. Encerramento com entrega de registros.",
      },
    ],
    faq: [
      {
        q: "Essa é uma boa primeira experiência?",
        a: "Sim. É a opção mais indicada para quem quer começar e sentir a microgravidade.",
      },
      {
        q: "Preciso treinar antes?",
        a: "Há um treinamento rápido no mesmo dia, incluso no pacote.",
      },
    ],
  },
];

function SectionTitle({ children }: { children: string }) {
  return <h2 className="text-lg font-semibold text-white">{children}</h2>;
}



export default function ExperiencesDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const experience = experiencesCatalog.find((x) => x.slug === slug);
  const navigate = useNavigate();
  if (!experience) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-14">
        <div className=" border border-white/10 bg-black/60 p-10">
          <h1 className="text-3xl font-bold text-white">
            Experiência não encontrada<span className="text-(--accent) text-2xl relative left-0.5 -bottom-1.5">▪</span>
          </h1>
          <p className="mt-3 text-sm text-white/70">
            Verifique o link ou volte para a lista de experiências.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/" className=" bg-(--primary-active) px-4 py-2 text-sm font-semibold text-black">
              Ir para Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb
        sectionLabel="Experiências"
        sectionTo="/experiences"
        currentLabel={experience?.title ?? "Detalhes"}
      />

      {/* Hero */}
      <header className="overflow-hidden  border border-white/10 bg-black/50">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-70">
            <img
              src={experience.heroImageSrc ?? "/images/experiences/default.webp"}
              alt={experience.title}
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"  
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            {experience.highlight ? (
              <span className="absolute left-6 top-6  bg-(--primary-active) px-3 py-1 text-xs font-semibold text-black">
                Destaque
              </span>
            ) : null}
          </div>

          <div className="p-8 lg:p-10">
            <h1 className="text-4xl font-bold text-white">
              {experience.title}
              <span className="text-(--accent) text-2xl relative left-0.5 -bottom-1.5">▪</span>
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {experience.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className=" border border-white/10 bg-black/40 p-4">
                <p className="text-xs text-white/60">Duração</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {experience.durationLabel ?? "—"}
                </p>
              </div>

              <div className=" border border-white/10 bg-black/40 p-4">
                <p className="text-xs text-white/60">Perfil de voo</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {experience.altitudeLabel ?? "—"}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-white/60">A partir de</p>
                <p className="text-3xl font-bold text-white">
                  {formatBRLFromCents(experience.price)}
                </p>
                <p className="mt-1 text-xs text-white/50">valor único</p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    addToCart({
                      id: experience.id,
                      type: "experience",
                      slug: experience.slug,
                      title: experience.title,
                      price: experience.price,
                    });
                    navigate("/cart");
                  }}
                  className=" bg-(--primary-active) px-6 py-3 font-semibold text-white hover:opacity-90 transition cursor-pointer"
                >
                  Reservar agora
                </button>
                <CTA
                  to="/#contact"
                  variant="outline"
                  label="Falar com consultor"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-6">
          <div className=" border border-white/10 bg-black/50 p-8">
            <SectionTitle>O que está incluso</SectionTitle>
            <ul className="mt-4 grid gap-2 text-sm text-white/75 sm:grid-cols-2">
              {experience.included.map((item) => (
                <li key={item} className=" border border-white/10 bg-black/40 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className=" border border-white/10 bg-black/50 p-8">
            <SectionTitle>Roteiro</SectionTitle>
            <div className="mt-4 space-y-4">
              {experience.itinerary.map((step) => (
                <div
                  key={step.title}
                  className=" border border-white/10 bg-black/40 p-5"
                >
                  <p className="font-semibold text-white">{step.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className=" border border-white/10 bg-black/50 p-8">
            <SectionTitle>Perguntas frequentes</SectionTitle>
            <div className="mt-4 space-y-3">
              {experience.faq.map((f) => (
                <details
                  key={f.q}
                  className="group  border border-white/10 bg-black/40 p-5"
                >
                  <summary className="cursor-pointer list-none text-sm font-semibold text-white">
                    {f.q}
                    <span className="float-right text-white/50 group-open:rotate-180 transition">
                      ▾
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className=" border border-white/10 bg-black/50 p-8">
            <SectionTitle>Requisitos</SectionTitle>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {experience.requirements.map((req) => (
                <li key={req} className=" border border-white/10 bg-black/40 px-4 py-3">
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className=" border border-white/10 bg-black/50 p-8">
            <SectionTitle>Pronto para reservar?</SectionTitle>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Escolha a experiência e finalize em poucos passos. Você pode falar com um consultor
              antes de confirmar.
            </p>

            <div className="mt-6 grid gap-3">
              <CTA
                to={`/checkout?experience=${experience.slug}`}
                variant="primary"
                label="Reservar agora"
              />
              <CTA to="/#contact" variant="outline" label="Tirar dúvidas" />
            </div>

            <p className="mt-4 text-xs text-white/50">
              Ao reservar, você concorda com os termos e políticas de segurança.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}