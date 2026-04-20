import { useEffect, useState } from 'react';
import { LOGO_SRC, navItems } from '../data/siteContent';
import { cn, primaryButtonClass } from '../lib/utils';

type NavBarProps = {
  onOpenQuiz: () => void;
};

export function NavBar({ onOpenQuiz }: NavBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 24) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }

      lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 px-3 pt-3 transition-transform duration-300 sm:px-4 sm:pt-4 md:px-6',
        isVisible ? 'translate-y-0' : '-translate-y-[calc(100%+1rem)]',
      )}
    >
      <div className="mx-auto max-w-7xl rounded-[1.4rem] border border-white/10 bg-black/72 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:rounded-[1.75rem]">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#2872fa]/45 to-transparent" />
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 md:px-8 lg:px-10">
          <div className="min-w-0 flex items-center gap-3 sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-transparent p-1 shadow-[0_8px_24px_rgba(40,114,250,0.08)] sm:h-12 sm:w-12">
              <img src={LOGO_SRC} alt="My Humble logo" className="h-full w-full object-contain mix-blend-screen" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/38 sm:text-[10px] sm:tracking-[0.34em]">My Humble</p>
              <p className="truncate text-[11px] font-black uppercase tracking-[0.14em] text-white sm:text-sm sm:tracking-[0.18em]">
                Unleash your inner champion
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-1 rounded-full border border-white/8 bg-white/[0.025] px-2 py-2 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-white/60 transition hover:bg-white/[0.05] hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={onOpenQuiz}
            className={cn(
              primaryButtonClass,
              'shrink-0 px-3 py-2.5 text-[10px] tracking-[0.16em] shadow-[0_0_30px_rgba(40,114,250,0.22)] sm:px-7 sm:py-4 sm:text-sm sm:tracking-[0.2em]',
            )}
          >
            <span className="hidden sm:inline">Train met My Humble</span>
            <span className="sm:hidden">Start</span>
          </button>
        </div>
        <div className="scrollbar-none flex items-center gap-2 overflow-x-auto px-4 pb-3 sm:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/60 transition hover:border-white/25 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
