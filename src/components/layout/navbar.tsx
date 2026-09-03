"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Film,
  Search,
  Bookmark,
  Menu,
  Sparkles,
  Flame,
  Clock,
  Calendar,
  Radio,
  Tv,
  Users,
  Home,
} from "lucide-react";
import { useWatchlistStore } from "@/store/use-watchlist-store";
import { useUiStore } from "@/store/use-ui-store";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";

const MOVIE_CATEGORIES = [
  { id: "popular", label: "Popular Movies", desc: "Top trending worldwide", href: "/movies?category=popular", icon: Flame },
  { id: "top_rated", label: "Top Rated", desc: "Highest voter ratings", href: "/movies?category=top_rated", icon: Sparkles },
  { id: "now_playing", label: "Now Playing", desc: "Currently in theaters", href: "/movies?category=now_playing", icon: Clock },
  { id: "upcoming", label: "Upcoming", desc: "Coming soon to cinemas", href: "/movies?category=upcoming", icon: Calendar },
];

const TV_CATEGORIES = [
  { id: "popular", label: "Popular TV Shows", desc: "Most streamed series", href: "/tv?category=popular", icon: Flame },
  { id: "top_rated", label: "Top Rated TV", desc: "Critically acclaimed", href: "/tv?category=top_rated", icon: Sparkles },
  { id: "on_the_air", label: "On The Air", desc: "Currently airing seasons", href: "/tv?category=on_the_air", icon: Radio },
  { id: "airing_today", label: "Airing Today", desc: "Fresh episodes broadcasting", href: "/tv?category=airing_today", icon: Calendar },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const watchlistCount = useWatchlistStore((state) => state.items.length);
  const openSearch = useUiStore((state) => state.openSearch);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsDrawerOpen(false);
      setSearchQuery("");
    }
  };

  const isHomeActive = pathname === "/";
  const isMoviesActive = pathname.startsWith("/movies");
  const isTvActive = pathname.startsWith("/tv");
  const isPeopleActive = pathname.startsWith("/people");
  const isWatchlistActive = pathname.startsWith("/watchlist");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/85 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Left: Brand & Navigation */}
        <div className="flex items-center gap-2 md:gap-3 lg:gap-6 min-w-0">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-base sm:text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-90 shrink-0"
          >
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-500 text-neutral-950">
              <Film className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
            </div>
            <span className="font-light tracking-tight text-white text-sm sm:text-base lg:text-lg">
              Elemes<span className="text-cyan-400 font-semibold">Cinema</span>
            </span>
          </Link>

          {/* Desktop / Tablet Navigation Menu */}
          <div className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Home */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "px-2 lg:px-2.5 text-[11px] lg:text-xs",
                      isHomeActive && "bg-cyan-950/60 text-cyan-400 border border-cyan-500/30"
                    )}
                  >
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Movies (Dropdown) */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "px-2 lg:px-2.5 text-[11px] lg:text-xs",
                      isMoviesActive && "bg-cyan-950/60 text-cyan-400 border border-cyan-500/30"
                    )}
                  >
                    Movies
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[320px] gap-1 p-2">
                      <Link
                        href="/movies"
                        className="group flex items-center gap-3 rounded-lg p-2.5 hover:bg-[#0E121B] transition-colors"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                          <Film className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white group-hover:text-cyan-400 transition-colors">
                            All Movies
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Explore full catalog and categories
                          </p>
                        </div>
                      </Link>

                      <div className="my-1 border-t border-white/10" />

                      <div className="grid grid-cols-2 gap-1">
                        {MOVIE_CATEGORIES.map((cat, idx) => {
                          const Icon = cat.icon;
                          const isCatActive =
                            isMoviesActive &&
                            (currentCategory === cat.id || (!currentCategory && cat.id === "popular"));
                          return (
                            <Link
                              key={idx}
                              href={cat.href}
                              className={cn(
                                "flex flex-col gap-0.5 rounded-lg p-2 transition-colors",
                                isCatActive
                                  ? "bg-cyan-950/70 text-cyan-400 border border-cyan-500/30"
                                  : "text-slate-300 hover:text-cyan-400 hover:bg-[#0E121B]"
                              )}
                            >
                              <div className="flex items-center gap-1.5">
                                <Icon className={cn("h-3 w-3", isCatActive ? "text-cyan-400" : "text-slate-400")} />
                                <span className="text-xs font-medium">{cat.label}</span>
                              </div>
                              <span className="text-[10px] text-slate-500">{cat.desc}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* TV Shows (Dropdown) */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "px-2 lg:px-2.5 text-[11px] lg:text-xs",
                      isTvActive && "bg-cyan-950/60 text-cyan-400 border border-cyan-500/30"
                    )}
                  >
                    TV Shows
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[320px] gap-1 p-2">
                      <Link
                        href="/tv"
                        className="group flex items-center gap-3 rounded-lg p-2.5 hover:bg-[#0E121B] transition-colors"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                          <Tv className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white group-hover:text-cyan-400 transition-colors">
                            All TV Shows
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Browse series, seasons, and episodes
                          </p>
                        </div>
                      </Link>

                      <div className="my-1 border-t border-white/10" />

                      <div className="grid grid-cols-2 gap-1">
                        {TV_CATEGORIES.map((cat, idx) => {
                          const Icon = cat.icon;
                          const isCatActive =
                            isTvActive &&
                            (currentCategory === cat.id || (!currentCategory && cat.id === "popular"));
                          return (
                            <Link
                              key={idx}
                              href={cat.href}
                              className={cn(
                                "flex flex-col gap-0.5 rounded-lg p-2 transition-colors",
                                isCatActive
                                  ? "bg-cyan-950/70 text-cyan-400 border border-cyan-500/30"
                                  : "text-slate-300 hover:text-cyan-400 hover:bg-[#0E121B]"
                              )}
                            >
                              <div className="flex items-center gap-1.5">
                                <Icon className={cn("h-3 w-3", isCatActive ? "text-cyan-400" : "text-slate-400")} />
                                <span className="text-xs font-medium">{cat.label}</span>
                              </div>
                              <span className="text-[10px] text-slate-500">{cat.desc}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* People */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/people"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "px-2 lg:px-2.5 text-[11px] lg:text-xs",
                      isPeopleActive && "bg-cyan-950/60 text-cyan-400 border border-cyan-500/30"
                    )}
                  >
                    People
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Watchlist */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/watchlist"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "px-2 lg:px-2.5 text-[11px] lg:text-xs",
                      isWatchlistActive && "bg-cyan-950/60 text-cyan-400 border border-cyan-500/30"
                    )}
                  >
                    <span>Watchlist</span>
                    {watchlistCount > 0 && (
                      <span className="ml-1.5 inline-flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-cyan-400 text-[10px] font-bold text-neutral-950">
                        {watchlistCount}
                      </span>
                    )}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right: Quick Search, Watchlist Icon & Mobile Drawer Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Quick Search Trigger (Adaptive Tablet & Desktop) */}
          <button
            type="button"
            onClick={openSearch}
            className="flex items-center justify-between gap-1.5 h-9 w-9 md:w-36 lg:w-52 xl:w-56 rounded-full border border-white/10 bg-[#07090E] px-2.5 md:px-3 text-xs text-slate-400 hover:border-cyan-500/40 hover:text-slate-200 transition-all cursor-pointer shrink-0"
            aria-label="Search catalog"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <Search className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span className="hidden md:inline text-[11px] font-normal truncate">
                Search catalog...
              </span>
            </div>
            <kbd className="pointer-events-none hidden lg:inline-flex h-5 select-none items-center gap-0.5 rounded-[4px] border border-white/10 bg-[#0E121B] px-1.5 font-mono text-[10px] font-medium text-slate-400">
              <span>⌘</span>K
            </kbd>
          </button>

          {/* Watchlist Header Icon */}
          <Link
            href="/watchlist"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#07090E] text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all shrink-0"
            aria-label="View Watchlist"
          >
            <Bookmark className="h-4 w-4" />
            {watchlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-cyan-400 text-[10px] font-bold text-neutral-950">
                {watchlistCount}
              </span>
            )}
          </Link>

          {/* Mobile Drawer Trigger (< 768px) */}
          <div className="flex md:hidden">
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#07090E] text-slate-300 hover:text-white transition-colors"
                aria-label="Open Navigation Menu"
              >
                <Menu className="h-4 w-4" />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400 text-neutral-950">
                      <Film className="h-4 w-4 fill-current" />
                    </div>
                    <span>
                      Elemes<span className="text-cyan-400 font-semibold">Cinema</span>
                    </span>
                  </DrawerTitle>
                  <DrawerDescription>
                    Explore trending cinema, television series, and saved media.
                  </DrawerDescription>
                </DrawerHeader>

                {/* Mobile In-Drawer Search */}
                <form onSubmit={handleSearchSubmit} className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search movies, TV series, actors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-10 w-full rounded-lg border border-white/10 bg-[#0E121B] px-9 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  </div>
                </form>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-1">
                  <Link
                    href="/"
                    onClick={() => setIsDrawerOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                      isHomeActive
                        ? "bg-cyan-950/60 text-cyan-400 border border-cyan-500/30"
                        : "text-slate-300 hover:bg-white/5"
                    )}
                  >
                    <Home className="h-4 w-4 text-cyan-400" />
                    <span>Home</span>
                  </Link>

                  <div>
                    <Link
                      href="/movies"
                      onClick={() => setIsDrawerOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                        isMoviesActive
                          ? "bg-cyan-950/60 text-cyan-400 border border-cyan-500/30"
                          : "text-slate-300 hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Film className="h-4 w-4 text-cyan-400" />
                        <span>Movies Catalog</span>
                      </div>
                      <span className="text-[10px] text-slate-500 uppercase">Explore</span>
                    </Link>

                    {/* Quick Category Chips */}
                    <div className="flex flex-wrap gap-1.5 pl-6 pr-2 pt-1.5 pb-2">
                      {MOVIE_CATEGORIES.map((cat) => {
                        const isCatActive =
                          isMoviesActive &&
                          (currentCategory === cat.id || (!currentCategory && cat.id === "popular"));
                        return (
                          <Link
                            key={cat.id}
                            href={cat.href}
                            onClick={() => setIsDrawerOpen(false)}
                            className={cn(
                              "px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors",
                              isCatActive
                                ? "bg-cyan-400 text-neutral-950 font-bold"
                                : "bg-[#0E121B] text-slate-400 hover:text-white border border-white/5"
                            )}
                          >
                            {cat.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <Link
                      href="/tv"
                      onClick={() => setIsDrawerOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                        isTvActive
                          ? "bg-cyan-950/60 text-cyan-400 border border-cyan-500/30"
                          : "text-slate-300 hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Tv className="h-4 w-4 text-cyan-400" />
                        <span>TV Series</span>
                      </div>
                      <span className="text-[10px] text-slate-500 uppercase">Seasons</span>
                    </Link>

                    {/* Quick Category Chips */}
                    <div className="flex flex-wrap gap-1.5 pl-6 pr-2 pt-1.5 pb-2">
                      {TV_CATEGORIES.map((cat) => {
                        const isCatActive =
                          isTvActive &&
                          (currentCategory === cat.id || (!currentCategory && cat.id === "popular"));
                        return (
                          <Link
                            key={cat.id}
                            href={cat.href}
                            onClick={() => setIsDrawerOpen(false)}
                            className={cn(
                              "px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors",
                              isCatActive
                                ? "bg-cyan-400 text-neutral-950 font-bold"
                                : "bg-[#0E121B] text-slate-400 hover:text-white border border-white/5"
                            )}
                          >
                            {cat.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <Link
                    href="/people"
                    onClick={() => setIsDrawerOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                      isPeopleActive
                        ? "bg-cyan-950/60 text-cyan-400 border border-cyan-500/30"
                        : "text-slate-300 hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-cyan-400" />
                      <span>People & Cast</span>
                    </div>
                    <span className="text-[10px] text-slate-500 uppercase">Celebrities</span>
                  </Link>

                  <Link
                    href="/watchlist"
                    onClick={() => setIsDrawerOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                      isWatchlistActive
                        ? "bg-cyan-950/60 text-cyan-400 border border-cyan-500/30"
                        : "text-slate-300 hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Bookmark className="h-4 w-4 text-cyan-400" />
                      <span>Saved Watchlist</span>
                    </div>
                    {watchlistCount > 0 && (
                      <span className="rounded-full bg-cyan-400 px-2 py-0.5 text-[10px] font-bold text-neutral-950">
                        {watchlistCount}
                      </span>
                    )}
                  </Link>
                </nav>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
}
