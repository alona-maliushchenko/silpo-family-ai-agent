"use client";

interface CounterProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function Counter({
  value,
  min = 0,
  max = 20,
  onChange,
}: CounterProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ddd] text-lg hover:bg-[#f5f5f5]"
      >
        −
      </button>

      <span className="min-w-6 text-center font-semibold">
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ddd] text-lg hover:bg-[#f5f5f5]"
      >
        +
      </button>
    </div>
  );
}