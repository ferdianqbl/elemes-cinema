"use client";

import React, { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4 space-y-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-rose-950/60 border border-rose-500/30 text-rose-400">
        <AlertCircle className="h-7 w-7" />
      </div>
      <div className="space-y-1 max-w-md">
        <h2 className="text-xl font-light text-white">Something went wrong</h2>
        <p className="text-xs text-slate-400 font-normal">
          An unexpected error occurred while fetching media content. Please verify your TMDB API configuration or try again.
        </p>
      </div>
      <Button onClick={reset} variant="default" size="sm">
        <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
        <span>Try Again</span>
      </Button>
    </div>
  );
}
