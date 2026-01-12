import { Link } from "react-router-dom";

type FooterLink = { label: string; to: string };

type FooterProps = {
  brand?: string;
  phone?: string;
  email?: string;
  addressLine1?: string;
  addressLine2?: string;
  links?: FooterLink[];
};

export default function Footer({
  brand = "BuyShip",
  phone = "+55 11 910529070",
  email = "gui.farias@outlook.com.br",
  addressLine1 = "Av. Orbital, 9070 - Centro",
  addressLine2 = "São Paulo - SP",
  links = [
    { label: "Naves", to: "/ships" },
    { label: "Experiencias", to: "/experiences" },
    { label: "Contato", to: "/contact" },
    { label: "Carrinho", to: "/cart" },
  ],
}: FooterProps) {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="text-2xl font-bold tracking-tight">{brand}</div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white/80">
              CONTATO
            </h3>

            <div className="mt-4 space-y-2 text-sm text-white/70">
              <p>{phone}</p>
              <p>{email}</p>

              <div className="my-4 h-px w-full bg-white/10" />

              <p>{addressLine1}</p>
              <p>{addressLine2}</p>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="p-2 text-white/70 transition hover:text-white hover:bg-white/10"
              >
                <InstagramIcon />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="p-2 text-white/70 transition hover:text-white hover:bg-white/10"
              >
                <FacebookIcon />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="p-2 text-white/70 transition hover:text-white hover:bg-white/10"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white/80">
              INFORMAÇÕES
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-white/70 transition hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-white/10" />

        <p className="mt-6 text-xs text-white/60">
          {brand} © {new Date().getFullYear()} Alguns direitos reservados.
        </p>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M17.5 6.5h.01"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14 8h3V5h-3a4 4 0 0 0-4 4v3H7v3h3v7h3v-7h3l1-3h-4V9a1 1 0 0 1 1-1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M21 8.2a3 3 0 0 0-2.1-2.1C17.1 5.6 12 5.6 12 5.6s-5.1 0-6.9.5A3 3 0 0 0 3 8.2 31.5 31.5 0 0 0 2.6 12c0 1.3.1 2.6.4 3.8a3 3 0 0 0 2.1 2.1c1.8.5 6.9.5 6.9.5s5.1 0 6.9-.5a3 3 0 0 0 2.1-2.1c.3-1.2.4-2.5.4-3.8 0-1.3-.1-2.6-.4-3.8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M10.5 9.5 15.5 12l-5 2.5V9.5Z"
        fill="currentColor"
      />
    </svg>
  );
}