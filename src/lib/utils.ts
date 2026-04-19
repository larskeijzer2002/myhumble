import type { ButtonHTMLAttributes, ReactNode } from 'react';

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export const primaryButtonClass =
  'inline-flex items-center justify-center rounded-full bg-[#2872fa] px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50';

export const ghostButtonClass =
  'inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:border-white disabled:cursor-not-allowed disabled:opacity-50';

export type ButtonLikeProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
};
