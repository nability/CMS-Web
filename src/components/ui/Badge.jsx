// src/components/ui/Badge.jsx
import clsx from "clsx";

const variants = {
  published: "bg-emerald-100 text-emerald-700 border-emerald-200",
  draft:     "bg-amber-100  text-amber-700  border-amber-200",
  review:    "bg-blue-100   text-blue-700   border-blue-200",
  archived:  "bg-gray-100   text-gray-500   border-gray-200",
  active:    "bg-emerald-100 text-emerald-700 border-emerald-200",
  inactive:  "bg-red-100    text-red-600    border-red-200",
};

const labels = {
  published: "Diterbitkan",
  draft:     "Draft",
  review:    "Review",
  archived:  "Diarsipkan",
  active:    "Aktif",
  inactive:  "Nonaktif",
};

/**
 * @param {{ variant: keyof typeof variants, label?: string, className?: string }} props
 */
export default function Badge({ variant = "draft", label, className }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        variants[variant] ?? variants.draft,
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {label ?? labels[variant] ?? variant}
    </span>
  );
}
