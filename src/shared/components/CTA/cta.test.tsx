import { render, screen } from "@testing-library/react";

function Button({ children }: { children: React.ReactNode }) {
  return <button>{children}</button>;
}

test("renderiza o texto do botão", () => {
  render(<Button>Comprar</Button>);
  expect(screen.getByRole("button", { name: /comprar/i })).toBeInTheDocument();
});
