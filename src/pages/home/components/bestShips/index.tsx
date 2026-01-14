// src/pages/home/components/FeaturedShips.tsx
import { useNavigate } from "react-router-dom";
import ShipCard from "./card";

type FeaturedShip = {
  id: string;
  slug: string;
  imageSrc: string;
  title: string;
  price: number;
};

const featured: FeaturedShip[] = [
  { id: "1", slug: "magic-might", imageSrc: "/naves/nave01.webp", title: "Magic Might", price: 19999 },
  { id: "2", slug: "nimbus-stark", imageSrc: "/naves/nave02.webp", title: "Nimbus Stark", price: 32999 },
  { id: "3", slug: "nebula-cosmic", imageSrc: "/naves/nave03.webp", title: "Nebula Cosmic", price: 69999 },
];

export default function FeaturedShips() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-4xl font-bold">
        Escolha a sua<span className="text-(--accent) text-2xl relative left-0.5 -bottom-1.5">▪</span>
      </h2>

      <div className="mt-8 flex gap-6 justify-between">
        {featured.map((ship) => (
          <ShipCard
            key={ship.id}
            imageSrc={ship.imageSrc}
            title={ship.title}
            price={ship.price}
            onClick={() => navigate(`/ships/${ship.slug}`)}
          />
        ))}
      </div>
    </section>
  );
}