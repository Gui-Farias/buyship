import { useMemo, useState } from "react";
import Modal from "@/shared/components/modal";
import { supabase } from "@/lib/supabase";

type AuthMode = "login" | "register";

type AuthModalProps = {
  open: boolean;
  initialMode?: AuthMode;
  onClose: () => void;
  onAuthed?: () => void;
};

export default function AuthModal({
  open,
  initialMode = "login",
  onClose,
  onAuthed
}: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const title = useMemo(
    () => (mode === "login" ? "Entrar" : "Criar conta"),
    [mode]
  );

  return (
    <Modal open={open} title={title} onClose={onClose}>
      {mode === "login" ? (
        <LoginForm
          onGoRegister={() => setMode("register")}
          onSuccess={() => {
            onAuthed?.();
            onClose();
          }}
        />
      ) : (
        <RegisterForm
          onGoLogin={() => setMode("login")}
          onSuccess={() => {
            onAuthed?.();
            onClose();
          }}
        />
      )}
    </Modal>
  );
}

function LoginForm({
  onGoRegister,
  onSuccess
}: {
  onGoRegister: () => void;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    onSuccess();
  }

  return (
    <form className="space-y-3" onSubmit={handleLogin}>
      <input
        className="w-full border px-3 py-2"
        placeholder="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full border px-3 py-2"
        placeholder="Senha"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : null}

      <button
        type="submit"
        className="w-full bg-black px-4 py-2 cursor-pointer text-white disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>

      <button
        type="button"
        onClick={onGoRegister}
        className="w-full px-4 py-2 cursor-pointer hover:bg-black/5"
        disabled={loading}
      >
        Não tem conta? Criar agora
      </button>
    </form>
  );
}

function RegisterForm({
  onGoLogin,
  onSuccess
}: {
  onGoLogin: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { name: name.trim() }
      }
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }
    if (!data.session) {
      setInfo("Conta criada. Verifique seu e-mail para confirmar o cadastro.");
      return;
    }

    onSuccess();
  }

  return (
    <form className="space-y-3" onSubmit={handleRegister}>
      <input
        className="w-full border px-3 py-2"
        placeholder="Nome"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="w-full border px-3 py-2"
        placeholder="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full border px-3 py-2"
        placeholder="Senha"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={6}
        required
      />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {info ? <p className="text-sm text-green-700">{info}</p> : null}

      <button
        type="submit"
        className="w-full bg-black px-4 py-2 cursor-pointer text-white disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Criando..." : "Criar conta"}
      </button>

      <button
        type="button"
        onClick={onGoLogin}
        className="w-full px-4 py-2 cursor-pointer hover:bg-black/5"
        disabled={loading}
      >
        Já tem conta? Entrar
      </button>
    </form>
  );
}