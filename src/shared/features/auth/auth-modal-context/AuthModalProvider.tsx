import { AuthModalContext, type AuthModalContextValue } from "./context";

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