import Link from "next/link";
import { Film, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4 space-y-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#07090E] border border-white/10 text-slate-400">
        <Film className="h-8 w-8 text-cyan-400" />
      </div>
      <div className="space-y-1">
        <h2 className="text-2xl font-light text-white">404 - Page Not Found</h2>
        <p className="text-xs text-slate-400 max-w-sm font-normal">
          The movie, TV show, or catalog page you are looking for does not exist or has been moved.
        </p>
      </div>
      <Link href="/">
        <Button variant="default" size="sm">
          <Home className="h-3.5 w-3.5 mr-1.5" />
          <span>Back to Home</span>
        </Button>
      </Link>
    </div>
  );
}
