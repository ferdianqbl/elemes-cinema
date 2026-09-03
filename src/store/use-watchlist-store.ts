import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MediaType } from "@/types/common.types";

export type WatchlistStatus = "want_to_watch" | "watched";

export interface WatchlistItem {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  media_type: MediaType;
  overview?: string;
  addedAt: string;
  status?: WatchlistStatus;
}

interface WatchlistState {
  items: WatchlistItem[];
  addItem: (item: Omit<WatchlistItem, "addedAt">) => void;
  removeItem: (id: number, mediaType: MediaType) => void;
  toggleItem: (item: Omit<WatchlistItem, "addedAt">) => void;
  toggleWatchedStatus: (id: number, mediaType: MediaType) => void;
  isInWatchlist: (id: number, mediaType: MediaType) => boolean;
  clearWatchlist: () => void;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          if (state.items.some((i) => i.id === item.id && i.media_type === item.media_type)) {
            return state;
          }
          return {
            items: [
              {
                ...item,
                status: item.status || "want_to_watch",
                addedAt: new Date().toISOString(),
              },
              ...state.items,
            ],
          };
        }),
      removeItem: (id, mediaType) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === id && item.media_type === mediaType)
          ),
        })),
      toggleItem: (item) => {
        const exists = get().isInWatchlist(item.id, item.media_type);
        if (exists) {
          get().removeItem(item.id, item.media_type);
        } else {
          get().addItem(item);
        }
      },
      toggleWatchedStatus: (id, mediaType) =>
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id && item.media_type === mediaType) {
              const nextStatus: WatchlistStatus =
                item.status === "watched" ? "want_to_watch" : "watched";
              return { ...item, status: nextStatus };
            }
            return item;
          }),
        })),
      isInWatchlist: (id, mediaType) => {
        return get().items.some(
          (item) => item.id === id && item.media_type === mediaType
        );
      },
      clearWatchlist: () => set({ items: [] }),
    }),
    {
      name: "elemes-movie-watchlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
