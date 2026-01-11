import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/shared/components/header";
import AuthModal from "@/shared/features/auth/components/auth-modal";
import Footer from "@/shared/components/footer";
import ScrollTop from "@/shared/components/scrollTop";

export default function AppShell() {
  const [authOpen, setAuthOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen min-w-screen bg-(--accent-2-soft) text-blac">
      <Header
        onOpenLogin={() => {
          setMode("login");
          setAuthOpen(true);
        }}
      />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>

      <AuthModal
        open={authOpen}
        initialMode={mode}
        onClose={() => setAuthOpen(false)}
      />
      
      <ScrollTop />
      <Footer/>
    </div>
  );
}