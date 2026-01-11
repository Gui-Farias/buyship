import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "@/assets/BuyShipLogo.png";
import LoginOut from "@/shared/features/auth/components/login-out";

type HeaderProps = {
  onOpenLogin: () => void;
};

export default function Header({ onOpenLogin }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `px-2 py-2 hover:border-b-2 ${
      isActive ? "border-b-2 border-(--primary-active)" : "border-b-2 border-transparent"
    }`;

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMobileOpen(false); // md
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-transparent backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-bold" onClick={() => setMobileOpen(false)}>
          <img src={Logo} alt="BuyShip Logo" className="h-auto w-40 object-contain" />
        </Link>

        {/* NAV desktop */}
        <nav className="hidden flex-1 items-center justify-center gap-6 md:flex">
          <NavLink to="/" className={navClass} end>
            Inicio
          </NavLink>
          <NavLink to="/ships" className={navClass}>
            Naves
          </NavLink>
          <NavLink to="/experiences" className={navClass}>
            Experiencias
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contato
          </NavLink>
        </nav>

        <div className="hidden flex-1 items-center justify-end gap-6 md:flex">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex flex-col items-center cursor-pointer ${isActive ? "text-amber-500" : ""}`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden="true"
              className="min-w-10"
            >
              <path
                d="M8 12h8l6 32h28l6-22H18"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24 52a4 4 0 1 0 0-.01"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M46 52a4 4 0 1 0 0-.01"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Carrinho
          </NavLink>

          <LoginOut onOpenLogin={onOpenLogin} />
        </div>

        {/* Botão hambúrguer (mobile) */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-black/30 p-2 text-white md:hidden"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen ? (
        <div className="md:hidden">
          <div className="mx-auto max-w-6xl px-4 pb-4">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-3 backdrop-blur">
              <nav className="grid gap-1">
                <NavLink to="/" className={navClass} end onClick={() => setMobileOpen(false)}>
                  Inicio
                </NavLink>
                <NavLink to="/ships" className={navClass} onClick={() => setMobileOpen(false)}>
                  Naves
                </NavLink>
                <NavLink to="/experiences" className={navClass} onClick={() => setMobileOpen(false)}>
                  Experiencias
                </NavLink>
                <NavLink to="/contact" className={navClass} onClick={() => setMobileOpen(false)}>
                  Contato
                </NavLink>
              </nav>

              <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                <NavLink
                  to="/cart"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-xl px-3 py-2 ${
                      isActive ? "text-amber-500" : "text-white"
                    } hover:bg-white/5`
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    viewBox="0 0 64 64"
                    fill="none"
                    aria-hidden="true"
                    className="min-w-7"
                  >
                    <path
                      d="M8 12h8l6 32h28l6-22H18"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M24 52a4 4 0 1 0 0-.01"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M46 52a4 4 0 1 0 0-.01"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Carrinho
                </NavLink>

                <div className="flex items-center justify-end">
                  <LoginOut onOpenLogin={onOpenLogin} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}