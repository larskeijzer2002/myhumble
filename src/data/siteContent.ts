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
    text: 'Probeer het eerst uit en ervaar meteen wat structuur, begeleiding en duidelijkheid met je doen.',
    image: IMAGES.gym,
  },
  {
    title: 'Training met karakter',
    text: 'Geen verkooppraatjes, maar een aanpak die draait om focus, progressie en blijven opdagen.',
    image: IMAGES.discipline,
  },
  {
    title: 'Gemaakt voor resultaat',
    text: 'Voor mensen die niet alleen fitter willen worden, maar ook sterker in hun dag willen staan.',
    image: IMAGES.transform,
  },
];

export const pillars: Pillar[] = [
  { number: '01', title: 'Discipline', text: 'Je bouwt een ritme op dat ook blijft staan op dagen dat je geen zin hebt.' },
  { number: '02', title: 'Kracht', text: 'Je werkt aan een sterker lichaam met een aanpak die duidelijk en haalbaar is.' },
  { number: '03', title: 'Mindset', text: 'Sport wordt niet iets wat je erbij doet, maar iets wat je echt volhoudt.' },
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
      'Dat hangt af van hoeveel begeleiding je wilt en wat past bij jouw week. My Humble Training is voor persoonlijke coaching in de gym, My Humble Online is voor begeleiding op afstand en My Humble Program is voor mensen die flexibel willen trainen met een duidelijke aanpak in de app.',
  },
  {
    question: 'Hoe werkt de intake via de quiz?',
    answer:
      'Via de quiz laat je weten wat je doel is, waar je nu staat en hoe serieus je aan de slag wilt. Daarna kies je het pakket dat het beste aansluit bij jouw situatie.',
  },
  {
    question: 'Wat is het verschil tussen Training, Online en Program?',
    answer:
      'My Humble Training is het meest persoonlijk en direct. My Humble Online geeft je structuur, check-ins en begeleiding op afstand. My Humble Program is voor mensen die weinig tijd hebben en zelfstandig willen trainen met korte workouts en duidelijke video’s in de app.',
  },
  {
    question: 'Moet ik direct betalen als ik een pakket kies?',
    answer:
      'Nee, dat hoeft niet. Je kunt ervoor kiezen om direct af te rekenen, maar je mag ook wachten tot na de intake. Zo kun je eerst rustig kijken wat het beste bij je past. Daarnaast start je bij My Humble met 14 dagen gratis proberen. Past het toch niet bij je, dan kun je binnen die periode je geld terugkrijgen.',
  },
  {
    question: 'Hoe vaak kan ik personal training doen bij My Humble Training?',
    answer:
      'Bij My Humble Training kun je kiezen voor 1 keer per week, 2 keer per week of 3 keer of vaker. Zo kies je een ritme dat past bij jouw doel en jouw agenda.',
  },
  {
    question: 'Krijg ik een app tijdens mijn traject?',
    answer:
      'Ja. Binnen de trajecten werk je met een app waarin je trainingen kunt inzien, je voeding kunt bijhouden en overzicht houdt op wat je moet doen. Bij Online en Program speelt die app een grote rol in de begeleiding.',
  },
  {
    question: 'Wat gebeurt er nadat ik een pakket heb gekozen?',
    answer:
      'Na je keuze krijg je direct duidelijkheid over de volgende stap. Kies je voor My Humble Training of My Humble Online, dan kun je meteen doorgaan naar de beveiligde betaalpagina of wachten tot na de intake. Kies je voor My Humble Program, dan neemt een trainer eerst contact met je op om alles samen door te nemen. Daarna wordt jouw traject rustig en duidelijk opgestart.',
  },
  {
    question: 'Voor wie is My Humble bedoeld?',
    answer:
      'Voor mensen die voelen dat er meer in zit dan eruit komt. Als je sterker wilt worden, meer energie wilt hebben en klaar bent om echt iets te veranderen in je lichaam en je dagelijks leven, dan is My Humble voor jou. Dit is voor mensen die niet willen blijven twijfelen, maar in actie willen komen.',
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
      'Voor mensen die voelen dat het tijd is om echt werk te maken van hun lichaam, energie en ritme, met persoonlijke coaching die je scherp houdt.',
    forWho:
      'Voor mensen die klaar zijn met aanmodderen en nu willen voelen hoe het is om echt begeleid te worden. Je wilt niet langer twijfelen of half beginnen, maar serieus bouwen aan je lichaam, je mindset en hoe je je elke dag voelt.',
    includes: [
      'Persoonlijke training die volledig is afgestemd op jouw doel en niveau',
      'Meer energie, focus en vertrouwen in je dagelijks leven',
      'Een voedingsplan dat past bij jouw ritme in plaats van ertegenin werkt',
      'Een app waarin je jouw trainingen en voeding makkelijk kunt volgen',
      'Meer structuur, duidelijkheid en motivatie om het vol te houden',
    ],
    outcome:
      'Je merkt niet alleen verschil in de spiegel, maar ook in je energie, je ritme en hoe stevig je in je dag staat.',
    story:
      'Bij My Humble Training werk je met een aanpak die voelt alsof alles eindelijk op zijn plek valt. Je traint 1 of meerdere keren per week met personal training, krijgt een plan op maat en bouwt aan gewoontes die niet na twee weken weer wegvallen. Alles staat overzichtelijk in de app, zodat je precies weet wat je moet doen en waar je naartoe werkt. Dit is voor mensen die niet zomaar willen sporten, maar echt vooruit willen.',
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
      'Voor mensen die zelfstandig willen trainen, maar wel behoefte hebben aan richting, contact en een plan dat ervoor zorgt dat je blijft doorgaan.',
    forWho:
      'Voor mensen die het liefst zelfstandig trainen, maar niet langer alles zelf willen uitzoeken. Je wilt duidelijkheid, een coach die met je meekijkt en een aanpak die je helpt om echt resultaat te boeken.',
    includes: [
      'Een duidelijk trainingsplan in de app dat past bij jouw doel',
      'Meer grip op je voeding zonder onnodige regels en extremen',
      'Wekelijkse check-ins zodat je scherp blijft en niet verslapt',
      'Meer structuur en gewoontes die je ook op lange termijn volhoudt',
    ],
    outcome:
      'Je voelt meer grip, meer rust en meer vertrouwen, omdat je eindelijk weet wat je doet en waarom je het doet.',
    story:
      'Bij My Humble Online train je zelfstandig, maar je staat er niet alleen voor. Via de app zie je precies wat je gaat doen, houd je je voeding bij en blijf je in contact met je coach. Met vaste check-ins kijken we waar je staat, wat beter kan en hoe je door blijft pakken. Dit pakket is voor mensen die vrijheid willen, maar wel de zekerheid van een sterke begeleiding op de achtergrond.',
  },
  {
    key: 'program',
    title: 'My Humble Program',
    tag: 'Nieuw programma',
    image: IMAGES.program,
    description:
      'Voor mensen die fitter en sterker willen worden, maar merken dat tijdgebrek, onrust en gebrek aan ritme steeds in de weg blijven zitten.',
    forWho:
      'Voor mensen die aan hun lichaam en conditie willen werken, maar telkens merken dat een druk leven, weinig structuur of te weinig motivatie het overneemt. Je wilt wel, maar het moet haalbaar blijven.',
    includes: [
      'Korte, duidelijke video workouts in de app die je meteen kunt volgen',
      'Trainingen van maximaal 45 minuten die passen in een volle week',
      'Meer ritme en structuur zonder dat sporten voelt als extra stress',
      'Begeleiding om gemotiveerd te blijven en zichtbaar resultaat op te bouwen',
      'Direct contact met je trainer als je vragen hebt of vastloopt',
      'Een app waarin je ook je voeding en voortgang kunt bijhouden',
    ],
    outcome:
      'Je maakt van sporten weer iets haalbaars, zodat je niet blijft uitstellen maar echt gaat voelen wat regelmaat en resultaat met je doen.',
    story:
      'Bij My Humble Program haal je de drempels weg die normaal in de weg zitten. Je krijgt korte, duidelijke trainingen die je overal kunt doen, zonder dat je uren hoeft vrij te maken of eerst zelf een plan moet bedenken. In de app staat alles voor je klaar en blijf je in contact met je trainer. Dit pakket is gemaakt voor mensen die willen stoppen met uitstellen en een manier zoeken die echt in hun leven past.',
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
