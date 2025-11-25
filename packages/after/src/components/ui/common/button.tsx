import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-block leading-normal border-solid font-sans rounded-[3px] cursor-pointer border whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        none: "border-none bg-transparent",
        blue: "bg-blue-200 text-white border-blue-300 hover:bg-blue-300 font-bold",
        gray: "bg-gray-100 text-gray-500 border-gray-300 hover:bg-gray-200 font-normal",
        red: "bg-red-100 text-white border-red-200 hover:bg-red-200",
        green: "bg-green-100 text-white border-green-200 hover:bg-green-200",
      },
      size: {
        none: "",
        sm: "py-[6px] px-[12px] text-[13px]",
        md: "py-[10px] px-[20px] text-[14px]",
        lg: "py-[12px] px-[24px] text-[15px]",
        fullwidth: "w-full py-[10px] px-[20px] text-[14px]",
      },
    },
    defaultVariants: {
      variant: "blue",
      size: "md",
    },
  }
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
