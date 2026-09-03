import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: [
        "src/lib/**",
        "src/store/**",
        "src/hooks/**",
        "src/features/**/services/**",
        "src/components/ui/rating-badge.tsx",
        "src/components/ui/watch-providers.tsx",
        "src/components/layout/footer.tsx",
        "src/features/watchlist/components/watchlist-button.tsx",
      ],
      exclude: ["src/lib/axios.ts", "src/types/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
