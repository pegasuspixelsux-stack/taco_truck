"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const stepButton = cn(
  "flex h-full w-6 items-center justify-center text-slate-400",
  "transition-[background-color,color,transform] duration-200 ease-out-expo hover:bg-ink/5 hover:text-slate-100 active:scale-[0.92]",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400",
  "disabled:pointer-events-none disabled:opacity-40",
);

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  label = "Quantity",
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex h-8 shrink-0 items-center overflow-hidden rounded-xl border border-slate-800/80 bg-ink/5",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={stepButton}
      >
        <Minus className="size-3.5" />
      </button>
      <output aria-live="polite" className="min-w-4 text-center text-sm font-medium tabular-nums text-slate-100">
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={stepButton}
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
