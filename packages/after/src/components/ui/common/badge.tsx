import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center font-bold whitespace-nowrap shrink-0 transition-colors w-fit leading-none",
  {
    variants: {
      variant: {
        blue: "bg-blue-200 text-white",
        gray: "bg-gray-450 text-white",
        green: "bg-green-100 text-white",
        red: "bg-red-100 text-white",
        orange: "bg-orange-100 text-white",
        outline: "bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50",
      },
      size: {
        sm: "text-[0.625rem] px-1 h-4 rounded-[3px]",
        md: "text-[0.75rem] px-2 h-5 rounded-[3px]",
        lg: "text-[0.8125rem] px-2.5 h-6 rounded-[3px]",
      },
      shape: {
        rounded: "",
        pill: "rounded-[10px]!",
        square: "rounded-none!",
      },
    },
    defaultVariants: {
      variant: "blue",
      size: "md",
      shape: "rounded",
    },
  }
);

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  dot?: boolean;
  icon?: React.ReactNode;
}

export function Badge({
  className,
  variant,
  size,
  shape,
  asChild = false,
  dot = false,
  icon,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, shape }), className)}
      {...props}
    >
      {dot && (
        <span
          className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1.5"
          aria-hidden="true"
        />
      )}
      {icon && <span className="inline-flex shrink-0 mr-1">{icon}</span>}
      {children}
    </Comp>
  );
}
