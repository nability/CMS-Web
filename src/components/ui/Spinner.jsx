// src/components/ui/Spinner.jsx
import clsx from "clsx";

/**
 * @param {{
 *   size?: "sm" | "md" | "lg",
 *   color?: "primary" | "white" | "gray",
 *   fullPage?: boolean,
 *   label?: string,
 * }} props
 */
export default function Spinner({ size = "md", color = "primary", fullPage = false, label }) {
  const sizeMap = { sm: "w-5 h-5 border-2", md: "w-8 h-8 border-3", lg: "w-12 h-12 border-4" };
  const colorMap = {
    primary: "border-primary border-t-transparent",
    white:   "border-white border-t-transparent",
    gray:    "border-gray-300 border-t-gray-600",
  };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div className={clsx("rounded-full animate-spin", sizeMap[size], colorMap[color])} />
      {label && <p className="text-sm text-gray-500 font-medium">{label}</p>}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-40">
        {spinner}
      </div>
    );
  }

  return spinner;
}
