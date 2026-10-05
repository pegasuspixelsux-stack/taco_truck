"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/field";
import { MENU_CATEGORIES } from "@/lib/sample-menu";
import { cn } from "@/lib/utils";

const categories = [
  { label: "All", href: "/#inventory" },
  ...MENU_CATEGORIES.map((category) => ({
    label: category,
    href: `/?type=${encodeURIComponent(category)}#inventory`,
  })),
];

const iconButton = cn(
  "rounded-xl p-2.5 text-slate-400 transition-[background-color,color,transform] duration-200",
  "hover:bg-ink/5 hover:text-slate-100 active:scale-[0.95]",
);

export function Navbar() {
  const router = useRouter();
  const [searching, setSearching] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = String(new FormData(event.currentTarget).get("q") ?? "").trim();
    router.push(query ? `/?q=${encodeURIComponent(query)}#inventory` : "/#inventory");
    setSearching(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        <Link href="/" className="shrink-0 text-lg font-bold tracking-tight text-slate-100">
          taco<span className="text-slate-500">_truck</span>
        </Link>

        <nav aria-label="Categories" className="hidden items-center gap-1 md:flex">
          {categories.map((category) => (
            <Link
              key={category.label}
              href={category.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors duration-200 hover:bg-ink/5 hover:text-slate-100"
            >
              {category.label}
            </Link>
          ))}
        </nav>

        <div className="flex min-w-0 items-center gap-2">
          {searching ? (
            <form role="search" onSubmit={submit} className="flex min-w-0 items-center gap-1">
              <Input
                name="q"
                type="search"
                autoFocus
                placeholder="Search the menu"
                aria-label="Search the menu"
                onKeyDown={(event) => event.key === "Escape" && setSearching(false)}
                className="h-10 w-40 min-w-0 shrink sm:w-56"
              />
              <button
                type="button"
                onClick={() => setSearching(false)}
                aria-label="Close search"
                className={iconButton}
              >
                <X className="size-5" />
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setSearching(true)}
              aria-label="Search the menu"
              className={iconButton}
            >
              <Search className="size-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
