"use client";

import { useEffect, useState, type Ref } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShoppingCart, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { formatPrice } from "@/lib/utils";
import type { MenuItem } from "@/lib/types";

const spring = { type: "spring", stiffness: 300, damping: 28 } as const;

export function MenuItemCard({
  ref,
  item,
  index = 0,
  currency,
  onOpen,
  onAddToCart,
}: {
  /** Forwarded so AnimatePresence's popLayout can measure exiting cards. */
  ref?: Ref<HTMLElement>;
  item: MenuItem;
  /** Grid position, used to stagger the entrance by a few frames. */
  index?: number;
  currency: string;
  onOpen: (item: MenuItem) => void;
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
      ref={ref}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, transition: { ...spring, delay: Math.min(index, 8) * 0.04 } }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
      whileHover={{ y: -4 }}
      transition={spring}
      className="group relative flex cursor-pointer overflow-hidden rounded-2xl border border-slate-800/80 bg-surface transition-colors duration-300 hover:border-slate-700 sm:aspect-[1/2] sm:flex-col"
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
          {/* Stretched over the whole card so a tap anywhere opens the details. */}
          <button
            type="button"
            onClick={(event) => {
              // Safari doesn't focus buttons on click; focus it so closing the sheet returns here.
              event.currentTarget.focus({ preventScroll: true });
              onOpen(item);
            }}
            aria-haspopup="dialog"
            className="text-left after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-slate-400"
          >
            {item.name}
          </button>
        </h3>
        <p className="mt-0.5 line-clamp-2 text-sm text-slate-400 sm:mt-2 sm:line-clamp-3">
          {item.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-1.5 pt-2 sm:gap-2 sm:pt-6">
          <p className="shrink-0 text-base font-bold tracking-tight whitespace-nowrap text-slate-100 sm:text-xl">
            {formatPrice(item.price, currency)}
          </p>
          <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
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
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={added ? "added" : "cart"}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  {added ? <Check className="size-4" /> : <ShoppingCart className="size-4" />}
                </motion.span>
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
