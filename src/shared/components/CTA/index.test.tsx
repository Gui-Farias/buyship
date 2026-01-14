import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from "react-router-dom";
import CTA from "./index.tsx";

describe('CTA Component', () => {
  it('Deve renderizar o CTA com o label e link corretos', () => {
    render(<CTA label="Comprar" to="/cart" />, { wrapper: MemoryRouter });
    const link = screen.getByRole('link', { name: /Comprar/i });
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/cart');
  });
});