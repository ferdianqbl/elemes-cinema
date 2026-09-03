import React from "react";
import Link from "next/link";
import { Film } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Top Row: Brand & Inline Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-base font-bold text-white hover:opacity-90 transition-opacity"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-500 text-neutral-950 font-black">
              <Film className="h-4 w-4 fill-current" />
            </div>
            <span className="tracking-tight text-white font-bold">{SITE_NAME}</span>
          </Link>

          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-cyan-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Row: Minimal Disclaimer & Copyright */}
        <div className="mt-6 border-t border-white/5 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>
            Powered by TMDB API. This product is not endorsed or certified by TMDB.
          </p>
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
