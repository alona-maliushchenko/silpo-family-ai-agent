"use client";

import React from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-[#00A651] text-white hover:bg-[#008F45] shadow-sm",

    secondary:
      "bg-[#F5F5F5] text-[#222222] hover:bg-[#E9E9E9]",

    outline:
      "border border-[#DDDDDD] bg-white text-[#222222] hover:bg-[#F8F8F8]",

    ghost:
      "bg-transparent text-[#555555] hover:bg-[#F5F5F5]",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3 text-sm",
    lg: "px-7 py-4 text-base",
  };

  return (
    <button
      type={props.type ?? "button"}
      className={[
        "inline-flex items-center justify-center gap-2",
        "rounded-xl font-semibold",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-[#00A651]/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
