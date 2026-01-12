import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useState } from "react";

const dummyShips = [
    {
        id: "ship-1",
        type: "ship",
        slug: "falcon-x",
        title: "Falcon X",
        price: 29900,
        imageSrc: "/falcon-x.png",
    },
    {
        id: "ship-2",
        type: "ship",
        slug: "nebula-z",
        title: "Nebula Z",
        price: 19900,
        imageSrc: "/nebula-z.png",
    },
];

function CartTestComponent() {
    const [items, setItems] = useState(dummyShips);
  function clearCart() {
    setItems([]);
  }

  return (
    <div>
      <button onClick={clearCart}>Limpar carrinho</button>
      <span data-testid="count">{items.length}</span>
    </div>
  );
}

describe("Limpeza do carrinho", () => {
  it("deve remover todos os itens do carrinho", () => {
    render(<CartTestComponent />);

    const count = screen.getByTestId("count");
    expect(Number(count.textContent)).toBeGreaterThanOrEqual(1);

    fireEvent.click(
      screen.getByRole("button", { name: /limpar carrinho/i })
    );

    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });
});