import { cn } from "@/lib/utils";
import { Button } from "./button";

export const CloseButton = ({ ...props }: React.ComponentProps<"button">) => {
  return (
    <Button
      variant="none"
      size="none"
      className={cn([
        "text-[24px] w-[24px] h-[24px] shrink-0 leading-1 border-none",
        props.className,
      ])}
      {...props}
    >
      {props.children || "×"}
    </Button>
  );
};
