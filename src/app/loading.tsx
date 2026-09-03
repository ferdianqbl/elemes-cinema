import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-3">
      <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      <p className="text-xs font-medium text-slate-400">Loading catalog data...</p>
    </div>
  );
}
