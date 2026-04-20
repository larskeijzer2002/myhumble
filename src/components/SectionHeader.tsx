type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-10 max-w-3xl sm:mb-12">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#2872fa] sm:text-sm sm:tracking-[0.4em]">{eyebrow}</p>
      <h2 className="mt-3 text-[2rem] font-black uppercase leading-[1.02] sm:mt-4 sm:text-5xl sm:leading-tight">{title}</h2>
      {description ? <p className="mt-4 max-w-2xl text-[15px] leading-7 text-white/65 sm:mt-5 sm:text-base sm:leading-8">{description}</p> : null}
    </div>
  );
}
