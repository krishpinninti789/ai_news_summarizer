import { cn } from "@/lib/utils";

type BrandMarkProps = {
  compact?: boolean;
  className?: string;
};

export function BrandMark({ compact = false, className }: BrandMarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-mark__signal" />
        <span className="brand-mark__signal brand-mark__signal--two" />
        <span className="brand-mark__signal brand-mark__signal--three" />
      </span>
      {!compact && (
        <span className="font-display text-[1.35rem] font-semibold tracking-[-0.04em]">
          News<span className="text-[var(--neon-blue)]">Gist</span>
        </span>
      )}
    </span>
  );
}
