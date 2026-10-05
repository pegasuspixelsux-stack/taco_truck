"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const stepButton = cn(
  "flex h-full items-center justify-center text-slate-400",
  "transition-[background-color,color,transform] duration-200 ease-out-expo hover:bg-ink/5 hover:text-slate-100 active:scale-[0.92]",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400",
  "disabled:pointer-events-none disabled:opacity-40",
);

const sizes = {
  sm: { group: "h-8", button: "w-6", icon: "size-3.5", value: "min-w-4 text-sm" },
  lg: { group: "h-12", button: "w-11", icon: "size-4", value: "min-w-6 text-base" },
};

// The number rolls up on increase and down on decrease.
const digit: Variants = {
  enter: (direction: number) => ({ y: direction * 10, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (direction: number) => ({ y: direction * -10, opacity: 0 }),
};

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  label = "Quantity",
  size = "sm",
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const [direction, setDirection] = useState(1);
  const step = (delta: number) => {
    setDirection(delta);
    onChange(Math.min(max, Math.max(min, value + delta)));
  };
  const s = sizes[size];

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex shrink-0 items-center overflow-hidden rounded-xl border border-slate-800/80 bg-ink/5",
        s.group,
        className,
      )}
    >
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={cn(stepButton, s.button)}
      >
        <Minus className={s.icon} />
      </button>
      <output
        aria-live="polite"
        className={cn(
          "relative flex h-full items-center justify-center overflow-hidden font-medium tabular-nums text-slate-100",
          s.value,
        )}
      >
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.span
            key={value}
            custom={direction}
            variants={digit}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </output>
      <button
        type="button"
        onClick={() => step(1)}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={cn(stepButton, s.button)}
      >
        <Plus className={s.icon} />
      </button>
    </div>
  );
}
