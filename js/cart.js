// Del B: createCart() med closure. Se README.
//
// En closure är en funktion som minns variablerna från där den skapades.
// createCart skapar variabeln lines. Funktionerna som returneras (add, remove ...)
// kan läsa och byta ut den, men ingen utanför varukorgen kommer åt den direkt.
//
// TODO: importera din subtotal från receipt.js, du behöver den i total().
import { subTotal } from "./receipt.js";

export const createCart = (products) => {
  let lines = [];

  const add = (productId, quantity = 1) => {
    if (!products.some((p) => p.id === productId)) {
      throw new Error(`Okänd produkt: ${productId}`);
    }

    const existing = lines.find((l) => l.productId === productId);

    if (existing) {
      lines = lines.map((l) =>
        l.productId === productId
          ? { ...l, quantity: l.quantity + quantity }
          : l,
      );
    } else {
      lines = [...lines, { productId, quantity }];
    }
  };

  const remove = (productId) => {
    lines = lines.filter((l) => l.productId !== productId);
  };

  return {
    add,
    remove,
    lines: () => lines.map((l) => ({ ...l })),
    total: () => subTotal(lines, products),
  };
};
