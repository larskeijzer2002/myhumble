import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { NavBar } from './components/NavBar';
import { PrivacyOverlay } from './components/PrivacyOverlay';
import { QuizModal } from './components/QuizModal';
import { SectionHeader } from './components/SectionHeader';
import { benefits, COMPANY_EMAIL, faqs, IMAGES, pillars, quizSteps, STRIPE_LINKS, testimonials, TRAINING_STRIPE_LINKS, WEB3FORMS_KEY, type PackageKey, type QuizAnswers, type TrainingFrequencyKey } from './data/siteContent';
import { buildTrackedStripeUrl, trackEvent, trackPageView } from './lib/tracking';
import { cn, primaryButtonClass } from './lib/utils';

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

function BenefitSection() {
  return (
    <section id="waarom" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-16">
      <SectionHeader eyebrow="Waarom My Humble" title="Gebouwd voor mensen die sterker willen leven, niet alleen trainen." />
      <div className="grid gap-6 lg:grid-cols-3">
        {benefits.map((benefit, index) => (
          <Reveal key={benefit.title} delay={index * 0.08}>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-[#2872fa]">
              <div className="relative h-56 overflow-hidden">
                <motion.img whileHover={{ scale: 1.06 }} transition={{ duration: 0.5 }} src={benefit.image} alt={benefit.title} className="h-full w-full object-cover opacity-75" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute left-6 top-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2872fa] text-lg font-black text-white">
                  0{index + 1}
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-2xl font-black uppercase">{benefit.title}</h3>
                <p className="mt-4 text-base leading-8 text-white/65">{benefit.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PillarSection() {
  return (
    <section className="border-y border-white/10 bg-white/[0.03]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="De basis"
          title="Drie pijlers waarop My Humble staat."
          description="My Humble draait niet alleen om trainen, maar om het bouwen van discipline, kracht en een standaard die je elke dag met je meedraagt."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.number} className="rounded-[2rem] border border-white/10 bg-black/50 p-7 sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.28em] text-[#2872fa]">{pillar.number}</p>
              <h3 className="mt-5 text-3xl font-black uppercase">{pillar.title}</h3>
              <p className="mt-4 text-base leading-8 text-white/68">{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="over" className="border-y border-white/10 bg-white/[0.03]">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-16 sm:gap-8 sm:px-6 sm:py-20 md:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch lg:px-16">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/50">
          <img
            src={IMAGES.about}
            alt="Lars Keijzer training"
            className="h-[300px] w-full object-cover object-center sm:h-[560px] lg:h-full"
          />
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-black/50 p-6 text-[15px] leading-7 text-white/75 sm:p-10 sm:text-base sm:leading-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#2872fa] sm:text-sm sm:tracking-[0.4em]">Over My Humble</p>
          <h2 className="mt-3 text-[2rem] font-black uppercase leading-[1.02] sm:mt-4 sm:text-5xl sm:leading-tight">Meer dan een sportmerk.</h2>
          <p className="mt-8">Ik ben Lars Keijzer, oprichter van My Humble.</p>
          <p className="mt-6">Van mijn achtste tot mijn achttiende kampte ik met overgewicht. Op mijn zwaarste punt zat ik ongeveer 40 kilo boven een gezond gewicht.</p>
          <p className="mt-6">Tijdens de coronaperiode besloot ik het anders te doen. Geen excuses meer. In acht maanden tijd heb ik ervaren wat discipline, structuur en sport écht kunnen betekenen.</p>
          <p className="mt-6">Na mijn terugkeer in Nederland ontstond My Humble. Vanuit de overtuiging dat iedereen in staat is om een blijvende verandering te maken.</p>
          <p className="mt-6">Mijn doel is simpel: jou helpen om sterker, fitter en zelfverzekerder te worden — op een manier die je volhoudt.</p>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section id="reviews" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-16">
      <SectionHeader eyebrow="Reviews" title="Wat mensen ervaren wanneer ze instappen." />
      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <Reveal key={item.name} delay={index * 0.08}>
            <div className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] via-black/70 to-black p-6 sm:p-7 transition duration-300 hover:-translate-y-1 hover:border-[#2872fa]/50 hover:shadow-[0_18px_50px_rgba(40,114,250,0.12)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(40,114,250,0.14),_transparent_32%)] opacity-80" />
              <div className="relative mb-6 flex items-center justify-between">
                <div className="text-6xl font-black leading-none text-[#2872fa]">“</div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                  Review
                </div>
              </div>
              <div className="relative flex h-full flex-col">
                <p className="text-base leading-7 text-white/82 sm:text-lg sm:leading-8">{item.quote}</p>
                <div className="mt-8 h-px w-full bg-gradient-to-r from-[#2872fa]/50 via-white/10 to-transparent" />
                <div className="mt-auto pt-5">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-white">{item.name}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/45">{item.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  const [activeFaq, setActiveFaq] = useState(0);

  const previousFaq = () => {
    setActiveFaq((current) => (current === 0 ? faqs.length - 1 : current - 1));
  };

  const nextFaq = () => {
    setActiveFaq((current) => (current === faqs.length - 1 ? 0 : current + 1));
  };

  const currentItem = faqs[activeFaq];

  return (
    <section id="faq" className="border-y border-white/10 bg-white/[0.03]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-16">
        <SectionHeader eyebrow="FAQ" title="Helder voordat je jouw volgende stap zet." />
        <div className="rounded-[2rem] border border-white/10 bg-black/50 p-5 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2872fa] sm:text-[11px] sm:tracking-[0.24em]">
                Vraag {activeFaq + 1} / {faqs.length}
              </p>
              <h3 className="mt-3 text-[1.75rem] font-black uppercase leading-[1.05] sm:mt-4 sm:text-4xl sm:leading-tight">
                {currentItem.question}
              </h3>
              <p className="mt-4 max-w-2xl text-[15px] leading-7 text-white/72 sm:mt-5 sm:text-lg sm:leading-8">
                {currentItem.answer}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={previousFaq}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xl text-white transition hover:border-[#2872fa] hover:text-[#2872fa]"
                aria-label="Vorige vraag"
              >
                ←
              </button>
              <button
                type="button"
                onClick={nextFaq}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xl text-white transition hover:border-[#2872fa] hover:text-[#2872fa]"
                aria-label="Volgende vraag"
              >
                →
              </button>
            </div>
          </div>

          <div className="scrollbar-none mt-8 flex gap-3 overflow-x-auto pb-1">
            {faqs.map((item, index) => (
              <button
                key={item.question}
                type="button"
                onClick={() => setActiveFaq(index)}
                className={cn(
                  'shrink-0 rounded-full border px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] transition sm:text-[11px] sm:tracking-[0.16em]',
                  activeFaq === index
                    ? 'border-[#2872fa] bg-[#2872fa] text-white'
                    : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white',
                )}
              >
                {item.question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaSection({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-16">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#2872fa]/20 via-black to-black sm:rounded-[2.5rem]">
        <div className="grid lg:grid-cols-[1fr_0.9fr] lg:items-stretch">
          <div className="p-6 sm:p-12 lg:p-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60 sm:text-sm sm:tracking-[0.4em]">Start jouw intake</p>
            <h2 className="mt-3 text-[2rem] font-black uppercase leading-[1.02] sm:mt-4 sm:text-5xl sm:leading-tight">Klaar om sterker te leven?</h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-white/72 sm:mt-5 sm:text-base">
              Zet vandaag de eerste stap en ontdek welk traject past bij jouw doel, jouw ritme en de manier waarop jij wilt groeien.
            </p>
            <button
              type="button"
              onClick={onOpenQuiz}
              className={cn(
                primaryButtonClass,
                'mt-7 w-full px-5 py-3 text-[11px] shadow-[0_0_30px_rgba(40,114,250,0.22)] sm:mt-8 sm:w-auto sm:px-7 sm:py-4 sm:text-sm',
              )}
            >
              Train met My Humble
            </button>
          </div>
          <div className="relative min-h-[240px] overflow-hidden sm:min-h-[320px]">
            <motion.img whileHover={{ scale: 1.04 }} transition={{ duration: 0.6 }} src={IMAGES.discipline} alt="My Humble training call to action" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-black/20 to-black/60" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SportLandingPage() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [programNotice, setProgramNotice] = useState<{
    type: 'success' | 'error';
    title: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    function handleRouteTracking() {
      trackPageView('My Humble');
      if (window.location.hash) {
        trackEvent('section_viewed', { section_name: window.location.hash.replace('#', '') });
      }
    }

    handleRouteTracking();
    window.addEventListener('hashchange', handleRouteTracking);
    return () => window.removeEventListener('hashchange', handleRouteTracking);
  }, []);

  useEffect(() => {
    if (quizOpen) {
      trackEvent('quiz_opened');
    }
  }, [quizOpen]);

  useEffect(() => {
    if (privacyOpen) {
      trackEvent('privacy_opened');
    }
  }, [privacyOpen]);

  async function submitLead(answers: QuizAnswers) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'Nieuwe My Humble trial aanvraag',
          from_name: 'My Humble Website',
          replyto: answers.email,
          name: answers.firstName,
          email: answers.email,
          phone: answers.phone,
          email_to: COMPANY_EMAIL,
          message:
            `Nieuwe aanvraag voor My Humble.\n\n` +
            `Naam: ${answers.firstName}\n` +
            `Email: ${answers.email}\n` +
            `Telefoon: ${answers.phone}\n\n` +
            `Geslacht: ${answers.gender}\n` +
            `Lengte: ${answers.height} cm\n` +
            `Gewicht: ${answers.weight} kg\n\n` +
            `Doel: ${answers.goal}\n` +
            `Niveau: ${answers.level}\n` +
            `Commitment: ${answers.commitment}`,
        }),
      });
      const json = (await response.json()) as { success?: boolean };
      trackEvent('lead_submitted', { lead_type: 'quiz', status: json.success ? 'success' : 'error' });
      return Boolean(json.success);
    } catch {
      trackEvent('lead_submitted', { lead_type: 'quiz', status: 'error' });
      return false;
    }
  }

  async function goToStripe(packageKey: PackageKey, answers: QuizAnswers, trainingFrequency?: TrainingFrequencyKey) {
    if (packageKey === 'program') {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: 'My Humble Program contactverzoek',
            from_name: 'My Humble Website',
            replyto: answers.email,
            name: answers.firstName,
            email: answers.email,
            phone: answers.phone,
            email_to: COMPANY_EMAIL,
            message:
              `Nieuwe aanvraag voor My Humble Program.\n\n` +
              `Naam: ${answers.firstName}\n` +
              `Email: ${answers.email}\n` +
              `Telefoon: ${answers.phone}\n\n` +
              `Geslacht: ${answers.gender}\n` +
              `Lengte: ${answers.height} cm\n` +
              `Gewicht: ${answers.weight} kg\n\n` +
              `Doel: ${answers.goal}\n` +
              `Niveau: ${answers.level}\n` +
              `Commitment: ${answers.commitment}\n\n` +
              `Actie: Bezoeker heeft gekozen voor My Humble Program en verwacht contact van een trainer.`,
          }),
        });

        const json = (await response.json()) as { success?: boolean };

        if (json.success) {
          setQuizOpen(false);
          trackEvent('program_contact_requested', { status: 'success' });
          setProgramNotice({
            type: 'success',
            title: 'Aanvraag ontvangen',
            message:
              'Dank voor je aanvraag. Een trainer van My Humble neemt op korte termijn contact met je op om het vervolg van jouw traject persoonlijk met je af te stemmen.',
          });
          return;
        }
      } catch {
        trackEvent('program_contact_requested', { status: 'error' });
        setProgramNotice({
          type: 'error',
          title: 'Aanvraag niet verwerkt',
          message:
            'Er ging iets mis bij het verwerken van je aanvraag. Probeer het opnieuw of neem direct contact op via info@myhumble.nl.',
        });
        return;
      }

      setProgramNotice({
        type: 'error',
        title: 'Aanvraag niet verwerkt',
        message:
          'Er ging iets mis bij het verwerken van je aanvraag. Probeer het opnieuw of neem direct contact op via info@myhumble.nl.',
      });
      return;
    }

    const url =
      packageKey === 'training'
        ? (trainingFrequency ? TRAINING_STRIPE_LINKS[trainingFrequency] : '')
        : STRIPE_LINKS[packageKey];

    if (!url || url.includes('REPLACE_')) {
      window.alert(
        packageKey === 'training'
          ? 'Vul eerst je echte Stripe-betaallink in voor deze trainingsfrequentie.'
          : 'Vul eerst je echte Stripe-betaallink in voor dit pakket.',
      );
      return;
    }
    const trackedUrl = buildTrackedStripeUrl(url, {
      mh_package: packageKey,
      mh_training_frequency: trainingFrequency,
    });
    window.location.assign(trackedUrl);
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#2872fa] selection:text-white">
      <NavBar onOpenQuiz={() => setQuizOpen(true)} />
      <Hero onOpenQuiz={() => setQuizOpen(true)} />
      <BenefitSection />
      <PillarSection />
      <AboutSection />
      <CtaSection onOpenQuiz={() => setQuizOpen(true)} />
      <ReviewsSection />
      <FaqSection />
      <Footer onOpenQuiz={() => setQuizOpen(true)} onOpenPrivacy={() => setPrivacyOpen(true)} />

      <AnimatePresence>{quizOpen ? <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} onSubmitLead={submitLead} onSelectPackage={goToStripe} steps={quizSteps} /> : null}</AnimatePresence>

      <AnimatePresence>{privacyOpen ? <PrivacyOverlay onClose={() => setPrivacyOpen(false)} /> : null}</AnimatePresence>

      <AnimatePresence>
        {programNotice ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-[#07090d] p-8 shadow-2xl"
            >
              <div
                className={cn(
                  'inline-flex rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em]',
                  programNotice.type === 'success'
                    ? 'border-[#2872fa]/40 bg-[#2872fa]/12 text-[#2872fa]'
                    : 'border-red-500/30 bg-red-500/10 text-red-300',
                )}
              >
                {programNotice.title}
              </div>
              <h3 className="mt-5 text-3xl font-black uppercase leading-tight text-white">
                {programNotice.type === 'success' ? 'We nemen contact met je op' : 'Er is iets misgegaan'}
              </h3>
              <p className="mt-5 text-base leading-8 text-white/72">{programNotice.message}</p>
              <button
                type="button"
                onClick={() => setProgramNotice(null)}
                className={cn(primaryButtonClass, 'mt-8 px-5 py-3 text-[11px] sm:px-7 sm:py-4 sm:text-sm')}
              >
                Sluiten
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
