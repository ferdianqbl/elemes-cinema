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
  const isHigh = numericRating >= 7.5;
  const isMid = numericRating >= 5.0 && numericRating < 7.5;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold backdrop-blur-md",
        isHigh
          ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/30"
          : isMid
          ? "bg-amber-950/80 text-amber-400 border border-amber-500/30"
          : "bg-red-950/80 text-red-400 border border-red-500/30",
        className
      )}
    >
      {showStar && <Star className="h-3 w-3 fill-current text-current" />}
      <span>{formatRating(numericRating)}</span>
      {count !== undefined && (
        <span className="text-[10px] opacity-70 font-normal">
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}
