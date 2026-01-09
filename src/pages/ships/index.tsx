import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CTA from "@/shared/components/CTA";

type Ship = {
  id: string;
  slug: string;
  name: string;
  tier: "entry" | "premium" | "elite";
  priceFrom: number; 
  description: string;
  imageSrc: string; 
  features: string[];
  capacityLabel: string;
  rangeLabel: string;
  highlight?: boolean;
  specs: {
    speed: string;
    weight: string;
    width: string;
    capacity: string;
    range: string;
  };
};

const ships: Ship[] = [
  {
    id: "s1",
    slug: "magic-might",
    name: "Magic Might",
    tier: "entry",
    priceFrom: 149900,
    description:
      "A porta de entrada para a BuyShip. Design ágil, cabine confortável e excelente custo-benefício para rotas suborbitais e treinos avançados.",
    imageSrc: "/naves/nave01.webp",
    capacityLabel: "Capacidade: 2–4 passageiros",
    rangeLabel: "Autonomia: 2.000 km (perfil suborbital)",
    features: [
      "Cabine pressurizada com controle climático",
      "Assentos ergonômicos e isolamento acústico",
      "Painel de navegação assistida (autopilot)",
      "Kit de segurança e suporte de missão",
    ],
    specs: {
      speed: "2.400 km/h (atmosfera)",
      weight: "18.500 kg",
      width: "8,2 m",
      capacity: "12 t",
      range: "3.200 km",
    },
  },
  {
    id: "s2",
    slug: "nimbus-stark",
    name: "Nimbus Stark",
    tier: "premium",
    priceFrom: 249900,
    description:
      "Equilíbrio perfeito entre performance e luxo. Ideal para experiências suborbitais com microgravidade prolongada e observação panorâmica.",
    imageSrc: "/naves/nave02.webp",
    capacityLabel: "Capacidade: 4–6 passageiros",
    rangeLabel: "Autonomia: 3.500 km (suborbital estendido)",
    features: [
      "Janela panorâmica com proteção térmica",
      "Módulo de conforto premium (iluminação e som)",
      "Telemetria em tempo real com equipe em solo",
      "Espaço otimizado para microgravidade",
    ],
    highlight: true,
    specs: {
      speed: "2.400 km/h (atmosfera)",
      weight: "18.500 kg",
      width: "8,2 m",
      capacity: "12 t",
      range: "3.200 km",
    },
  },
  {
    id: "s3",
    slug: "orion-suite",
    name: "Orion Suite",
    tier: "premium",
    priceFrom: 329900,
    description:
      "Cabine ampla com foco em experiência premium. Mais espaço interno e uma condução extremamente estável para voos de alta suavidade.",
    imageSrc: "/naves/nave01.webp",
    capacityLabel: "Capacidade: 6 passageiros",
    rangeLabel: "Autonomia: 4.000 km (suborbital + cruzeiro)",
    features: [
      "Cabine ampla com layout modular",
      "Estabilização avançada para pouso suave",
      "Sistema redundante de oxigênio e energia",
      "Ambiente premium (acabamento e iluminação)",
    ],
    specs: {
      speed: "2.400 km/h (atmosfera)",
      weight: "18.500 kg",
      width: "8,2 m",
      capacity: "12 t",
      range: "3.200 km",
    },
  },
  {
    id: "s4",
    slug: "nebula-cosmic",
    name: "Nebula Cosmic",
    tier: "elite",
    priceFrom: 499900,
    description:
      "Top de linha BuyShip. Engenharia de missão, máxima redundância e recursos avançados para os perfis mais exigentes e imersivos.",
    imageSrc: "/naves/nave03.webp",
    capacityLabel: "Capacidade: 6–8 passageiros",
    rangeLabel: "Autonomia: missão avançada (perfil estendido)",
    features: [
      "Redundância completa de sistemas críticos",
      "Suite de missão com monitoramento avançado",
      "Módulo de conforto elite (premium+)",
      "Preparada para perfis de voo estendidos",
    ],
    specs: {
      speed: "2.400 km/h (atmosfera)",
      weight: "18.500 kg",
      width: "8,2 m",
      capacity: "12 t",
      range: "3.200 km",
    },
  },
];

type FilterValue = "all" | Ship["tier"];

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function FilterPills({
  value,
  onChange,
}: {
  value: FilterValue;
  onChange: (v: FilterValue) => void;
}) {
  const options: { value: FilterValue; label: string }[] = [
    { value: "all", label: "Todas" },
    { value: "entry", label: "Entry" },
    { value: "premium", label: "Premium" },
    { value: "elite", label: "Elite" },
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
            ].join(" ")}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default function ShipsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterValue>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return ships;
    return ships.filter((s) => s.tier === filter);
  }, [filter]);

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-4xl font-bold text-white">
              Naves<span className="text-(--accent) text-2xl relative left-0.5 -bottom-1.5">▪</span>
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Compare os modelos e escolha a nave ideal para sua próxima jornada.
            </p>
          </div>

          <FilterPills value={filter} onChange={setFilter} />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filtered.map((ship) => {
            const isHighlight = Boolean(ship.highlight);

            return (
              <article
                key={ship.id}
                className={[
                  "overflow-hidden  cursor-pointer transition hover:scale-[1.01]",
                  isHighlight
                    ? "bg-black ring-1 ring-(--primary-active)"
                    : "bg-black/80 border border-white/10",
                ].join(" ")}
                onClick={() => navigate(`/ships/${ship.slug}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    navigate(`/ships/${ship.slug}`);
                  }
                }}>
                <div className="h-48 w-full bg-black/40 flex justify-center">
                  <img
                    src={ship.imageSrc}
                    alt={ship.name}
                    className="h-full w-4/5 object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="p-8">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3
                        className={[
                          "text-xl font-semibold",
                          isHighlight ? "text-(--primary-active)" : "text-white",
                        ].join(" ")} >
                        {ship.name}
                      </h3>

                      <p className="mt-2 text-xs text-white/60">
                        Categoria:{" "}
                        <span className="font-semibold text-white/80">
                          {ship.tier === "entry"
                            ? "Entry"
                            : ship.tier === "premium"
                            ? "Premium"
                            : "Elite"}
                        </span>
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-xs text-white/60">A partir de</p>
                      <p className="text-2xl font-bold text-white">
                        {formatBRL(ship.priceFrom)}
                      </p>
                      <p className="text-xs text-white/50">estimativa</p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-white/70">
                    {ship.description}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className=" border border-white/10 bg-black/40 p-4">
                      <p className="text-xs text-white/60">Capacidade</p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {ship.capacityLabel}
                      </p>
                    </div>

                    <div className=" border border-white/10 bg-black/40 p-4">
                      <p className="text-xs text-white/60">Autonomia</p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {ship.rangeLabel}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-2 text-sm text-white/75">
                    {ship.features.map((f) => (
                      <li key={f} className="flex gap-3">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0  bg-(--primary-active)"
                          aria-hidden
                        />
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <CTA
                      to={`/ships/${ship.slug}`}
                      variant={isHighlight ? "primary" : "outline"}
                      label="Ver detalhes"
                    />
                    <CTA to="/contact" variant="outline" label="Falar com consultor" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}