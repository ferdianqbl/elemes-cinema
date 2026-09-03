export interface BoxOfficeRoiResult {
  multiplier: number;
  label: string;
  status: "blockbuster" | "profitable" | "breakeven" | "deficit" | "unavailable";
  badgeColor: string;
  profit: number;
}

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
  totalMinutes: number;
  totalHours: number;
  remainingMinutes: number;
  formattedTime: string;
  averageRating: number;
  movieCount: number;
  tvCount: number;
}

export function calculateWatchlistStats(
  items: Array<{
    media_type: string;
    vote_average?: number;
  }>
): WatchlistStatsResult {
  if (!items || items.length === 0) {
    return {
      totalMinutes: 0,
      totalHours: 0,
      remainingMinutes: 0,
      formattedTime: "0h 0m",
      averageRating: 0,
      movieCount: 0,
      tvCount: 0,
    };
  }

  let movieCount = 0;
  let tvCount = 0;
  let ratingSum = 0;
  let ratedItemsCount = 0;

  for (const item of items) {
    if (item.media_type === "movie") {
      movieCount += 1;
    } else if (item.media_type === "tv") {
      tvCount += 1;
    }

    if (item.vote_average && item.vote_average > 0) {
      ratingSum += item.vote_average;
      ratedItemsCount += 1;
    }
  }

  // Estimated average runtime: Movie = 115 min, TV Show Season/Miniseries = ~360 min
  const estimatedTotalMinutes = movieCount * 115 + tvCount * 360;
  const totalHours = Math.floor(estimatedTotalMinutes / 60);
  const remainingMinutes = estimatedTotalMinutes % 60;
  const averageRating =
    ratedItemsCount > 0 ? Number((ratingSum / ratedItemsCount).toFixed(1)) : 0;

  return {
    totalMinutes: estimatedTotalMinutes,
    totalHours,
    remainingMinutes,
    formattedTime: `${totalHours}h ${remainingMinutes}m`,
    averageRating,
    movieCount,
    tvCount,
  };
}
