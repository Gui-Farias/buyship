export function getErrorMessage(e: unknown, fallback = "Ocorreu um erro inesperado") {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;

  if (e && typeof e === "object" && "message" in e) {
    const msg = (e as { message?: unknown }).message;
    if (typeof msg === "string") return msg;
  }

  return fallback;
}