export interface BoxOfficeRoiResult {
  multiplier: number;
  label: string;
  status: "blockbuster" | "profitable" | "breakeven" | "deficit" | "unavailable";
  badgeColor: string;
  profit: number;
}

/**
 * Calculates Box Office Return on Investment based on TMDB movie budget & revenue.
 */
export function calculateBoxOfficeRoi(
  budget: number | null | undefined,
  revenue: number | null | undefined
): BoxOfficeRoiResult {
  if (!budget || !revenue || budget <= 0 || revenue <= 0) {
    return {
      multiplier: 0,
      label: "Box Office Data N/A",
      status: "unavailable",
      badgeColor: "text-slate-400 bg-slate-800/60 border-slate-700/60",
      profit: 0,
    };
  }

  const multiplier = Number((revenue / budget).toFixed(1));
  const profit = revenue - budget;

  if (multiplier >= 3.0) {
    return {
      multiplier,
      label: `${multiplier}x ROI • Blockbuster Hit`,
      status: "blockbuster",
      badgeColor: "text-amber-400 bg-amber-950/70 border-amber-500/40",
      profit,
    };
  }

  if (multiplier >= 1.5) {
    return {
      multiplier,
      label: `${multiplier}x ROI • Strong Profit`,
      status: "profitable",
      badgeColor: "text-cyan-400 bg-cyan-950/70 border-cyan-500/40",
      profit,
    };
  }

  if (multiplier >= 1.0) {
    return {
      multiplier,
      label: `${multiplier}x ROI • Broke Even`,
      status: "breakeven",
      badgeColor: "text-emerald-400 bg-emerald-950/70 border-emerald-500/40",
      profit,
    };
  }

  return {
    multiplier,
    label: `${multiplier}x ROI • Below Budget`,
    status: "deficit",
    badgeColor: "text-rose-400 bg-rose-950/70 border-rose-500/40",
    profit,
  };
}

export interface WatchlistStatsResult {
  totalCount: number;
  movieCount: number;
  tvCount: number;
  averageRating: number;
  highestRating: number;
  watchedCount: number;
  completionRate: number;
}

/**
 * Calculates collection statistics derived strictly from real API item data & user status.
 */
export function calculateWatchlistStats(
  items: Array<{
    media_type: string;
    vote_average?: number;
    status?: string;
  }>
): WatchlistStatsResult {
  if (!items || items.length === 0) {
    return {
      totalCount: 0,
      movieCount: 0,
      tvCount: 0,
      averageRating: 0,
      highestRating: 0,
      watchedCount: 0,
      completionRate: 0,
    };
  }

  let movieCount = 0;
  let tvCount = 0;
  let ratingSum = 0;
  let ratedItemsCount = 0;
  let highestRating = 0;
  let watchedCount = 0;

  for (const item of items) {
    if (item.media_type === "movie") {
      movieCount += 1;
    } else if (item.media_type === "tv") {
      tvCount += 1;
    }

    if (item.status === "watched") {
      watchedCount += 1;
    }

    if (item.vote_average && item.vote_average > 0) {
      ratingSum += item.vote_average;
      ratedItemsCount += 1;
      if (item.vote_average > highestRating) {
        highestRating = item.vote_average;
      }
    }
  }

  const averageRating =
    ratedItemsCount > 0 ? Number((ratingSum / ratedItemsCount).toFixed(1)) : 0;
  const completionRate =
    items.length > 0 ? Math.round((watchedCount / items.length) * 100) : 0;

  return {
    totalCount: items.length,
    movieCount,
    tvCount,
    averageRating,
    highestRating: Number(highestRating.toFixed(1)),
    watchedCount,
    completionRate,
  };
}
