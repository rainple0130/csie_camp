import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
};

export function Card({
  title,
  children,
  className,
  titleClassName,
}: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-white/50 p-6 shadow-md transition-all duration-300 hover:shadow-lg ${className ?? ""}`}
    >
      {title ? (
        <h2 className={`text-xl font-bold text-aqua ${titleClassName ?? ""}`}>
          {title}
        </h2>
      ) : null}
      {children ? <div className="mt-3">{children}</div> : null}
    </div>
  );
}

