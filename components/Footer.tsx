import Link from "next/link";
import { Lock } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MENU_CATEGORIES } from "@/lib/sample-menu";

const columns = [
  {
    title: "Menu",
    links: [
      { label: "All items", href: "/#inventory" },
      ...MENU_CATEGORIES.map((category) => ({
        label: category,
        href: `/?type=${encodeURIComponent(category)}#inventory`,
      })),
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/" },
      { label: "Financing", href: "/" },
      { label: "Contact", href: "/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold tracking-tight text-slate-100">
            taco<span className="text-slate-500">_truck</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            Exceptional vehicles, transparent pricing and a buying experience that respects your
            time.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold text-slate-100">{column.title}</h3>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors duration-200 hover:text-slate-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-800/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} taco_truck. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 transition-colors duration-200 hover:text-slate-300"
            >
              <Lock className="size-3" />
              Admin login
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
