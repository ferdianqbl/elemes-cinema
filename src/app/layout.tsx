import type { Metadata } from "next";
import { QueryProvider } from "@/providers/query-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SearchModal } from "@/features/search/components/search-modal";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

import { Suspense } from "react";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Discover Movies & TV Shows`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Movies",
    "TV Shows",
    "TMDB",
    "Streaming",
    "Catalog",
    "Watchlist",
    "Actors",
    "Top Rated",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <body className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col antialiased selection:bg-emerald-500 selection:text-neutral-950">
        <QueryProvider>
          <TooltipProvider>
            <Suspense fallback={<div className="h-16 w-full border-b border-white/10 bg-black/85" />}>
              <Navbar />
            </Suspense>
            <main className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              {children}
            </main>
            <Footer />
            <SearchModal />
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
