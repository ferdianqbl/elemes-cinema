import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
  children?: React.ReactNode;
}

export function SectionHeader({
  title,
  subtitle,
  actionHref,
  actionLabel = "View all",
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6",
        className
      )}
    >
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-xs sm:text-sm text-neutral-400">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {children}
        {actionHref && (
          <Link
            href={actionHref}
            className="group inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>{actionLabel}</span>
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
