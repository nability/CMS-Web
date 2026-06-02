// src/components/ui/Button.jsx
import clsx from "clsx";
import { Loader2 } from "lucide-react";

/**
 * @param {{
 *   variant?: "primary" | "secondary" | "ghost" | "danger",
 *   size?: "sm" | "md" | "lg",
 *   loading?: boolean,
 *   icon?: React.ComponentType,
 *   iconPosition?: "left" | "right",
 *   fullWidth?: boolean,
 *   children: React.ReactNode,
 * } & React.ButtonHTMLAttributes<HTMLButtonElement>} props
 */
export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon: Icon,
  iconPosition = "left",
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm shadow-primary/30 hover:shadow-md hover:shadow-primary/30 focus-visible:ring-primary",
    secondary:
      "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 focus-visible:ring-gray-400",
    ghost:
      "bg-transparent text-gray-600 hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-400",
    danger:
      "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm shadow-red-200 focus-visible:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      disabled={disabled || loading}
      className={clsx(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...props}
    >
      {loading ? (
        <Loader2 size={size === "sm" ? 13 : size === "lg" ? 18 : 15} className="animate-spin" />
      ) : (
        Icon && iconPosition === "left" && <Icon size={size === "sm" ? 13 : size === "lg" ? 18 : 15} />
      )}
      {children}
      {!loading && Icon && iconPosition === "right" && (
        <Icon size={size === "sm" ? 13 : size === "lg" ? 18 : 15} />
      )}
    </button>
  );
}
