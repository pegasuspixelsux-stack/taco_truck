"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-800/80">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,color-mix(in_oklab,var(--color-slate-700)_55%,transparent),transparent),linear-gradient(to_bottom,transparent_60%,var(--color-slate-950))]"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-16 text-center md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="inline-flex items-center rounded-full border border-slate-800/80 bg-ink/5 px-3.5 py-1 text-xs font-medium text-slate-300 backdrop-blur-xl">
            Made fresh every day
          </span>
          <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-bold tracking-tight text-slate-100 md:text-7xl">
            Eat something extraordinary.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400">
            Authentic Mexican street tacos crafted with daily handmade tortillas, slow-marinated
            meats, and scratch-made salsas. Simple, bold, and served straight from the grill.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
