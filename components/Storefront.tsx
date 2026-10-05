"use client";

import { useMemo, useState } from "react";
import { Hero } from "@/components/Hero";
import { ListingGrid } from "@/components/ListingGrid";
import { useCart } from "@/lib/cart-context";
import { useSettings } from "@/lib/firestore";
import { SAMPLE_MENU } from "@/lib/sample-menu";

export function Storefront({
  initialType = "",
  initialQuery = "",
}: {
  initialType?: string;
  initialQuery?: string;
}) {
  const [category, setCategory] = useState(initialType);
  const { currency } = useSettings();
  const { addItem } = useCart();

  const items = useMemo(() => {
    const query = initialQuery.trim().toLowerCase();
    return SAMPLE_MENU.filter((item) => !category || item.category === category).filter(
      (item) => !query || `${item.name} ${item.description}`.toLowerCase().includes(query),
    );
  }, [category, initialQuery]);

  return (
    <>
      <Hero />
      <ListingGrid
        items={items}
        category={category}
        onCategoryChange={setCategory}
        currency={currency}
        onAddToCart={addItem}
      />
    </>
  );
}
