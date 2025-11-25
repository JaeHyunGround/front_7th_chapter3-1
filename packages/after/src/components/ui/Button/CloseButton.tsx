import { Button } from "../common/button";

export const CloseButton = ({ ...props }: React.ComponentProps<"button">) => {
  return (
    <Button variant="none" size="none" {...props}>
      {props.children || "×"}
    </Button>
  );
};
