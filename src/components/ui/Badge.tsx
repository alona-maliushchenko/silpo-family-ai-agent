import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-[#fff1e8] px-3 py-1 text-xs font-semibold text-[#ff6b00] ${className}`}
    >
      {children}
    </span>
  );
}