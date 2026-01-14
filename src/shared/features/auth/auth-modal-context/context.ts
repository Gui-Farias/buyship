import { createContext } from "react";

export type AuthModalContextValue = {
  openLogin: () => void;
  openRegister: () => void;
};

export const AuthModalContext = createContext<AuthModalContextValue | null>(null);