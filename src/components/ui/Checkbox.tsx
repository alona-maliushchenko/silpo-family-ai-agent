"use client";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label: string;
}

export function Checkbox({
  checked = false,
  onChange,
  label,
}: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="h-5 w-5 rounded border-gray-300 accent-[#ff6b00]"
      />

      <span className="text-sm text-[#444]">{label}</span>
    </label>
  );
}