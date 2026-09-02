import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:border-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-400/40 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-cyan-400 text-neutral-950 font-bold hover:bg-cyan-300 border-none",
        outline:
          "border border-white/20 bg-transparent text-white hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/20",
        secondary:
          "bg-[#0E121B] text-slate-200 border border-white/10 hover:bg-[#151B28] hover:text-white hover:border-cyan-500/30",
        ghost:
          "hover:bg-white/10 text-slate-300 hover:text-white",
        destructive:
          "bg-rose-950/60 text-rose-400 border border-rose-500/30 hover:bg-rose-900/60 hover:text-white",
        link: "text-cyan-400 underline-offset-4 hover:underline",
        glass:
          "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:border-cyan-400",
      },
      size: {
        default:
          "h-9 gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold",
        xs: "h-6 gap-1 rounded-[4px] px-2 text-[11px]",
        sm: "h-8 gap-1.5 rounded-lg px-3 text-xs",
        lg: "h-11 gap-2.5 rounded-lg px-6 text-sm font-bold tracking-wide",
        icon: "size-9 rounded-lg",
        "icon-xs": "size-6 rounded-[4px] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded-lg",
        "icon-lg": "size-11 rounded-lg",
        "icon-pill": "size-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
