import { WatchlistSkeleton } from "@/features/watchlist/components/watchlist-view";
import { Skeleton } from "@/components/ui/skeleton";

export default function WatchlistLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-44 sm:w-52" />
        <Skeleton className="h-4 w-64 sm:w-80" />
      </div>

      <WatchlistSkeleton />
    </div>
  );
}
