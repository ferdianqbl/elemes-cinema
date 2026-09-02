import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-[4px] border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-400/40 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "bg-cyan-950/80 text-cyan-400 border border-cyan-500/30",
        secondary:
          "bg-[#0E121B] text-slate-300 border border-white/10",
        destructive:
          "bg-rose-950/60 text-rose-400 border border-rose-500/30",
        outline:
          "border border-white/15 text-slate-300",
        ghost:
          "hover:bg-white/10 text-slate-300",
        link: "text-cyan-400 underline-offset-4 hover:underline",
        rating:
          "bg-amber-950/80 text-amber-400 border border-amber-500/30 font-semibold",
        marquee:
          "text-[10px] uppercase font-bold tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-500/30",
        pill:
          "rounded-full bg-[#0E121B] text-slate-300 border border-white/10 px-3 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
