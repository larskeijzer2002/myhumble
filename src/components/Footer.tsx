import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { COMPANY_EMAIL, LOGO_SRC } from '../data/siteContent';
import { cn, primaryButtonClass } from '../lib/utils';
import { IconInstagram, IconLinkedIn, IconTikTok } from './icons';

type FooterProps = {
  onOpenQuiz: () => void;
  onOpenPrivacy: () => void;
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

export function Footer({ onOpenQuiz, onOpenPrivacy }: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-white/[0.02] px-6 pb-10 pt-6 md:px-10 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(40,114,250,0.18),_transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-black/55 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#2872fa]/45 to-transparent" />
        <div className="grid gap-10 p-8 md:p-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:p-12">
          <div className="max-w-md">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white p-2">
                <img src={LOGO_SRC} alt="My Humble logo" className="h-full w-full object-contain" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/45">My Humble</p>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-white">Unleash your inner champion</p>
              </div>
            </div>
            <p className="mt-6 text-base leading-8 text-white/62">
              Fitness coaching voor mensen die sterker willen worden in fysiek, discipline en dagelijkse routine.
            </p>
            <button
              type="button"
              onClick={onOpenQuiz}
              className={cn(
                primaryButtonClass,
                'mt-6 px-5 py-3 text-[11px] shadow-[0_0_30px_rgba(40,114,250,0.22)] sm:px-7 sm:py-4 sm:text-sm',
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
          <div className="border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-white/45">Navigatie</p>
            <div className="mt-5 flex flex-col gap-4 text-sm uppercase tracking-[0.18em] text-white/70">
              <a href="#waarom" className="transition hover:text-white">Waarom My Humble</a>
              <a href="#over" className="transition hover:text-white">Over</a>
              <a href="#reviews" className="transition hover:text-white">Reviews</a>
              <a href="#faq" className="transition hover:text-white">FAQ</a>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-white/45">Contact</p>
            <div className="mt-5 flex flex-col gap-4 text-sm text-white/70">
              <a href={`mailto:${COMPANY_EMAIL}`} className="uppercase tracking-[0.18em] transition hover:text-white">
                {COMPANY_EMAIL}
              </a>
              <p className="uppercase tracking-[0.18em] text-white/45">Nederland</p>
              <p className="text-white/60">Burgemeester Molenbroekstraat, Delfgauw</p>
              <p className="leading-7 text-white/55">
                Klaar om de volgende stap te zetten? Doorloop de intake en ontdek welk traject het best past bij jouw doel en ritme.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/10 px-8 py-6 text-xs uppercase tracking-[0.2em] text-white/35 md:flex-row md:items-center md:justify-between md:px-10 lg:px-12">
          <p>© 2026 My Humble. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <button type="button" onClick={onOpenPrivacy} className="transition hover:text-white/60">
              Privacy
            </button>
            <a href="#faq" className="transition hover:text-white/60">Terms</a>
            <a href="#faq" className="transition hover:text-white/60">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
