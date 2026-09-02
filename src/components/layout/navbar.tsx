"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Film, Search, Bookmark, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { useWatchlistStore } from "@/store/use-watchlist-store";
import { useUiStore } from "@/store/use-ui-store";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const watchlistCount = useWatchlistStore((state) => state.items.length);
  const openSearch = useUiStore((state) => state.openSearch);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/85 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-90"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-500 text-neutral-950">
              <Film className="h-5 w-5 fill-current" />
            </div>
            <span className="font-extrabold tracking-tight text-white text-base sm:text-lg">
              Elemes<span className="text-cyan-400 font-black">Cinema</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all duration-200",
                    isActive
                      ? "text-cyan-400 bg-cyan-950/60 border border-cyan-500/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                  {link.href === "/watchlist" && watchlistCount > 0 && (
                    <span className="ml-1.5 inline-flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-cyan-400 text-[10px] font-black text-neutral-950">
                      {watchlistCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          {/* Quick Search Trigger */}
          <button
            type="button"
            onClick={openSearch}
            className="hidden sm:flex items-center justify-between gap-3 h-9 w-52 md:w-60 rounded-full border border-white/10 bg-[#07090E] px-3.5 text-xs text-slate-400 hover:border-cyan-500/40 hover:text-slate-200 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-slate-500" />
              <span className="text-[11px] font-medium">Search catalog...</span>
            </div>
            <kbd className="pointer-events-none hidden md:inline-flex h-5 select-none items-center gap-0.5 rounded border border-white/10 bg-[#0E121B] px-1.5 font-mono text-[10px] font-medium text-slate-400">
              <span>⌘</span>K
            </kbd>
          </button>

          {/* Quick Watchlist Icon */}
          <Link
            href="/watchlist"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#07090E] text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
            aria-label="View Watchlist"
          >
            <Bookmark className="h-4 w-4" />
            {watchlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-cyan-400 text-[10px] font-black text-neutral-950">
                {watchlistCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#07090E] text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-black/95 px-4 py-4 backdrop-blur-2xl">
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies, TV, people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-lg border border-white/10 bg-[#07090E] px-9 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </div>
          </form>

          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2 text-xs uppercase tracking-wider font-semibold transition-colors",
                    isActive
                      ? "bg-cyan-950/60 text-cyan-400 border border-cyan-500/30"
                      : "text-slate-300 hover:bg-white/5"
                  )}
                >
                  <span>{link.label}</span>
                  {link.href === "/watchlist" && watchlistCount > 0 && (
                    <span className="rounded-full bg-cyan-400 px-2 py-0.5 text-[10px] font-black text-neutral-950">
                      {watchlistCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
