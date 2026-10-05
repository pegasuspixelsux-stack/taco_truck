"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, ShoppingCart, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { formatPrice } from "@/lib/utils";
import type { MenuItem } from "@/lib/types";

export function MenuItemCard({
  item,
  currency,
  onAddToCart,
}: {
  item: MenuItem;
  currency: string;
  onAddToCart: (item: MenuItem, quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timeout = setTimeout(() => setAdded(false), 1200);
    return () => clearTimeout(timeout);
  }, [added]);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="group flex overflow-hidden rounded-2xl border border-slate-800/80 bg-surface transition-colors duration-300 hover:border-slate-700 sm:aspect-[1/2] sm:flex-col"
    >
      <div className="relative size-32 shrink-0 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 sm:aspect-square sm:size-auto sm:w-full">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-slate-700">
            <UtensilsCrossed className="size-10 sm:size-14" strokeWidth={1.25} />
          </div>
        )}
      </div>

      <div className="flex h-32 min-w-0 flex-1 flex-col overflow-hidden px-2.5 py-2 sm:h-auto sm:px-5 sm:pt-5 sm:pb-6">
        <h3 className="line-clamp-1 text-base font-bold tracking-tight text-slate-100 sm:line-clamp-none sm:text-xl">
          {item.name}
        </h3>
        <p className="mt-0.5 line-clamp-2 text-sm text-slate-400 sm:mt-2 sm:line-clamp-3">
          {item.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-1.5 pt-2 sm:gap-2 sm:pt-6">
          <p className="shrink-0 text-base font-bold tracking-tight whitespace-nowrap text-slate-100 sm:text-xl">
            {formatPrice(item.price, currency)}
          </p>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
              label={`${item.name} quantity`}
            />
            <Button
              size="sm"
              className="size-8 shrink-0 px-0"
              onClick={() => {
                onAddToCart(item, quantity);
                setQuantity(1);
                setAdded(true);
              }}
              aria-label={`Add ${item.name} to cart`}
              title={added ? "Added" : "Add to Cart"}
            >
              {added ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
