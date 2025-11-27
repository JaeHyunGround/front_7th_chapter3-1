import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

interface StatsCardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof statsCardVariants> {
  label: string;
  value: number;
}

const statsCardVariants = cva("px-4 py-3 border rounded-[3px]", {
  variants: {
    type: {
      blue: "bg-blue-50 border-blue-200 text-blue-200",
      green: "bg-green-50 border-green-300 text-green-100",
      red: "bg-red-50 border-red-300 text-red-100",
      orange: "bg-orange-50 border-orange-200 text-orange-100",
      gray: "bg-gray-50 border-gray-400 text-gray-600",
    },
  },
});

export const StatsCard = ({ label, value, type }: StatsCardProps) => {
  return (
    <div className={cn(statsCardVariants({ type }))}>
      <div
        style={{
          fontSize: "12px",
          color: "#666",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        {value}
      </div>
    </div>
  );
};
