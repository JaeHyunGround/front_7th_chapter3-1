import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const modalContentVariants = cva("", {
  variants: {
    size: {
      small: "sm:max-w-[400px]",
      medium: "sm:max-w-[600px]",
      large: "sm:max-w-[900px]",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export interface ModalProps extends VariantProps<typeof modalContentVariants> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showFooter?: boolean;
  footerContent?: React.ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
  showFooter = false,
  footerContent,
  className,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={cn(modalContentVariants({ size }), className)}
        showCloseButton={true}
      >
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}

        <div className="overflow-y-auto max-h-[60vh]">{children}</div>

        {showFooter && footerContent && (
          <DialogFooter>{footerContent}</DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
