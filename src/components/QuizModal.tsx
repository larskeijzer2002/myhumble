import type { FormEvent, ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import type { PackageKey, PackagePlan, QuizAnswers, QuizStep, TrainingFrequencyKey } from '../data/siteContent';
import { packages } from '../data/siteContent';
import { trackEvent } from '../lib/tracking';
import { cn, ghostButtonClass, primaryButtonClass } from '../lib/utils';

type SubmitStatus = {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
};

type ContactErrors = {
  email?: string;
  phone?: string;
};

type QuizModalProps = {
  isOpen: boolean;
  steps: QuizStep[];
  onClose: () => void;
  onSubmitLead: (answers: QuizAnswers) => Promise<boolean>;
  onSelectPackage: (
    packageKey: PackageKey,
    answers: QuizAnswers,
    trainingFrequency?: TrainingFrequencyKey,
  ) => void | Promise<void>;
};

type PackageOverviewProps = {
  activePackage: PackagePlan | null;
  onBack: () => void;
  onSelectPackage: (
    packageKey: PackageKey,
    answers: QuizAnswers,
    trainingFrequency?: TrainingFrequencyKey,
  ) => void | Promise<void>;
  onOpenPackage: (packageKey: PackageKey) => void;
  answers: QuizAnswers;
};

type PackageDetailSection = 'who' | 'focus' | 'approach';

function PackageDetailPanel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/[0.06] via-black/70 to-black p-7 sm:p-8 lg:p-9">
      <div className="mb-5 text-[11px] font-black uppercase tracking-[0.28em] text-[#2872fa]">{label}</div>
      {children}
    </div>
  );
}

