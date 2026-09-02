export const TMDB_IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p";

export type PosterSize = "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original";
export type BackdropSize = "w300" | "w780" | "w1280" | "original";
export type ProfileSize = "w45" | "w185" | "h632" | "original";

export function getPosterUrl(
  path: string | null | undefined,
  size: PosterSize = "w500"
): string {
  if (!path) return "/placeholder-poster.png";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export function getBackdropUrl(
  path: string | null | undefined,
  size: BackdropSize = "original"
): string {
  if (!path) return "/placeholder-backdrop.png";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export function getProfileUrl(
  path: string | null | undefined,
  size: ProfileSize = "w185"
): string {
  if (!path) return "/placeholder-avatar.png";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export function getYouTubeThumbnail(key: string): string {
  return `https://img.youtube.com/vi/${key}/hqdefault.jpg`;
}

export function getYouTubeEmbedUrl(key: string): string {
  return `https://www.youtube.com/embed/${key}?autoplay=0&rel=0`;
}
