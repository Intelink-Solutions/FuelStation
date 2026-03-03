import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

interface KPICardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color: "blue" | "orange" | "green" | "red" | "purple";
  delay?: number;
}

const colorMap = {
  blue: "bg-primary/10 text-primary",
  orange: "bg-accent/10 text-accent",
  green: "bg-success/10 text-success",
  red: "bg-destructive/10 text-destructive",
  purple: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
};

export default function KPICard({ title, value, prefix, suffix, decimals, icon: Icon, trend, trendUp, color, delay = 0 }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -3 }}
      className="kpi-card"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-xl sm:text-2xl font-bold mt-1 text-card-foreground break-words">
            <AnimatedCounter value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
          </h3>
          {trend && (
            <p className={`text-xs mt-1 font-medium ${trendUp ? "text-success" : "text-destructive"}`}>
              {trendUp ? "↑" : "↓"} {trend}
            </p>
          )}
        </div>
        <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center ${colorMap[color]} shadow-sm`}>
          <Icon className="w-5 h-5 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
