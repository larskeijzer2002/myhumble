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
        className="absolute inset-0 h-full w-full scale-[1.06] object-cover object-[68%_34%] opacity-40 sm:scale-[1.08] md:scale-[1.1] md:object-[68%_36%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-[#2872fa]/20 blur-3xl"
      />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 md:px-10 md:pb-20 md:pt-36 lg:px-16 lg:pb-24 lg:pt-40">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[19rem] pr-2 text-[10px] font-semibold uppercase leading-6 tracking-[0.3em] text-[#2872fa] sm:max-w-none sm:text-sm sm:tracking-[0.45em]"
          >
            Unleash your inner champion
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-5 max-w-[12rem] text-[2.85rem] font-black uppercase leading-[0.9] tracking-tight sm:mt-6 sm:max-w-none sm:text-6xl lg:text-8xl"
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
            className="mt-5 max-w-[21rem] text-[15px] leading-7 text-white/75 sm:mt-6 sm:max-w-2xl sm:text-lg sm:leading-8"
          >
            My Humble is er voor mensen die meer willen dan alleen trainen. Hier draait het om sterker worden, meer
            grip krijgen op je ritme en jezelf serieus nemen.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-2xl sm:flex-row sm:gap-4"
          >
            <button type="button" onClick={onOpenQuiz} className={cn(primaryButtonClass, 'w-full px-5 py-3.5 text-[11px] sm:min-w-[240px] sm:px-7 sm:py-4 sm:text-sm')}>
              Claim je plek nu
            </button>
            <a
              href="#waarom"
              className={cn(
                'inline-flex w-full items-center justify-center rounded-full border border-white/20 px-5 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black sm:min-w-[220px] sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.25em]',
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
