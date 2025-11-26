import { cn } from "@/lib/utils";
import { Button } from "./button";

export const PaginationButton = ({
  ...props
}: React.ComponentProps<"button">) => {
  return (
    <Button
      variant="none"
      size="none"
      className={cn([
        "px-[12px] py-[6px] bg-white rounded-[4px]",
        props.className,
      ])}
      {...props}
    ></Button>
  );
};
