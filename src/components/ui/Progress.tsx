interface ProgressProps {
    value: number;
    className?: string;
  }
  
  export function Progress({
    value,
    className = "",
  }: ProgressProps) {
    const safeValue = Math.min(100, Math.max(0, value));
  
    return (
      <div
        className={`h-2 w-full overflow-hidden rounded-full bg-[#eeeeee] ${className}`}
      >
        <div
          className="h-full rounded-full bg-[#ff6b00] transition-all duration-500"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    );
  }