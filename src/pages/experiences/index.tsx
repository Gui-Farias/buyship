import { useMemo, useState } from "react";
import CTA from "@/shared/components/CTA";
import Highlight from "../home/components/highlight";
import { useNavigate } from "react-router-dom";
import { formatBRLFromCents } from "@/shared/lib/format-currency";

type Experience = {
  id: string;
  slug: string;
  title: string;
  price: number;
  description: string;
  highlight?: boolean;
  category: "orbital" | "suborbital";
  bullets: string[];
};

const experiences: Experience[] = [
  {
    id: "1",
    slug: "orbital-premium",
    title: "Experiência Orbital Premium",
    price: 29900,
    description: "Um pacote completo para viver o espaço com conforto e segurança. Inclui treinamento com instrutores, protocolos de missão e uma janela panorâmica para observação da Terra. Ideal para quem quer a experiência mais exclusiva, com suporte dedicado e detalhes premium do início ao fim.",
    highlight: true,
    category: "orbital",
    bullets: [
      "Treinamento pré-voo + simulações de cabine",
      "Vista panorâmica da Terra em órbita baixa (LEO)",
      "Cabine premium e equipe dedicada",
      "Hospedagem e logística do programa inclusas",
      "Registro profissional de fotos e vídeo",
    ],
  },
  {
    id: "2",
    slug: "suborbital-adventure",
    title: "Aventura Suborbital",
    price: 19900,
    description: "Perfeita para a primeira vez. Um voo suborbital de alta performance com sessão de microgravidade, briefing completo e preparação no mesmo dia. Uma experiência intensa, com foco em sensação de voo e gravidade zero — sem perder o conforto e o acompanhamento da equipe.",
    category: "suborbital",
    bullets: [
      "Briefing de segurança e preparação no mesmo dia",
      "Sessão de microgravidade (gravidade zero)",
      "Rota suborbital com visual da curvatura da Terra",
      "Acompanhamento de equipe e suporte em solo",
      "Registro de fotos e vídeo da experiência",
    ],
  },
];

type FilterValue = "all" | Experience["category"];


function FilterPills({ value, onChange }: {
  value: FilterValue;
  onChange: (v: FilterValue) => void;
}) {
  const options: { value: FilterValue; label: string }[] = [
    { value: "all", label: "Todas" },
    { value: "orbital", label: "Orbital" },
    { value: "suborbital", label: "Suborbital" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={[
              "h-10  px-4 text-sm font-semibold transition cursor-pointer",
              "border",
              active
                ? "border-(--primary-active) bg-(--primary-active) text-black"
                : "border-white/15 bg-black/40 text-white/80 hover:bg-white/5",
            ].join(" ")}>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default function ExperiencesPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterValue>("all");
  const filtered = useMemo(() => {
    if (filter === "all") return experiences;
    return experiences.filter((xp) => xp.category === filter);
  }, [filter]);

  return (
    <main>
      <Highlight />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-4xl font-bold text-white">
              Experiências<span className="text-(--accent) text-2xl relative left-0.5 -bottom-1.5">▪</span>
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Explore nossos pacotes e veja o que está incluso em cada experiência.
            </p>
          </div>

          <FilterPills value={filter} onChange={setFilter} />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filtered.map((xp) => (
            <article
              key={xp.id}
              className={[
                " p-8 flex flex-col justify-between shadow-lg cursor-pointer transition-all hover:scale-105 hover:shadow-2xl",
                xp.highlight
                  ? "bg-black ring-1 ring-(--primary-active)"
                  : "bg-black/80 border border-white/10",
              ].join(" ")}onClick={() => navigate(`/experiences/${xp.slug}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    navigate(`/experiences/${xp.slug}`);
                  }
                }}>
              <div className="flex flex-col justify-between">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3
                    className={[
                      "text-xl font-semibold",
                      xp.highlight ? "text-(--primary-active)" : "text-white",
                    ].join(" ")} >
                    {xp.title}
                  </h3>

                  <p className="mt-2 text-xs text-white/60">
                    Categoria:{" "}
                    <span className="font-semibold text-white/80">
                      {xp.category === "orbital" ? "Orbital" : "Suborbital"}
                    </span>
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-xs text-white/60">A partir de</p>
                  <p className="text-2xl font-bold text-white">
                    {formatBRLFromCents(xp.price)}
                  </p>
                  <p className="text-xs text-white/50">valor único</p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-white/70">
                {xp.description}
              </p>

              <ul className="mt-6 space-y-2 text-sm text-white/75">
                {xp.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0  bg-(--primary-active)" aria-hidden />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row ">
                <CTA
                  to={`/experiences/${xp.slug}`}
                  variant={xp.highlight ? "primary" : "outline"}
                  label="Conhecer experiência"
                />
                <CTA to="/contact" variant="outline" label="Tirar dúvidas" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}