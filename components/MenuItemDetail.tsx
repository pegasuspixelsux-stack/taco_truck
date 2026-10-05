"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, UtensilsCrossed, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/card";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { formatPrice } from "@/lib/utils";
import type { MenuItem } from "@/lib/types";

const DESKTOP_QUERY = "(min-width: 640px)";

function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const query = matchMedia(DESKTOP_QUERY);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}

/** Full-screen sheet on mobile, centered dialog from `sm` up. */
export function MenuItemDetail({
  item,
  currency,
  onClose,
  onAddToCart,
}: {
  item: MenuItem | null;
  currency: string;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number) => void;
}) {
  const isDesktop = useIsDesktop();
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = item !== null;

  useEffect(() => {
    if (!isOpen) return;
    // Remember the card that opened the sheet before moving focus into it.
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    const overflow = document.body.style.overflow;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      opener?.focus({ preventScroll: true });
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-item-title"
            className="flex h-dvh w-full flex-col overflow-hidden bg-slate-900 sm:h-auto sm:max-h-[92dvh] sm:max-w-md sm:rounded-3xl sm:border sm:border-slate-800/80 sm:shadow-2xl"
            initial={isDesktop ? { opacity: 0, y: 24, scale: 0.97 } : { y: "100%" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={isDesktop ? { opacity: 0, y: 12, scale: 0.98 } : { y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
          >
            <DetailContent
              key={item.id}
              item={item}
              currency={currency}
              closeRef={closeRef}
              onClose={onClose}
              onAddToCart={onAddToCart}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DetailContent({
  item,
  currency,
  closeRef,
  onClose,
  onAddToCart,
}: {
  item: MenuItem;
  currency: string;
  closeRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Let the "Added" confirmation register before the sheet closes.
  useEffect(() => {
    if (!added) return;
    const timeout = setTimeout(onClose, 700);
    return () => clearTimeout(timeout);
  }, [added, onClose]);

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div className="relative aspect-square w-full bg-gradient-to-br from-slate-800 to-slate-900">
          {item.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.image} alt={item.name} className="size-full object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center text-slate-700">
              <UtensilsCrossed className="size-16" strokeWidth={1.25} />
            </div>
          )}
          <button
            type="button"
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-slate-950/60 text-slate-100 backdrop-blur-xl transition-[background-color,transform] duration-200 hover:bg-slate-950/80 active:scale-[0.95] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="px-6 pt-6 pb-8">
          <Badge>{item.category}</Badge>
          <h2
            id="menu-item-title"
            className="mt-3 text-2xl font-bold tracking-tight text-slate-100"
          >
            {item.name}
          </h2>
          <p className="mt-3 leading-relaxed text-slate-400">{item.description}</p>
          <p className="mt-5 text-2xl font-bold tracking-tight text-slate-100">
            {formatPrice(item.price, currency)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-slate-800/80 px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <QuantityStepper
          size="lg"
          value={quantity}
          onChange={setQuantity}
          label={`${item.name} quantity`}
        />
        <Button
          size="lg"
          className="flex-1"
          disabled={added}
          onClick={() => {
            onAddToCart(item, quantity);
            setAdded(true);
          }}
        >
          {added ? (
            <>
              <Check className="size-5" />
              Added
            </>
          ) : (
            "Add to Cart"
          )}
        </Button>
      </div>
    </>
  );
}
