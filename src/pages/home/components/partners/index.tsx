const partners = [
  { name: "Ranek", logoSrc: "https://placehold.co/300x150?text=Ranek" },
  { name: "Caravan", logoSrc: "https://placehold.co/300x150?text=Caravan" },
  { name: "Dogs", logoSrc: "https://placehold.co/300x150?text=Dogs" },
  { name: "Handel", logoSrc: "https://placehold.co/300x150?text=Handel" },
  { name: "Surfbot", logoSrc: "https://placehold.co/300x150?text=Surfbot" },
  { name: "Wildbeast", logoSrc: "https://placehold.co/300x150?text=Wildbeast" },
  { name: "FlexBlog", logoSrc: "https://placehold.co/300x150?text=FlexBlog" },
  { name: "LeScone", logoSrc: "https://placehold.co/300x150?text=LeScone" },
];

function PartnerLogoCell({ name, logoSrc } : {name: string; logoSrc: string; }) {
  return (
    <div className="flex items-center justify-center border border-(--primary) px-2 py-8">
      <img
        src={logoSrc}
        alt={`Logo ${name}`}
        className="h-16 w-auto min-w-56 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0 hover:scale-150"
        loading="lazy"
        title={`Logo ${name}`}
      />
    </div>
  );
}

export default function PartnersSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <h2 className="text-4xl font-bold">
        Nossos parceiros<span className="text-(--accent) text-2xl relative left-0.5 -bottom-1.5">▪</span>
      </h2>

      <div className="mt-8 border border-(--primary)">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {partners.map((p) => (
            <PartnerLogoCell key={p.name} name={p.name} logoSrc={p.logoSrc} />
          ))}
        </div>
      </div>
    </section>
  );
}