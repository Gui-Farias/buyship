import { supabase } from "@/lib/supabase";
import { useSession } from "@/shared/hooks/useSession";
import Toast from "@/shared/components/toast";
import { useRef, useState } from "react";

type Props = { onOpenLogin: () => void };

export default function LoginOut({ onOpenLogin }: Props) {
  const session = useSession();
  const [showMessage, setShowMessage] = useState('');
  const [showBye, setShowBye] = useState(false);
  const timerRef = useRef<number | null>(null);

  async function handleClick() {
    if (session) {
      await supabase.auth.signOut();
      setShowMessage("Obrigado e volte sempre.");
      setShowBye(true);
      if (timerRef.current) window.clearTimeout(timerRef.current);
       timerRef.current = window.setTimeout(() => setShowBye(false), 2000);
      
      return;
    }
    
    onOpenLogin();
  }

  return (
    <>
    <button onClick={handleClick} className="flex flex-col items-center cursor-pointer" >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" aria-hidden="true" className="min-w-10">
        <path d="M42 56H16c0-10 8-22 18-22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M34 34a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M40 44h10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M46 38l6 6-6 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      {session ? `Sair` : "Login"}
    </button>
    <Toast open={showBye} message={showMessage} />
    </>
  );
}