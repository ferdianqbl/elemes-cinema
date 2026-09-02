import React from "react";
import { Star } from "lucide-react";
import { cn, formatRating } from "@/lib/utils";

interface RatingBadgeProps {
  rating?: number | null;
  count?: number;
  className?: string;
  showStar?: boolean;
}

export function RatingBadge({
  rating,
  count,
  className,
  showStar = true,
}: RatingBadgeProps) {
  const numericRating = rating || 0;
  const isHigh = numericRating >= 7.0;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-[4px] px-2 py-0.5 text-xs font-semibold backdrop-blur-md",
        isHigh
          ? "bg-amber-950/90 text-amber-400 border border-amber-500/40"
          : "bg-cyan-950/90 text-cyan-400 border border-cyan-500/40",
        className
      )}
    >
      {showStar && <Star className="h-3 w-3 fill-current text-current" />}
      <span className="tabular-nums font-bold">{formatRating(numericRating)}</span>
      {count !== undefined && (
        <span className="text-[10px] opacity-70 font-normal tabular-nums">
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}
