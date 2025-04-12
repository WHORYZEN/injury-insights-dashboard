
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

const statCardVariants = cva(
  "stat-card",
  {
    variants: {
      variant: {
        default: "border",
        primary: "bg-primary/10 border-primary/20",
        accent: "bg-accent/10 border-accent/20",
        secondary: "bg-secondary border",
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

interface StatCardProps extends VariantProps<typeof statCardVariants> {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant,
  className
}: StatCardProps) => {
  return (
    <div className={cn(statCardVariants({ variant }), className)}>
      <div className="flex justify-between items-start mb-2">
        <p className="stat-label">{title}</p>
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
      </div>
      <div className="stat-value">{value}</div>
      {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      {trend && (
        <div className={`flex items-center mt-2 text-xs ${trend.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
          <span>{trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
          <span className="ml-1 text-muted-foreground">from last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