function PackageOverview({ activePackage, onBack, onSelectPackage, onOpenPackage, answers }: PackageOverviewProps) {
  const [activeSection, setActiveSection] = useState<PackageDetailSection>('who');
  const [selectedTrainingFrequency, setSelectedTrainingFrequency] = useState<TrainingFrequencyKey | null>(null);
  const [trainingSelectionError, setTrainingSelectionError] = useState('');

  useEffect(() => {
    setActiveSection('who');
    setSelectedTrainingFrequency(null);
    setTrainingSelectionError('');
  }, [activePackage]);

  useEffect(() => {
    if (activePackage) {
      trackEvent('package_viewed', { package_name: activePackage.key });
    }
  }, [activePackage]);

  if (activePackage) {
    const sectionContent: Record<PackageDetailSection, { label: string; content: ReactNode }> = {
      who: {
        label: 'Voor wie het is',
        content: <p className="text-base leading-8 text-white/80">{activePackage.forWho}</p>,
      },
      focus: {
        label: 'Waar we aan werken',
        content: (
          <ul className="space-y-3 text-base leading-8 text-white/80">
            {activePackage.includes.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        ),
      },
      approach: {
        label: 'Hoe we aan de slag gaan',
        content: <p className="text-base leading-8 text-white/80">{activePackage.story}</p>,
      },
    };

    const sectionTabs: Array<{ key: PackageDetailSection; label: string }> = [
      { key: 'who', label: 'Voor wie het is' },
      { key: 'focus', label: 'Waar we aan werken' },
      { key: 'approach', label: 'Hoe we aan de slag gaan' },
    ];

    return (
      <div className="space-y-6">
        <button type="button" onClick={onBack} className={cn(ghostButtonClass, 'w-full px-5 py-3 text-[11px] sm:w-auto sm:px-7 sm:py-4 sm:text-sm')}>
          Terug naar pakketten
        </button>
        <div className="rounded-[1.9rem] border border-white/10 bg-white/[0.03] p-5 sm:p-8 lg:p-10">
          <div className="relative mb-8 overflow-hidden rounded-[1.6rem] border border-white/10">
            <img src={activePackage.image} alt={activePackage.title} className="h-56 w-full object-cover sm:h-80 lg:h-[26rem]" />
            {activePackage.isNew ? (
              <div className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full border border-[#2872fa]/35 bg-black/65 px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.24em] text-white shadow-[0_0_30px_rgba(40,114,250,0.24)] backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2872fa] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#2872fa]" />
                </span>
                Nieuw traject
              </div>
            ) : null}
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#2872fa]">Traject informatie</p>
              <h3 className="mt-4 text-[2rem] font-black uppercase leading-[1.02] sm:text-5xl sm:leading-tight">{activePackage.title}</h3>
              <p className="mt-3 text-xs font-black uppercase tracking-[0.2em] text-white/45">{activePackage.tag}</p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:mt-6 sm:text-lg sm:leading-9 lg:text-[1.15rem] lg:leading-10">{activePackage.description}</p>

              <div className="scrollbar-none mt-8 flex gap-3 overflow-x-auto pb-1">
                {sectionTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                    onClick={() => setActiveSection(tab.key)}
                    className={cn(
                      'shrink-0 rounded-full border px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] transition sm:text-[11px] sm:tracking-[0.18em]',
                      activeSection === tab.key
                        ? 'border-[#2872fa] bg-[#2872fa] text-white'
                        : 'border-white/10 bg-black/50 text-white/65 hover:border-white/25 hover:text-white',
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <PackageDetailPanel label={sectionContent[activeSection].label}>
                  {sectionContent[activeSection].content}
                </PackageDetailPanel>
              </div>

              {activePackage.key === 'training' && activePackage.trainingFrequencies ? (
                <div className="mt-6">
                  <PackageDetailPanel label="Kies jouw personal training ritme">
                    <div className="grid gap-3">
                      {activePackage.trainingFrequencies.map((option) => (
                        <button
                          key={option.key}
                          type="button"
                          onClick={() => {
                            setSelectedTrainingFrequency(option.key);
                            setTrainingSelectionError('');
                            trackEvent('training_frequency_selected', {
                              package_name: activePackage.key,
                              training_frequency: option.key,
                            });
                          }}
                          className={cn(
                            'rounded-[1.25rem] border px-5 py-4 text-left transition',
                            selectedTrainingFrequency === option.key
                              ? 'border-[#2872fa] bg-[#2872fa]/12'
                              : 'border-white/10 bg-black/40 hover:border-white/25',
                          )}
                        >
                          <p className="text-sm font-black uppercase tracking-[0.16em] text-white">{option.label}</p>
                          <p className="mt-2 text-sm leading-7 text-white/65">{option.description}</p>
                        </button>
                      ))}
                    </div>
                  </PackageDetailPanel>
                </div>
              ) : null}
            </div>

            <div className="space-y-6">
              <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-[#2872fa]/14 via-black to-black p-6 sm:p-7">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white/50">Wat dit oplevert</p>
                <p className="mt-4 text-base leading-8 text-white/80">{activePackage.outcome}</p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-black/55 p-6 sm:p-7">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#2872fa]">Na je aankoop</p>
                <p className="mt-4 text-sm leading-7 text-white/72">
                  Na je aankoop neemt een trainer van My Humble contact met je op om jouw traject op te starten en de
                  volgende stap samen af te stemmen.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-black/60 p-6 sm:p-7">
                <div className="rounded-[1.25rem] border border-[#2872fa]/20 bg-gradient-to-br from-[#2872fa]/18 via-[#0b1220] to-black p-4 sm:p-5">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#2872fa]">Direct starten</p>
                  <h4 className="mt-3 text-xl font-black uppercase leading-tight text-white sm:text-2xl">
                    Klaar om dit traject te claimen?
                  </h4>
                  <p className="mt-4 text-sm leading-7 text-white/72">
                    Kies dit traject als dit aansluit op jouw niveau en de manier waarop jij begeleid wilt worden.
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#2872fa]" />
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/55">
                      Intake, keuze en direct door
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (activePackage.key === 'training' && !selectedTrainingFrequency) {
                        setTrainingSelectionError('Kies eerst hoeveel personal training sessies per week je wilt.');
                        trackEvent('training_frequency_missing', { package_name: activePackage.key });
                        return;
                      }

                      trackEvent('checkout_clicked', {
                        package_name: activePackage.key,
                        training_frequency: selectedTrainingFrequency ?? '',
                      });
                      void onSelectPackage(activePackage.key, answers, selectedTrainingFrequency ?? undefined);
                    }}
                    className={cn(primaryButtonClass, 'w-full px-5 py-3 text-[11px] sm:px-7 sm:py-4 sm:text-sm')}
                  >
                    Kies dit pakket
                  </button>
                  {activePackage.key === 'training' && trainingSelectionError ? (
                    <p className="text-xs uppercase tracking-[0.16em] text-[#2872fa]">
                      {trainingSelectionError}
                    </p>
                  ) : null}
                  <button type="button" onClick={onBack} className={cn(ghostButtonClass, 'w-full px-5 py-3 text-[11px] sm:px-7 sm:py-4 sm:text-sm')}>
                    Bekijk andere pakketten
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {packages.map((pkg) => (
        <div key={pkg.key} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/60 transition hover:border-[#2872fa]">
          <div className="relative">
            <img src={pkg.image} alt={pkg.title} className="h-52 w-full object-cover" />
            {pkg.isNew ? (
              <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-[#2872fa]/35 bg-black/65 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white shadow-[0_0_24px_rgba(40,114,250,0.22)] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2872fa] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2872fa]" />
                </span>
                Nieuw
              </div>
            ) : null}
          </div>
          <div className="p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <button type="button" onClick={() => onOpenPackage(pkg.key)} className="text-left transition hover:opacity-85">
                  <h3 className="text-2xl font-black uppercase">{pkg.title}</h3>
                </button>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-white/45">{pkg.tag}</p>
                <p className="mt-3 max-w-xl text-base leading-8 text-white/65">{pkg.description}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  trackEvent('package_selected', { package_name: pkg.key });
                  if (pkg.key === 'training') {
                    onOpenPackage(pkg.key);
                    return;
                  }

                  trackEvent('checkout_clicked', { package_name: pkg.key });
                  void onSelectPackage(pkg.key, answers);
                }}
                className={cn(primaryButtonClass, 'w-full shrink-0 px-5 py-3 text-[11px] sm:w-auto sm:px-7 sm:py-4 sm:text-sm')}
              >
                {pkg.key === 'training' ? 'Kies jouw ritme' : 'Kies dit pakket'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const initialAnswers: QuizAnswers = {
  goal: '',
  level: '',
  commitment: '',
  gender: '',
  height: '',
  weight: '',
  firstName: '',
  email: '',
  phone: '',
};

function isValidEmail(value: string) {
  const email = value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email)) {
    return false;
  }

  const [, domain = ''] = email.split('@');
  if (domain.includes('..') || email.includes('..')) {
    return false;
  }

  return true;
}

function isValidPhone(value: string) {
  const normalized = value.replace(/[\s\-()]/g, '');

  // Dutch mobile: 06xxxxxxxx, +316xxxxxxxx, 00316xxxxxxxx
  const isDutchMobile = /^(?:\+31|0031|0)6\d{8}$/.test(normalized);

  // Dutch landline: 0101234567, 0151234567, +31151234567, 0031151234567
  const isDutchLandline = /^(?:\+31|0031|0)(?:1\d{8}|[2-5]\d{8}|7\d{8}|8\d{8}|9\d{8})$/.test(normalized);

  return isDutchMobile || isDutchLandline;
}

export function QuizModal({ isOpen, steps, onClose, onSubmitLead, onSelectPackage }: QuizModalProps) {
  const [step, setStep] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<PackageKey | null>(null);
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ type: 'idle', message: '' });
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});
  const showPackages = step >= steps.length;
  const currentStep = steps[step] || null;

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      setSelectedPackage(null);
      setSubmitStatus({ type: 'idle', message: '' });
      setAnswers(initialAnswers);
      setContactErrors({});
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    trackEvent('quiz_step_viewed', {
      quiz_step: showPackages ? 'packages' : currentStep?.key || '',
      quiz_step_index: step + 1,
    });
  }, [isOpen, step, showPackages, currentStep]);

  const activePackage = useMemo(() => packages.find((pkg) => pkg.key === selectedPackage) || null, [selectedPackage]);

  if (!isOpen) {
    return null;
  }

  const isDetailsStep = currentStep?.key === 'details';
  const isProfileStep = currentStep?.key === 'profile';
  const activeChoiceKey =
    currentStep && currentStep.key !== 'details' && currentStep.key !== 'profile' ? currentStep.key : null;
  const hasValidContactDetails =
    Boolean(answers.firstName.trim()) && isValidEmail(answers.email) && isValidPhone(answers.phone);
  const canContinue = isDetailsStep
    ? hasValidContactDetails
    : isProfileStep
      ? Boolean(answers.gender && answers.height && answers.weight)
      : Boolean(activeChoiceKey && answers[activeChoiceKey]);

  function handleAnswer(key: keyof QuizAnswers, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    trackEvent('quiz_answer_selected', { answer_key: key, answer_value: value });

    if (key === 'email' || key === 'phone') {
      setContactErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: ContactErrors = {};

    if (!isValidEmail(answers.email)) {
      nextErrors.email = 'Vul een geldig e-mailadres in.';
    }

    if (!isValidPhone(answers.phone)) {
      nextErrors.phone = 'Vul een geldig Nederlands telefoonnummer in.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setContactErrors(nextErrors);
      return;
    }

    if (!canContinue) return;
    setSubmitStatus({ type: 'loading', message: 'Aanvraag wordt verzonden...' });
    const ok = await onSubmitLead(answers);
    if (ok) {
      trackEvent('quiz_submitted', { status: 'success' });
      setSubmitStatus({ type: 'success', message: 'Top. Kies nu jouw pakket hieronder.' });
      setStep(steps.length);
    } else {
      trackEvent('quiz_submitted', { status: 'error' });
      setSubmitStatus({ type: 'error', message: 'Er ging iets mis met het verzenden van de aanvraag.' });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-6">
      <div className="relative max-h-[96vh] w-full max-w-5xl overflow-y-auto rounded-[1.75rem] border border-white/10 bg-[#050505] p-5 shadow-2xl sm:max-h-[92vh] sm:rounded-[2rem] sm:p-8 lg:p-10">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-lg text-white/70 transition hover:border-white hover:text-white"
        >
          ×
        </button>

        <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="pr-10 sm:pr-0">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/45 sm:text-xs sm:tracking-[0.3em]">{showPackages ? 'Kies jouw pakket' : currentStep?.eyebrow}</p>
            <h2 className="mt-2 text-[1.75rem] font-black uppercase leading-[1.05] sm:text-2xl sm:leading-tight">
              {showPackages ? 'Welke My Humble route past bij jou?' : currentStep?.title}
            </h2>
          </div>
          {!showPackages ? (
            <span className="w-fit shrink-0 rounded-full border border-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/60 sm:text-xs sm:tracking-[0.22em]">
              Stap {step + 1} / {steps.length}
            </span>
          ) : null}
        </div>

        {!showPackages ? (
          <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-[#2872fa] transition-all duration-300" style={{ width: `${(step / steps.length) * 100}%` }} />
          </div>
        ) : null}

        {showPackages ? (
          <PackageOverview
            activePackage={activePackage}
            onBack={() => setSelectedPackage(null)}
            onSelectPackage={onSelectPackage}
            onOpenPackage={setSelectedPackage}
            answers={answers}
          />
        ) : isProfileStep ? (
          <div className="space-y-6">
            <div>
              <p className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-white/50">Geslacht</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {['Man', 'Vrouw', 'Non-binair / anders'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleAnswer('gender', option)}
                    className={cn(
                      'rounded-2xl border px-5 py-4 text-sm font-bold uppercase tracking-[0.16em] transition',
                      answers.gender === option
                        ? 'border-[#2872fa] bg-[#2872fa] text-white'
                        : 'border-white/10 bg-black/70 text-white hover:border-white/30',
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-3 block text-[11px] font-black uppercase tracking-[0.22em] text-white/50">
                  Lengte
                </span>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Bijv. 182"
                    value={answers.height}
                    onChange={(event) => handleAnswer('height', event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/70 px-5 py-4 pr-16 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#2872fa]"
                  />
                  <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-xs font-black uppercase tracking-[0.16em] text-white/35">
                    CM
                  </span>
                </div>
              </label>

              <label className="block">
                <span className="mb-3 block text-[11px] font-black uppercase tracking-[0.22em] text-white/50">
                  Huidig gewicht
                </span>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Bijv. 84"
                    value={answers.weight}
                    onChange={(event) => handleAnswer('weight', event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/70 px-5 py-4 pr-16 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#2872fa]"
                  />
                  <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-xs font-black uppercase tracking-[0.16em] text-white/35">
                    KG
                  </span>
                </div>
              </label>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm leading-7 text-white/65">
                Deze gegevens helpen om je traject beter af te stemmen op jouw startpunt en doelen.
              </p>
            </div>
          </div>
        ) : !isDetailsStep ? (
          <div className="space-y-4">
            {currentStep?.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => activeChoiceKey && handleAnswer(activeChoiceKey, option)}
                className={cn(
                  'w-full rounded-2xl border px-5 py-5 text-left text-sm font-bold uppercase tracking-[0.16em] transition',
                  activeChoiceKey && answers[activeChoiceKey] === option
                    ? 'border-[#2872fa] bg-[#2872fa] text-white'
                    : 'border-white/10 bg-black/70 text-white hover:border-white/30',
                )}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Naam"
              value={answers.firstName}
              onChange={(event) => handleAnswer('firstName', event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/70 px-5 py-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#2872fa]"
            />
            <div>
              <input
                type="email"
                inputMode="email"
                placeholder="Email"
                value={answers.email}
                onChange={(event) => handleAnswer('email', event.target.value)}
                className={cn(
                  'w-full rounded-2xl border bg-black/70 px-5 py-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#2872fa]',
                  contactErrors.email ? 'border-red-500/60' : 'border-white/10',
                )}
              />
              {contactErrors.email ? <p className="mt-2 text-sm text-red-300">{contactErrors.email}</p> : null}
            </div>
            <div>
              <input
                type="tel"
                inputMode="tel"
                placeholder="Telefoon"
                value={answers.phone}
                onChange={(event) => handleAnswer('phone', event.target.value)}
                className={cn(
                  'w-full rounded-2xl border bg-black/70 px-5 py-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#2872fa]',
                  contactErrors.phone ? 'border-red-500/60' : 'border-white/10',
                )}
              />
              {contactErrors.phone ? <p className="mt-2 text-sm text-red-300">{contactErrors.phone}</p> : null}
            </div>
            <button type="submit" className={cn(primaryButtonClass, 'w-full')} disabled={!canContinue || submitStatus.type === 'loading'}>
              {submitStatus.type === 'loading' ? 'Bezig met verzenden...' : 'Verstuur en kies pakket'}
            </button>
          </form>
        )}

        {submitStatus.type !== 'idle' ? (
          <div
            className={cn(
              'mt-4 rounded-2xl border px-4 py-4 text-base leading-8',
              submitStatus.type === 'success' ? 'border-[#2872fa]/40 bg-[#2872fa]/10 text-white' : 'border-red-500/30 bg-red-500/10 text-white',
            )}
          >
            {submitStatus.message}
          </div>
        ) : null}

        {!showPackages ? (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {step > 0 ? (
              <button type="button" onClick={() => setStep((current) => current - 1)} className={ghostButtonClass}>
                Terug
              </button>
            ) : null}
            {step < steps.length - 1 ? (
              <button type="button" className={cn(primaryButtonClass, 'flex-1')} onClick={() => canContinue && setStep((current) => current + 1)}>
                Volgende stap
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
