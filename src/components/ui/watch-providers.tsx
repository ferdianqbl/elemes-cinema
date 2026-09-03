"use client";

import React from "react";
import Image from "next/image";
import { Tv, ExternalLink } from "lucide-react";
import { WatchProvidersCountry } from "@/types/common.types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface WatchProvidersProps {
  results?: Record<string, WatchProvidersCountry>;
}

export function WatchProviders({ results }: WatchProvidersProps) {
  if (!results || Object.keys(results).length === 0) {
    return null;
  }

  // Prioritize Indonesia (ID), fallback to US, or first available country code
  const countryData: WatchProvidersCountry | undefined =
    results["ID"] || results["US"] || Object.values(results)[0];

  if (!countryData) {
    return null;
  }

  const streamProviders = countryData.flatrate || [];
  const rentOrBuyProviders = [
    ...(countryData.rent || []),
    ...(countryData.buy || []),
  ].filter(
    (v, i, a) => a.findIndex((t) => t.provider_id === v.provider_id) === i
  );

  const hasAnyProviders =
    streamProviders.length > 0 || rentOrBuyProviders.length > 0;

  return (
    <div className="rounded-xl border border-white/10 bg-[#07090E] p-4 sm:p-5 space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-medium text-xs sm:text-sm">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
            <Tv className="h-3.5 w-3.5" />
          </div>
          <span>Where to Watch</span>
        </div>

        {countryData.link && (
          <a
            href={countryData.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
          >
            <span>JustWatch</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      {hasAnyProviders ? (
        <div className="space-y-3">
          {/* Flatrate / Subscription Streaming */}
          {streamProviders.length > 0 && (
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">
                Stream Subscription
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {streamProviders.map((provider) => (
                  <Tooltip key={provider.provider_id}>
                    <TooltipTrigger className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-lg overflow-hidden border border-white/15 bg-black hover:border-cyan-400 transition-all hover:scale-105 cursor-pointer shadow-sm focus:outline-none">
                      <Image
                        src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                        alt={provider.provider_name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">
                      {provider.provider_name}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          )}

          {/* Rent or Buy */}
          {rentOrBuyProviders.length > 0 && streamProviders.length === 0 && (
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">
                Rent / Buy
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {rentOrBuyProviders.slice(0, 6).map((provider) => (
                  <Tooltip key={provider.provider_id}>
                    <TooltipTrigger className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-lg overflow-hidden border border-white/15 bg-black hover:border-cyan-400 transition-all hover:scale-105 cursor-pointer shadow-sm focus:outline-none">
                      <Image
                        src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                        alt={provider.provider_name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">
                      {provider.provider_name}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-xs text-slate-400 italic">
          Streaming provider data currently not available for this title.
        </p>
      )}
    </div>
  );
}
