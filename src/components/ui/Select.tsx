import React from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
}

export function Select({
  label,
  options,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-[#333]">
          {label}
        </label>
      )}

      <select
        className={`rounded-xl border border-[#ddd] bg-white px-4 py-3 text-sm outline-none focus:border-[#ff6b00] ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}