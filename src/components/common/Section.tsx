type SectionHeaderProps = {
  emoji?: string;
  title: string;
  className?: string;
};

export function SectionHeader({ emoji, title, className }: SectionHeaderProps) {
  return (
    <div className={`mb-3 flex items-center gap-3 px-1 ${className ?? ""}`}>
      {emoji ? (
        <span className="text-3xl" aria-hidden>
          {emoji}
        </span>
      ) : null}
      <h2 className="text-2xl font-bold text-aqua">{title}</h2>
    </div>
  );
}

