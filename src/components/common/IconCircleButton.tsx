import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconCircleButtonProps = {
  children: ReactNode;
  disabled?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export function IconCircleButton({
  children,
  disabled,
  className,
  ...props
}: IconCircleButtonProps) {
  const base =
    "inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-white shadow-md transition";
  const enabled = "bg-aqua/50 hover:bg-aqua";
  const disabledCls = "opacity-0 pointer-events-none";
  return (
    <button
      type="button"
      {...props}
      className={`${base} ${disabled ? disabledCls : enabled} ${className ?? ""}`}
      aria-hidden={disabled}
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

