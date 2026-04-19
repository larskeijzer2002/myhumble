export const WEB3FORMS_KEY = '8bc1da31-f069-480a-9197-408c6464efab';
export const COMPANY_EMAIL = 'info@myhumble.nl';

export const STRIPE_LINKS = {
  online: 'https://buy.stripe.com/14A00j9dgeKoa5V7cr8EM05',
  program: 'https://buy.stripe.com/REPLACE_PROGRAM_LINK',
} as const;

export const TRAINING_STRIPE_LINKS = {
  once: 'https://buy.stripe.com/3cIdR91KO1XC1zpcwL8EM02',
  twice: 'https://buy.stripe.com/bJe8wPgFI45KembdAP8EM03',
  threePlus: 'https://buy.stripe.com/14AcN5exAgSwdi7bsH8EM04',
} as const;

export const LOGO_SRC = '/assets/my-humble-logo.jpg';

export const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=80',
  about: '/assets/my-humble-hero.jpg',
  transform: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
  gym: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
  discipline: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80',
  online: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
  program: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=1200&q=80',
} as const;

export type Benefit = {
  title: string;
  text: string;
  image: string;
};

export type Pillar = {
  number: string;
  title: string;
  text: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  image: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type QuizStep = {
  key: 'goal' | 'level' | 'commitment' | 'profile' | 'details';
  eyebrow: string;
  title: string;
  options: string[];
};

export type PackageKey = 'training' | keyof typeof STRIPE_LINKS;
export type TrainingFrequencyKey = keyof typeof TRAINING_STRIPE_LINKS;

export type TrainingFrequencyOption = {
  key: TrainingFrequencyKey;
  label: string;
  description: string;
};

export type PackagePlan = {
  key: PackageKey;
  title: string;
  tag: string;
  image: string;
  description: string;
  forWho: string;
  includes: string[];
  outcome: string;
  story: string;
  isNew?: boolean;
  trainingFrequencies?: TrainingFrequencyOption[];
};

export type VideoSlot = {
  title: string;
  subtitle: string;
  poster: string;
  badge: string;
};

export type QuizAnswers = {
  goal: string;
  level: string;
  commitment: string;
  gender: string;
  height: string;
  weight: string;
  firstName: string;
  email: string;
  phone: string;
};

export const navItems = [
  { label: 'Waarom', href: '#waarom' },
  { label: 'Over', href: '#over' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
];

export const benefits: Benefit[] = [
  {
    title: '14 dagen gratis proberen',
    text: 'Ervaar direct hoe structuur, begeleiding en focus samenkomen in een aanpak die je sterker laat starten.',
    image: IMAGES.gym,
  },
  {
    title: 'Training met karakter',
    text: 'Geen ruis en geen loze beloftes, maar een sterke aanpak die draait om focus, progressie en consistentie.',
    image: IMAGES.discipline,
  },
  {
    title: 'Gemaakt voor resultaat',
    text: 'Voor mensen die niet alleen fitter willen worden, maar ook sterker willen komen opdagen in het dagelijks leven.',
    image: IMAGES.transform,
  },
];

export const pillars: Pillar[] = [
  { number: '01', title: 'Discipline', text: 'Je bouwt een routine die blijft staan, ook op dagen dat motivatie ontbreekt.' },
  { number: '02', title: 'Kracht', text: 'My Humble helpt je fysiek sterker te worden met duidelijke structuur en intentie.' },
  { number: '03', title: 'Mindset', text: 'Training wordt hier meer dan beweging. Het wordt een standaard voor hoe jij leeft.' },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      'My Humble heeft mij niet alleen fysiek geholpen door 10 kilo aan te komen, maar ook om meer energie gedurende de dag te hebben. Die combinatie maakt voor mij echt het verschil.',
    name: 'Ruben',
    role: 'Sporter bij My Humble',
    image: IMAGES.gym,
  },
  {
    quote:
      'Door de drukte had ik vaak geen tijd om zelf uit te zoeken wat ik precies moest doen in de sportschool. Bij My Humble heb ik die duidelijkheid wel, waardoor ik veel meer uit mijn trainingen haal dan wanneer ik zelf maar wat zou doen.',
    name: 'Jordi',
    role: 'Sporter bij My Humble',
    image: IMAGES.online,
  },
  {
    quote:
      'Door het traject bij My Humble ben ik 16 kilo afgevallen. Ik merk vooral dat ik veel actiever ben geworden en gedurende de dag steeds meer kan doen zonder dat het me direct leegtrekt.',
    name: 'Ronald',
    role: 'Sporter bij My Humble',
    image: IMAGES.program,
  },
];

export const faqs: Faq[] = [
  {
    question: 'Welk pakket past het best bij mij?',
    answer:
      'Dat hangt af van hoeveel begeleiding je wilt en hoe je het liefst traint. My Humble Training is voor directe 1-op-1 coaching, My Humble Online voor begeleiding op afstand en My Humble Program voor mensen die flexibel willen starten en toch persoonlijk contact willen behouden.',
  },
  {
    question: 'Hoe werkt de intake via de quiz?',
    answer:
      'Via de quiz geef je aan wat je doel is, waar je nu staat en hoe serieus je jouw volgende niveau neemt. Op basis daarvan kies je het traject dat het best aansluit op jouw situatie.',
  },
  {
    question: 'Wat is het verschil tussen Training, Online en Program?',
    answer:
      'My Humble Training is het meest persoonlijk en hands-on. My Humble Online geeft je structuur en begeleiding op afstand. My Humble Program is bedoeld voor mensen die zelfstandig willen starten, maar wel contact en richting vanuit My Humble willen behouden.',
  },
  {
    question: 'Moet ik direct betalen als ik een pakket kies?',
    answer:
      'Voor My Humble Training en My Humble Online ga je na je keuze door naar de betaalpagina. Kies je My Humble Program, dan neemt een trainer eerst contact met je op om de volgende stap samen af te stemmen.',
  },
  {
    question: 'Voor wie is My Humble bedoeld?',
    answer: 'Voor mensen die serieus willen bouwen aan discipline, kracht, routine en een sterkere versie van zichzelf.',
  },
  {
    question: 'Krijg ik persoonlijke begeleiding tijdens mijn traject?',
    answer:
      'Ja. De vorm verschilt per pakket, maar elk traject is gebouwd om je duidelijke richting, accountability en voortgang te geven. Hoe intensiever het pakket, hoe directer de begeleiding.',
  },
  {
    question: 'Wat gebeurt er nadat ik mijn keuze heb gemaakt?',
    answer:
      'Na je keuze en aankoop volgt altijd de volgende stap vanuit My Humble. Een trainer neemt contact met je op om jouw traject goed op te starten, verwachtingen af te stemmen en je verder te begeleiden.',
  },
];

export const quizSteps: QuizStep[] = [
  {
    key: 'goal',
    eyebrow: 'Application quiz',
    title: 'Wat wil je met My Humble bereiken?',
    options: ['Spiermassa opbouwen', 'Sterker en fitter worden', 'Discipline en routine bouwen'],
  },
  {
    key: 'level',
    eyebrow: 'Jouw niveau',
    title: 'Waar sta je nu?',
    options: ['Ik begin net', 'Ik train al regelmatig', 'Ik wil serieus doorgroeien'],
  },
  {
    key: 'commitment',
    eyebrow: 'Commitment',
    title: 'Hoe serieus ben je over je volgende niveau?',
    options: ['Ik wil rustig starten', 'Ik ben klaar voor structuur', 'Ik ga all-in op progressie'],
  },
  {
    key: 'profile',
    eyebrow: 'Jouw profiel',
    title: 'Vertel kort iets over jezelf.',
    options: [],
  },
  {
    key: 'details',
    eyebrow: 'Laatste stap',
    title: 'Laat je gegevens achter en zet jouw volgende stap.',
    options: [],
  },
];

export const packages: PackagePlan[] = [
  {
    key: 'training',
    title: 'My Humble Training',
    tag: '1-op-1 coaching',
    image: IMAGES.transform,
    description:
      'Een persoonlijk coachingstraject voor mensen die serieus willen investeren in een sterker lichaam, meer energie en een standaard die ook buiten de gym voelbaar is.',
    forWho:
      'Voor mensen die klaar zijn met half werk en gericht willen bouwen aan hun fysiek, mindset en dagelijkse discipline met persoonlijke begeleiding in een prive gym.',
    includes: [
      'Het verbeteren van je fysiek met een gerichte en persoonlijke aanpak',
      'Meer energie en focus gedurende de dag',
      'Een voedingsplan dat aansluit op jouw leefritme en doelen',
      'Je trainingen en voeding makkelijk inzien en bijhouden in de app die je krijgt',
      'Het opbouwen van structuur, discipline en blijvende motivatie',
    ],
    outcome:
      'Je ontwikkelt een sterker lichaam, meer mentale weerbaarheid en een ritme dat je helpt om consistent te presteren in training en dagelijks leven.',
    story:
      'Binnen My Humble Training werk je zelfstandig onder gerichte begeleiding aan het verbeteren van je fysieke en mentale doelen. Met 1 of meerdere personal training sessies per week, een trainingsschema op maat, een voedingsplan dat past bij jouw patroon en coaching op mindset bouwen we aan resultaat dat zichtbaar is in je lichaam en merkbaar in hoe jij je voelt, beweegt en leeft. Daarnaast krijg je toegang tot een app waarin je jouw trainingen en voeding gemakkelijk kunt inzien en bijhouden, zodat je altijd overzicht houdt op wat er van je verwacht wordt. Dit traject is gemaakt voor mensen die niet zomaar willen trainen, maar gericht willen doorgroeien.',
    trainingFrequencies: [
      {
        key: 'once',
        label: '1x per week',
        description: 'Voor wie een sterke basis wil bouwen met een vaste wekelijkse personal training sessie.',
      },
      {
        key: 'twice',
        label: '2x per week',
        description: 'Voor wie meer ritme, snellere progressie en extra begeleiding wil in de week.',
      },
      {
        key: 'threePlus',
        label: '3+ keer per week',
        description: 'Voor wie maximaal wil investeren in begeleiding, structuur en fysieke vooruitgang.',
      },
    ],
  },
  {
    key: 'online',
    title: 'My Humble Online',
    tag: 'Online begeleiding',
    image: IMAGES.online,
    description:
      'Een online coachingstraject voor mensen die serieus resultaat willen boeken met een duidelijke aanpak, persoonlijke begeleiding en directe accountability.',
    forWho:
      'Voor mensen die zelfstandig willen trainen, maar niet willen blijven zoeken, twijfelen of uitstellen en juist behoefte hebben aan een sterk plan en een coach die hen scherp houdt.',
    includes: [
      'Gericht werken aan fysieke doelen met een duidelijk trainingsplan in de app',
      'Grip krijgen op voeding en ontdekken wat echt past bij jouw leefritme',
      'Wekelijkse check-ins voor accountability, scherpte en voortgang',
      'Bouwen aan discipline, mindset en gewoontes die je volhoudt',
    ],
    outcome:
      'Je creëert fysiek resultaat, meer structuur en een aanpak die niet extreem is, maar wel sterk genoeg om echte progressie af te dwingen.',
    story:
      'Binnen My Humble Online werk je zelfstandig onder gerichte begeleiding aan het behalen van je fysieke doelen. Via de app krijg je direct inzicht in wat je gaat trainen, hoe je jouw voeding kunt bijhouden en blijf je in contact met je coach, zodat je niet zelf hoeft uit te zoeken wat werkt. Met wekelijkse check-ins houden we je accountable, sturen we bij waar nodig en bouwen we aan resultaat dat zichtbaar is in je lichaam en merkbaar in hoe jij je voelt en presteert. We werken niet met extreme regels, maar met een aanpak die past bij jouw leven en die je helpt om sterker te worden in fysiek, discipline en mindset.',
  },
  {
    key: 'program',
    title: 'My Humble Program',
    tag: 'Nieuw programma',
    image: IMAGES.program,
    description:
      'Een nieuw coachingstraject voor mensen die serieus fitter en sterker willen worden met een praktische aanpak die overal te volgen is en direct uitvoerbaar voelt.',
    forWho:
      'Voor mensen die willen werken aan hun lichaam en conditie, maar niet afhankelijk willen zijn van een sportschool, weinig tijd hebben of liever trainen zonder drukte en afleiding.',
    includes: [
      'Kant-en-klare video workouts in de app die je direct kunt volgen',
      'Trainingen van maximaal 45 minuten die passen in een druk leven',
      'Direct contact met je trainer voor vragen, feedback en begeleiding',
      'Voeding bijhouden en inzicht krijgen via de app',
    ],
    outcome:
      'Je maakt sporten haalbaar, consistent en resultaatgericht, zodat je ook met een volle agenda kunt bouwen aan een fitter, sterker en energieker lichaam.',
    story:
      'Binnen My Humble Program werk je zelfstandig onder gerichte begeleiding aan het behalen van je fysieke doelen, zonder afhankelijk te zijn van tijd, locatie of drukte in een sportschool. Via de app krijg je direct toegang tot kant-en-klare video trainingen die overal te volgen zijn en bewust zijn opgebouwd om praktisch, overzichtelijk en effectief te blijven. Met sessies van maximaal 45 minuten wordt sporten ook haalbaar wanneer je agenda vol zit, terwijl je tegelijk verbonden blijft met jouw trainer voor vragen, begeleiding en extra scherpte. In dezelfde app kun je jouw voeding eenvoudig bijhouden en daar meer inzicht in krijgen. Dit traject is nieuw binnen My Humble en gemaakt voor mensen die resultaat willen boeken met een aanpak die echt past binnen het dagelijks leven.',
    isNew: true,
  },
];

export const videoSlots: VideoSlot[] = [
  { title: 'Discipline in motion', subtitle: 'Hero reel / brand video', poster: IMAGES.hero, badge: 'Video 01' },
  { title: 'Coaching & presence', subtitle: '1-op-1 training sfeer', poster: IMAGES.about, badge: 'Video 02' },
  { title: 'Results & intensity', subtitle: 'Transformatie / social proof', poster: IMAGES.transform, badge: 'Video 03' },
];

export const marqueeWords = ['Discipline', 'Strength', 'Focus', 'Structure', 'Results', 'Mindset', 'Routine', 'Presence'];

export const privacySections = [
  {
    title: 'Gegevens die we verzamelen',
    text: 'Wanneer je je aanmeldt verzamelen we je naam, e-mailadres en telefoonnummer.',
  },
  {
    title: 'Hoe we je gegevens gebruiken',
    text: 'We gebruiken jouw gegevens om contact met je op te nemen en je aanvraag te verwerken.',
  },
  {
    title: 'Jouw rechten',
    text: 'Neem contact op via info@myhumble.nl voor inzage, wijziging of verwijdering.',
  },
];
