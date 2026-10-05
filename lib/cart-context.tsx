"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { CartLine, MenuItem } from "@/lib/types";

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  addItem: (item: MenuItem, quantity?: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: lines.reduce((sum, line) => sum + line.item.price * line.quantity, 0),
      addItem: (item, quantity = 1) =>
        setLines((current) =>
          current.some((line) => line.item.id === item.id)
            ? current.map((line) =>
                line.item.id === item.id ? { ...line, quantity: line.quantity + quantity } : line,
              )
            : [...current, { item, quantity }],
        ),
    }),
    [lines],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider.");
  return context;
}
