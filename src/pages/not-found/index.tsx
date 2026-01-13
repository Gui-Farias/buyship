import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-4 text-center text-white">
      <h1 className="text-6xl font-bold">
        404
        <span className="text-(--accent) text-3xl relative left-1 -bottom-2">
          ▪
        </span>
      </h1>

      <p className="mt-4 text-lg text-white/80">
        Página não encontrada
      </p>

      <p className="mt-2 max-w-md text-sm text-white/60">
        O endereço que você tentou acessar não existe ou foi movido.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex h-11 items-center justify-center bg-black px-6 text-sm font-semibold text-white hover:opacity-90"
        >
          Voltar para Home
        </Link>

        <Link
          to="/experiences"
          className="inline-flex h-11 items-center justify-center border border-white/15 px-6 text-sm font-semibold text-white/80 hover:bg-white/5"
        >
          Ver experiências
        </Link>
      </div>
    </main>
  );
}