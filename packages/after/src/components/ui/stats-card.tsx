import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

interface StatsCardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof statsCardVariants> {
  label: string;
  value: number;
}

const statsCardVariants = cva(
  "px-4 py-3 border rounded-[3px] transition-colors",
  {
    variants: {
      type: {
        blue: "bg-blue-50 dark:bg-blue-300/40 border-blue-200 dark:border-blue-300 text-blue-200 dark:text-blue-700",
        green:
          "bg-green-50 dark:bg-green-300/40 border-green-300 dark:border-green-300 text-green-100 dark:text-green-600",
        red: "bg-red-50 dark:bg-red-300/40 border-red-300 dark:border-red-300 text-red-100 dark:text-red-600",
        orange:
          "bg-orange-50 dark:bg-orange-200/40 border-orange-200 dark:border-orange-200 text-orange-100 dark:text-orange-400",
        gray: "bg-gray-50 dark:bg-gray-500 border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-600",
      },
    },
  }
);

export const StatsCard = ({ label, value, type }: StatsCardProps) => {
  return (
    <div className={cn(statsCardVariants({ type }))}>
      <div className="text-xs text-gray-500 dark:text-white mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
};
