// src/components/ui/StatCard.jsx
import clsx from "clsx";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

/**
 * @param {{
 *   label: string,
 *   value: string | number,
 *   icon: React.ComponentType,
 *   color: "orange" | "blue" | "emerald" | "violet",
 *   trend?: "up" | "down" | "neutral",
 *   trendLabel?: string,
 * }} props
 */
export default function StatCard({
  label,
  value,
  icon: Icon,
  color = "orange",
  trend = "neutral",
  trendLabel,
}) {
  const colorMap = {
    orange:  { bg: "bg-orange-50",  icon: "bg-orange-500",  text: "text-orange-600"  },
    blue:    { bg: "bg-blue-50",    icon: "bg-blue-500",    text: "text-blue-600"    },
    emerald: { bg: "bg-emerald-50", icon: "bg-emerald-500", text: "text-emerald-600" },
    violet:  { bg: "bg-violet-50",  icon: "bg-violet-500",  text: "text-violet-600"  },
  };

  const trendMap = {
    up:      { icon: TrendingUp,   cls: "text-emerald-600" },
    down:    { icon: TrendingDown, cls: "text-red-500"     },
    neutral: { icon: Minus,        cls: "text-gray-400"    },
  };

  const c = colorMap[color];
  const t = trendMap[trend];
  const TrendIcon = t.icon;

  return (
    <div className="bg-white rounded-2xl shadow-card p-5 flex items-start gap-4 hover:shadow-md transition-shadow duration-200">
      {/* Icon bubble */}
      <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", c.icon)}>
        <Icon size={22} className="text-white" />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 font-medium truncate">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5 leading-tight">{value}</p>
        {trendLabel && (
          <div className={clsx("flex items-center gap-1 mt-1.5 text-xs font-medium", t.cls)}>
            <TrendIcon size={13} />
            <span>{trendLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}
