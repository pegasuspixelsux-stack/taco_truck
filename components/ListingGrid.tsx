"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MenuItemCard } from "@/components/MenuItemCard";
import { MenuItemDetail } from "@/components/MenuItemDetail";
import { MENU_CATEGORIES } from "@/lib/sample-menu";
import type { MenuItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ListingGrid({
  items,
  category,
  onCategoryChange,
  currency,
  onAddToCart,
}: {
  items: MenuItem[];
  category: string;
  onCategoryChange: (category: string) => void;
  currency: string;
  onAddToCart: (item: MenuItem, quantity: number) => void;
}) {
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const closeDetail = useCallback(() => setSelected(null), []);

  return (
    <section id="inventory" className="mx-auto w-full max-w-7xl scroll-mt-24 px-6 py-16 md:py-24">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-100 md:text-4xl">Menu</h2>
          <p className="mt-3 text-slate-400">Made to order, straight from the truck.</p>
        </div>
        <p className="hidden text-sm text-slate-500 sm:block">
          {items.length} {items.length === 1 ? "item" : "items"}
        </p>
      </div>

      <nav
        aria-label="Menu categories"
        className="-mx-6 mb-10 flex gap-2 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {[{ label: "All", value: "" }, ...MENU_CATEGORIES.map((c) => ({ label: c, value: c }))].map(
          ({ label, value }) => (
            <button
              key={label}
              type="button"
              onClick={() => onCategoryChange(value)}
              aria-pressed={category === value}
              className={cn(
                "relative shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium whitespace-nowrap",
                "transition-[background-color,color,border-color,transform] duration-200 ease-out-expo active:scale-[0.96]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400",
                category === value
                  ? "border-transparent text-slate-950"
                  : "border-slate-800/80 bg-ink/5 text-slate-400 hover:bg-ink/10 hover:text-slate-100",
              )}
            >
              {/* The active fill slides between pills instead of blinking. */}
              {category === value && (
                <motion.span
                  layoutId="active-category"
                  transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  className="absolute inset-0 rounded-full bg-slate-100"
                />
              )}
              <span className="relative">{label}</span>
            </button>
          ),
        )}
      </nav>

      {items.length === 0 ? (
        <p className="rounded-2xl border border-slate-800/80 bg-surface px-6 py-16 text-center text-slate-500">
          No menu items match your search.
        </p>
      ) : (
        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <MenuItemCard
                key={item.id}
                item={item}
                index={index}
                currency={currency}
                onOpen={setSelected}
                onAddToCart={onAddToCart}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <MenuItemDetail
        item={selected}
        currency={currency}
        onClose={closeDetail}
        onAddToCart={onAddToCart}
      />
    </section>
  );
}
