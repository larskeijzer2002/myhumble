import { motion } from 'framer-motion';
import { IMAGES } from '../data/siteContent';
import { cn, primaryButtonClass } from '../lib/utils';

type HeroProps = {
  onOpenQuiz: () => void;
};

export function Hero({ onOpenQuiz }: HeroProps) {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-black">
      <img
        src={IMAGES.hero}
        alt="Training My Humble"
        className="absolute inset-0 h-full w-full scale-[1.1] object-cover object-[62%_38%] opacity-40 md:object-[68%_36%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-[#2872fa]/20 blur-3xl"
      />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pb-16 pt-32 md:px-10 md:pb-20 md:pt-36 lg:px-16 lg:pb-24 lg:pt-40">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pr-2 text-xs font-semibold uppercase tracking-[0.38em] text-[#2872fa] sm:text-sm sm:tracking-[0.45em]"
          >
            Unleash your inner champion
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-6xl lg:text-8xl"
          >
            Become
            <br />
            your strongest
            <br />
            version
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg"
          >
            My Humble is gebouwd voor mensen die meer willen dan alleen trainen. Dit is waar discipline, kracht en
            karakter samenkomen in een aanpak die je helpt om sterker te leven.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex w-full max-w-2xl flex-col gap-4 sm:flex-row"
          >
            <button type="button" onClick={onOpenQuiz} className={cn(primaryButtonClass, 'sm:min-w-[240px]')}>
              Claim je plek nu
            </button>
            <a
              href="#waarom"
              className={cn(
                'inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-sm font-black uppercase tracking-[0.25em] text-white transition hover:bg-white hover:text-black sm:min-w-[220px]',
              )}
            >
              Ontdek meer
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
