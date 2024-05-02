import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/presentation/shadcn/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        progress:
          "border-transparent bg-progress text-progress-foreground hover:bg-progress/80",
        done: "border-transparent bg-done text-done-foreground hover:bg-done/80",
        pending:
          "border-transparent bg-pending text-pending-foreground hover:bg-pending/80",
        low:
          "border-transparent bg-low text-low-foreground hover:bg-low/80",
        medium: "border-transparent bg-medium text-medium-foreground hover:bg-medium/80",
        hight:
          "border-transparent bg-hight text-hight-foreground hover:bg-hight/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
