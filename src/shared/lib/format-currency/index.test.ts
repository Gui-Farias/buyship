import { describe, it, expect } from "vitest";
import { formatBRLFromCents } from "./index";

describe("Formatar valores em BRL", () => {
  it("formata corretamente valores em BRL", () => {
    expect(formatBRLFromCents(29900)).toContain("R$ 299,00");
    expect(formatBRLFromCents(1)).toContain("R$ 0,01");
  });
});
