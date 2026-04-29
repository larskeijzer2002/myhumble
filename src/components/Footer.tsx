import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { COMPANY_EMAIL, LOGO_SRC } from '../data/siteContent';
import { cn, primaryButtonClass } from '../lib/utils';
import { IconInstagram, IconLinkedIn, IconTikTok } from './icons';

type FooterProps = {
  onOpenQuiz: () => void;
  onOpenPrivacy: () => void;
  onOpenConsent: () => void;
};

type SocialButtonProps = {
  href: string;
  label: string;
  highlighted?: boolean;
  children: ReactNode;
};

function SocialButton({ href, label, children, highlighted = false }: SocialButtonProps) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      whileHover={{ y: -3, scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group relative rounded-full p-3 transition-all',
        highlighted
          ? 'border border-[#2872fa]/40 bg-[#2872fa]/10 text-white hover:border-[#2872fa]'
          : 'border border-white/10 bg-white/[0.02] text-white/85 hover:border-[#2872fa] hover:text-white',
      )}
    >
      {children}
    </motion.a>
  );
}

export function Footer({ onOpenQuiz, onOpenPrivacy, onOpenConsent }: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-white/[0.02] px-4 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-6 md:px-10 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(40,114,250,0.18),_transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.9rem] border border-white/10 bg-black/55 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:rounded-[2.25rem]">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#2872fa]/45 to-transparent" />
        <div className="grid gap-8 p-6 sm:gap-10 sm:p-8 md:p-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:p-12">
          <div className="max-w-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white p-2 sm:h-14 sm:w-14">
                <img src={LOGO_SRC} alt="My Humble logo" className="h-full w-full object-contain" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/45 sm:text-xs sm:tracking-[0.28em]">My Humble</p>
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-white sm:text-sm sm:tracking-[0.24em]">Unleash your inner champion</p>
              </div>
            </div>
            <p className="mt-5 text-[15px] leading-7 text-white/62 sm:mt-6 sm:text-base sm:leading-8">
              Fitness coaching voor mensen die fitter willen worden, meer structuur willen opbouwen en zich beter willen voelen in het dagelijks leven.
            </p>
            <button
              type="button"
              onClick={onOpenQuiz}
              className={cn(
                primaryButtonClass,
                'mt-6 w-full px-5 py-3 text-[11px] shadow-[0_0_30px_rgba(40,114,250,0.22)] sm:w-auto sm:px-7 sm:py-4 sm:text-sm',
              )}
            >
              Train met My Humble
            </button>
            <div className="mt-6 flex gap-4">
              <SocialButton href="#" label="Instagram" highlighted>
                <IconInstagram />
              </SocialButton>
              <SocialButton href="#" label="TikTok">
                <IconTikTok />
              </SocialButton>
              <SocialButton href="#" label="LinkedIn">
                <IconLinkedIn />
              </SocialButton>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 sm:pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-white/45">Navigatie</p>
            <div className="mt-5 flex flex-col gap-4 text-sm uppercase tracking-[0.18em] text-white/70">
              <a href="#waarom" className="transition hover:text-white">Waarom My Humble</a>
              <a href="#over" className="transition hover:text-white">Over</a>
              <a href="#reviews" className="transition hover:text-white">Reviews</a>
              <a href="#faq" className="transition hover:text-white">FAQ</a>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 sm:pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-white/45">Contact</p>
            <div className="mt-5 flex flex-col gap-4 text-sm text-white/70">
              <a href={`mailto:${COMPANY_EMAIL}`} className="uppercase tracking-[0.18em] transition hover:text-white">
                {COMPANY_EMAIL}
              </a>
              <p className="uppercase tracking-[0.18em] text-white/45">Nederland</p>
              <p className="text-white/60">Burgemeester Molenbroekstraat, Delfgauw</p>
              <p className="leading-7 text-white/55">
                Klaar om te beginnen? Doorloop de intake en kijk welk pakket het beste past bij jouw doel en jouw week.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-5 text-[10px] uppercase tracking-[0.18em] text-white/35 sm:px-8 sm:py-6 sm:text-xs sm:tracking-[0.2em] md:flex-row md:items-center md:justify-between md:px-10 lg:px-12">
          <p>© 2026 My Humble. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <button type="button" onClick={onOpenPrivacy} className="transition hover:text-white/60">
              Privacy
            </button>
            <button type="button" onClick={onOpenConsent} className="transition hover:text-white/60">
              Cookies
            </button>
            <a href="#faq" className="transition hover:text-white/60">Terms</a>
            <a href="#faq" className="transition hover:text-white/60">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
