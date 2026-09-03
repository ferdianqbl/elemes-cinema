"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Film, Tv, Search, Bookmark } from "lucide-react";
import { useWatchlistStore } from "@/store/use-watchlist-store";
import { useUiStore } from "@/store/use-ui-store";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export function MobileTabBar() {
  const pathname = usePathname();
  const watchlistCount = useWatchlistStore((state) => state.items.length);
  const openSearch = useUiStore((state) => state.openSearch);

  const tabs = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      href: "/",
      isActive: pathname === "/",
    },
    {
      id: "movies",
      label: "Movies",
      icon: Film,
      href: "/movies",
      isActive: pathname.startsWith("/movies"),
    },
    {
      id: "tv",
      label: "TV Series",
      icon: Tv,
      href: "/tv",
      isActive: pathname.startsWith("/tv"),
    },
    {
      id: "search",
      label: "Search",
      icon: Search,
      onClick: openSearch,
      isActive: pathname.startsWith("/search"),
    },
    {
      id: "watchlist",
      label: "Watchlist",
      icon: Bookmark,
      href: "/watchlist",
      isActive: pathname.startsWith("/watchlist"),
      badge: watchlistCount > 0 ? watchlistCount : undefined,
    },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/92 backdrop-blur-2xl border-t border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.8)] pb-[max(env(safe-area-inset-bottom,0px),8px)] pt-1.5 px-2 select-none"
    >
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const content = (
            <div
              className={cn(
                "relative flex flex-col items-center justify-center py-1 px-3 min-w-[56px] rounded-xl transition-all duration-200 active:scale-90 cursor-pointer",
                tab.isActive ? "text-cyan-400" : "text-slate-400 hover:text-slate-200"
              )}
            >
              {/* Active Indicator Top Glow Line */}
              {tab.isActive && (
                <motion.div
                  layoutId="mobileTabIndicator"
                  className="absolute -top-1.5 w-8 h-0.5 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}

              {/* Icon Container with optional Watchlist badge */}
              <div className="relative">
                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    tab.isActive && "scale-110 stroke-[2.25]"
                  )}
                />
                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-cyan-400 text-[9px] font-extrabold text-neutral-950 shadow-sm shadow-cyan-400/50">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "mt-1 text-[10px] tracking-tight leading-none transition-colors",
                  tab.isActive ? "font-bold text-cyan-400" : "font-medium text-slate-400"
                )}
              >
                {tab.label}
              </span>
            </div>
          );

          if (tab.onClick) {
            return (
              <button
                key={tab.id}
                type="button"
                onClick={tab.onClick}
                className="focus:outline-none"
                aria-label={tab.label}
              >
                {content}
              </button>
            );
          }

          return (
            <Link key={tab.id} href={tab.href!} className="focus:outline-none">
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
