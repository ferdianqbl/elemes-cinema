import React from "react";
import { WatchlistView } from "@/features/watchlist/components/watchlist-view";

export const metadata = {
  title: "My Watchlist",
  description: "View and manage your saved movies and TV shows.",
};

export default function WatchlistPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          My Watchlist
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-neutral-400">
          Saved movies and TV series stored locally in your browser
        </p>
      </div>

      <WatchlistView />
    </div>
  );
}
