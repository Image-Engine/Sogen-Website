import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-subtle hover:bg-primary/90 active:scale-[0.98] rounded-lg",
        destructive:
          "bg-destructive text-destructive-foreground shadow-subtle hover:bg-destructive/90 active:scale-[0.98] rounded-lg",
        outline:
          "border border-border bg-background hover:bg-accent hover:text-accent-foreground active:scale-[0.98] rounded-lg",
        secondary:
          "bg-secondary text-secondary-foreground shadow-subtle hover:bg-secondary/80 active:scale-[0.98] rounded-lg",
        ghost: 
          "hover:bg-accent hover:text-accent-foreground rounded-lg",
        link: 
          "text-primary underline-offset-4 hover:underline",
        // Custom e-commerce variants
        hero: 
          "bg-primary text-primary-foreground px-8 py-6 text-base font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        "hero-outline":
          "border-2 border-primary bg-transparent text-primary px-8 py-6 text-base font-semibold rounded-full hover:bg-primary hover:text-primary-foreground active:scale-[0.98]",
        shop:
          "bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold rounded-lg shadow-soft hover:shadow-medium hover:bg-primary/90 active:scale-[0.98]",
        subtle:
          "bg-accent text-accent-foreground hover:bg-accent/80 active:scale-[0.98] rounded-lg",
        nav:
          "text-foreground/70 hover:text-foreground font-medium rounded-lg",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10 rounded-lg",
        "icon-sm": "h-8 w-8 rounded-md",
        "icon-lg": "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
