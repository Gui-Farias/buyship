import { describe, it, expect } from "vitest";
import { getErrorMessage } from "./index";

describe("getErrorMessage", () => {
  it("retorna message quando for Error", () => {
    const err = new Error("Erro padrão");
    expect(getErrorMessage(err)).toBe("Erro padrão");
  });

  it("retorna a string quando o erro for string", () => {
    expect(getErrorMessage("Erro em string")).toBe("Erro em string");
  });

  it("retorna message quando for objeto com message string", () => {
    const err = { message: "Erro no objeto" };
    expect(getErrorMessage(err)).toBe("Erro no objeto");
  });

  it("retorna fallback quando objeto tem message não-string", () => {
    const err = { message: 123 };
    expect(getErrorMessage(err)).toBe("Ocorreu um erro inesperado");
  });

  it("retorna fallback quando erro for null", () => {
    expect(getErrorMessage(null)).toBe("Ocorreu um erro inesperado");
  });

  it("retorna fallback customizado quando informado", () => {
    expect(getErrorMessage(undefined, "Fallback custom"))
      .toBe("Fallback custom");
  });
});