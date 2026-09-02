import React from "react";
import Link from "next/link";
import { Film, Heart } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5 text-base font-bold text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-500 text-neutral-950 font-black">
                <Film className="h-4 w-4 fill-current" />
              </div>
              <span>{SITE_NAME}</span>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-slate-400">
              A cinema-dark entertainment catalog web app built with Next.js 16, React 19, TanStack Query v5, and TMDB API.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-200">
              Catalog Navigation
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-cyan-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack & Attribution */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-200">
              API & Technology
            </h4>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-400">
              <li>Next.js 16 (Turbopack) & React 19</li>
              <li>TanStack React Query v5</li>
              <li>Zustand Local Storage Persist</li>
              <li>Tailwind CSS v4 & shadcn/ui</li>
              <li className="pt-2 text-[11px] text-slate-500">
                This product uses the TMDB API but is not endorsed or certified by TMDB.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Elemes Tech Test. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with precision</span>
            <Heart className="h-3 w-3 text-cyan-400 fill-current mx-1 inline" />
            <span>for Elemes</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
