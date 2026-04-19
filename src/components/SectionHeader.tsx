type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-12 max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#2872fa]">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-black uppercase leading-tight sm:text-5xl">{title}</h2>
      {description ? <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">{description}</p> : null}
    </div>
  );
}
