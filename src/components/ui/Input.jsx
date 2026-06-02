// src/components/ui/Input.jsx
import { forwardRef } from "react";
import clsx from "clsx";

/**
 * @param {{
 *   label?: string,
 *   error?: string,
 *   hint?: string,
 *   leftIcon?: React.ComponentType,
 *   rightElement?: React.ReactNode,
 * } & React.InputHTMLAttributes<HTMLInputElement>} props
 */
const Input = forwardRef(function Input(
  { label, error, hint, leftIcon: LeftIcon, rightElement, className, id, ...props },
  ref
) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {LeftIcon && (
          <LeftIcon
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "w-full rounded-xl border text-sm transition-all duration-150",
            "placeholder:text-gray-300 bg-white",
            "focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary",
            "disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400",
            LeftIcon ? "pl-9 pr-4 py-2.5" : "px-4 py-2.5",
            rightElement ? "pr-11" : "",
            error
              ? "border-red-400 focus:ring-red-200 focus:border-red-400"
              : "border-gray-300",
            className
          )}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 flex items-center gap-1">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
});

export default Input;
