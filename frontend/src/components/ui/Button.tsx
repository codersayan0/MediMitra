import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  size?: "md" | "sm";
  block?: boolean;
  children: ReactNode;
}

/** Shared button styling so CTAs stay visually consistent across the app. */
export function Button({
  variant = "primary",
  size = "md",
  block = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    "btn",
    variant === "primary" ? "btn--primary" : "btn--outline",
    size === "sm" ? "btn--sm" : "",
    block ? "btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}