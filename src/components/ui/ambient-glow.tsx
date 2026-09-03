import React from "react";
import { cn } from "@/lib/utils";

interface AmbientGlowProps {
  className?: string;
  intensity?: "low" | "medium" | "high";
  color?: "cyan" | "gold" | "crimson" | "multi";
}

export function AmbientGlow({
  className,
  intensity = "medium",
  color = "cyan",
}: AmbientGlowProps) {
  const intensityMap = {
    low: "opacity-20 blur-3xl",
    medium: "opacity-35 blur-3xl",
    high: "opacity-50 blur-[100px]",
  };

  const colorMap = {
    cyan: "bg-gradient-to-tr from-cyan-500/30 via-sky-600/20 to-transparent",
    gold: "bg-gradient-to-tr from-amber-500/30 via-orange-600/20 to-transparent",
    crimson: "bg-gradient-to-tr from-rose-500/30 via-purple-600/20 to-transparent",
    multi: "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/25 via-sky-700/10 to-transparent",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -inset-x-10 -top-10 -bottom-10 -z-10 rounded-full select-none",
        intensityMap[intensity],
        colorMap[color],
        className
      )}
    />
  );
}
