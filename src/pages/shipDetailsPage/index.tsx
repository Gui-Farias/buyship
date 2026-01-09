import { useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import BreadcrumbFromUrl from "@/shared/components/Breadcrumb";
import CTA from "@/shared/components/CTA";
import { addToCart } from "@/shared/lib/cart";

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
      speed: "3.100 km/h (atmosfera)",
      weight: "22.300 kg",
      width: "9,1 m",
      capacity: "18 t",
      range: "4.800 km",
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
      speed: "2.900 km/h (atmosfera)",
      weight: "24.100 kg",
      width: "9,8 m",
      capacity: "16 t",
      range: "5.100 km",
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
      speed: "3.600 km/h (atmosfera)",
      weight: "27.900 kg",
      width: "10,4 m",
      capacity: "8 t (config luxo)",
      range: "6.000 km",
    },
  },
];


function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function tierLabel(tier: Ship["tier"]) {
  if (tier === "entry") return "Entry";
  if (tier === "premium") return "Premium";
  return "Elite";
}

export default function ShipDetailsPage() {
  const { slug } = useParams<{ slug: string }>();

  const ship = useMemo(() => ships.find((s) => s.slug === slug), [slug]);

  const gallery = useMemo(() => {
    if (!ship) return [];
    return [ship.imageSrc, ship.imageSrc, ship.imageSrc];
  }, [ship]);

  const [activeImage, setActiveImage] = useState(0);

  if (!ship) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold text-(--accent)">Nave não encontrada</h1>
        <p className="mt-3 text-muted-foreground">
          Verifique o link ou volte para a listagem.
        </p>
        <Link to="/ships" className="mt-6 inline-flex underline">
          Voltar para Ships
        </Link>
      </div>
    );
  }

  const isHighlight = Boolean(ship.highlight);
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <BreadcrumbFromUrl sectionLabel="Ships" sectionTo="/ships" currentLabel={ship.name} />

      <div className="mt-6 flex flex-col gap-10 lg:flex-row">
        {/* Galeria */}
        <div className="flex-1">
          <div className="overflow-hidden  bg-black/5 flex items-center justify-center">
            <img
              src={gallery[activeImage]}
              alt={ship.name}
              className="h-105 w-4/5 object-contain"
            />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {gallery.map((src, idx) => (
              <button
                key={`${src}-${idx}`}
                type="button"
                onClick={() => setActiveImage(idx)}
                className={[
                  "overflow-hidden  bg-black/5 ring-1 transition flex items-center justify-center",
                  idx === activeImage ? "ring-(--primary-active)" : "ring-black/10 hover:ring-black/20",
                ].join(" ")}
              >
                <img
                  src={src}
                  alt={ship.name}
                  className="h-28 w-4/5 object-contain"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Infos */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-(--accent)">{ship.name}</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Categoria: <span className="font-semibold">{tierLabel(ship.tier)}</span>
                {isHighlight ? (
                  <span className="ml-2  bg-(--primary-active)/15 px-2 py-0.5 text-xs font-semibold text-(--primary-active)">
                    Destaque
                  </span>
                ) : null}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-xs text-muted-foreground">A partir de</p>
              <p className="text-2xl font-bold text-(--accent)">{formatBRL(ship.priceFrom)}</p>
              <p className="text-xs text-muted-foreground">estimativa</p>
            </div>
          </div>

          <p className="mt-4 text-lg text-muted-foreground">{ship.description}</p>

          {/* Cards rápidos (capacidade/autonomia) */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className=" border border-black/10 bg-black/5 p-4">
              <p className="text-xs text-muted-foreground">Capacidade</p>
              <p className="mt-1 text-sm font-semibold text-(--accent)">
                {ship.capacityLabel}
              </p>
            </div>

            <div className=" border border-black/10 bg-black/5 p-4">
              <p className="text-xs text-muted-foreground">Autonomia</p>
              <p className="mt-1 text-sm font-semibold text-(--accent)">
                {ship.rangeLabel}
              </p>
            </div>
          </div>

          {/* Features */}
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
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

          {/* Specs */}
          <div className="mt-8  border border-black/10 p-6">
            <h2 className="text-lg font-semibold text-(--accent)">Especificações</h2>

            <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-muted-foreground">Velocidade</dt>
                <dd className="font-medium">{ship.specs.speed}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Peso</dt>
                <dd className="font-medium">{ship.specs.weight}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Largura</dt>
                <dd className="font-medium">{ship.specs.width}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Capacidade</dt>
                <dd className="font-medium">{ship.specs.capacity}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Alcance</dt>
                <dd className="font-medium">{ship.specs.range}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                addToCart({
                  id: ship.id,
                  type: "ship",
                  slug: ship.slug,
                  title: ship.name,
                  price: ship.priceFrom,
                  imageSrc: ship.imageSrc,
                });
                navigate("/cart");
              }}
              className=" bg-(--primary-active) px-6 py-3 font-semibold text-white hover:opacity-90 transition cursor-pointer"
            >
              Adicionar ao carrinho
            </button>

            <CTA to="/contact" variant="outline" label="Falar com consultor" />

            <Link
              to="/experiences"
              className=" border border-(--primary-active) px-6 py-3 font-semibold text-(--primary-active) hover:bg-(--primary-active)/10 transition"
            >
              Conhecer nossas experiências!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}