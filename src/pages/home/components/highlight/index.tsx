// src/pages/home/components/TestimonialSection.tsx

type TestimonialSectionProps = {
  imageSrc: string;
  imageAlt?: string;
  quote: string;
  author: string;
};

const highlightProps: TestimonialSectionProps = {
  imageSrc: "/buyShipCompany.webp",
  imageAlt: "BuyShip spacecrafts for sale",
  quote: "Viajar pelo espaço sempre foi um sonho distante. A BuyShip transformou isso em uma experiência real, segura e inesquecível. Cada detalhe da nave e do atendimento elevou completamente a experiência.",
  author: "Gui Farias — Experiência Orbital Premium",
};

export default function Highlight() {
  const { imageSrc, imageAlt = "", quote, author } = highlightProps;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid overflow-hidden  lg:grid-cols-2">
        <div className="h-full">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="relative flex items-center bg-(--primary-active) px-10 py-12 text-(--accent)">
          <span aria-hidden className="absolute left-8 top-8 text-7xl font-bold opacity-40">
            “
          </span>

          <div className="max-w-md">
            <blockquote className="text-xl font-medium leading-relaxed">
              {quote}
            </blockquote>

            <cite className="mt-6 block text-sm font-semibold not-italic">
              {author}
            </cite>
          </div>

          <span aria-hidden className="absolute bottom-8 right-8 text-7xl font-bold opacity-40">
            ”
          </span>
        </div>
      </div>
    </section>
  );
}