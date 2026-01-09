import CTA from "@/shared/components/CTA";

type Experience = {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  highlight?: boolean;
};

const experiences: Experience[] = [
  {
  id: "1",
  slug: "orbital-premium",
  title: "Experiência Orbital Premium",
  price: 29900,
  description: "Voo orbital exclusivo com vistas panorâmicas da Terra, cabine de luxo, equipe dedicada e treinamento pré-voo completo.",
  highlight: true,
  },
  {
  id: "2",
  slug: "suborbital-adventure",
  title: "Aventura Suborbital",
  price: 17900,
  description: "Experiência suborbital de alta performance com gravidade zero, ideal para quem deseja sentir o espaço pela primeira vez.",
  },
]

export default function ExperiencesSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-4xl font-bold text-white">
        Experiências<span className="text-(--accent) text-2xl relative left-0.5 -bottom-1.5">▪</span>
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {experiences.map((xp) => (
          <div
            key={xp.id}
            className={` p-8 ${ xp.highlight ? "bg-black ring-1 ring-(--primary-active)" : "bg-black/80" }`}>
            <div className="flex items-center justify-between">
              <h3 className={`text-xl font-semibold ${ xp.highlight ? "text-(--primary-active)" : "text-white" }`}>
                {xp.title}
              </h3>

              <div className="text-right">
                <span className="text-2xl font-bold text-white">
                  R$ {xp.price.toLocaleString("pt-BR")}
                </span>
                <span className="block text-xs">
                  valor único
                </span>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed">
              {xp.description}
            </p>

            <div className="mt-8">
              <CTA
                to={`/experiences/${xp.slug}`}
                variant={xp.highlight ? "primary" : "outline"}
                label="Conhecer experiência"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}