type ShipCardProps = {
  imageSrc: string;
  title: string;
  price: number | string;
  currency?: string;
  onClick?: () => void;
};

export default function ShipCard({
  imageSrc,
  title,
  price,
  currency = "R$",
  onClick,
}: ShipCardProps) {
  const formattedPrice =
    typeof price === "number" ? `${currency} ${price.toLocaleString("pt-BR")}` : `${currency} ${price}`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className="w-full max-w-96 select-none transition-all hover:scale-105"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="overflow-hidden  bg-black/5">
        <img
          src={imageSrc}
          alt={title}
          className={`h-70 px-3 w-full object-contain ${onClick ? "cursor-pointer" : ""}`}
          loading="lazy"
        />
      </div>

      <div className="mt-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2  bg-(--primary-active)" />
          <h3 className="text-base font-semibold text-(--accent)">{title}</h3>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{formattedPrice}</p>
      </div>
    </div>
  );
}