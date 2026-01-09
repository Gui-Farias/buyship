type ToastProps = {
  open: boolean;
  message: string;
};

export default function Toast({ open, message }: ToastProps) {
  if (!open) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
      <div className="rounded-xl bg-(--accent) px-4 py-3 text-lg text-black shadow-lg">
        {message}
      </div>
    </div>
  );
}