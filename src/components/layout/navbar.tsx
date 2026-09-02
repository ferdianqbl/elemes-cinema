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
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-90"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-neutral-950 shadow-md shadow-emerald-500/20">
              <Film className="h-5 w-5 fill-current" />
            </div>
            <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Elemes<span className="text-emerald-400 font-black">Cinema</span>
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
                    "relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive
                      ? "text-emerald-400 bg-emerald-500/10 font-semibold"
                      : "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900/60"
                  )}
                >
                  {link.label}
                  {link.href === "/watchlist" && watchlistCount > 0 && (
                    <span className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-neutral-950">
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
            className="hidden sm:flex items-center justify-between gap-3 h-9 w-52 md:w-60 rounded-full border border-neutral-800 bg-neutral-900/80 px-3 text-xs text-neutral-400 hover:border-neutral-700 hover:text-neutral-200 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-neutral-500" />
              <span>Search catalog...</span>
            </div>
            <kbd className="pointer-events-none hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-700 bg-neutral-800 px-1.5 font-mono text-[10px] font-medium text-neutral-400">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>

          {/* Quick Watchlist Icon */}
          <Link
            href="/watchlist"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:text-emerald-400 hover:border-neutral-700 transition-all"
            aria-label="View Watchlist"
          >
            <Bookmark className="h-4 w-4" />
            {watchlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-neutral-950 shadow-sm">
                {watchlistCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white"
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
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950/95 px-4 py-4 backdrop-blur-2xl">
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies, TV, people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-9 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500"
              />
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
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
                    "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400 font-semibold"
                      : "text-neutral-300 hover:bg-neutral-900"
                  )}
                >
                  <span>{link.label}</span>
                  {link.href === "/watchlist" && watchlistCount > 0 && (
                    <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-neutral-950">
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
