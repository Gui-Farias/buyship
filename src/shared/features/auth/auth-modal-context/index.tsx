import { createContext, useContext } from "react";

type AuthModalContextValue = {
  openLogin: () => void;
  openRegister: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({
  value,
  children,
}: {
  value: AuthModalContextValue;
  children: React.ReactNode;
}) {
  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
}