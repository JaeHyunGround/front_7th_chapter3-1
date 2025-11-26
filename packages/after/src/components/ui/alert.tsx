import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { CloseButton } from "./close-button";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-gray-50 text-gray-800 border-gray-400",
        info:
          "bg-blue-50 text-blue-500 border-blue-400",
        success:
          "bg-green-50 text-green-400 border-green-300",
        warning:
          "bg-orange-50 text-orange-300 border-orange-200",
        error:
          "bg-red-50 text-red-500 border-red-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AlertProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof alertVariants> {
  title?: string;
  onClose?: () => void;
  icon?: React.ReactNode;
}

export function Alert({
  className,
  variant,
  title,
  onClose,
  icon,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <div className="flex gap-3 items-start">
        {icon && (
          <div className="shrink-0 mt-0.5" aria-hidden="true">
            {icon}
          </div>
        )}

        <div className="flex-1">
          {title && (
            <div className="font-bold text-[15px] mb-1">
              {title}
            </div>
          )}
          <div className="text-[14px] leading-relaxed">
            {children}
          </div>
        </div>

        {onClose && <CloseButton onClick={onClose} />}
      </div>
    </div>
  );
}
