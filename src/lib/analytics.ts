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
  }>,
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
