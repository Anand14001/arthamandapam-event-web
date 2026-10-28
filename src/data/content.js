/**
 * Every string on the page, transcribed from https://arthamandapam.com/events/
 * Line breaks that the original hard-codes with <br> are kept as array items so
 * the rendered line wrapping matches the source exactly.
 */

export const REGISTER_URL =
  'https://forms.zohopublic.in/arthamandapamadvertising1/form/NewForm/formperma/eiZH3k9Enxe_ly9FM1PzNC96lfzlfOStwArzZYWWyrE';

export const PHONE = '+91 78069 68206';
export const PHONE_HREF = 'tel:78069 68206';
export const EMAIL = 'arthamandapam@gmail.com';
export const LOGO = '/assets/images/logo/Arthamandabam-logo.webp';

/* The hero video is a 104 MB MP4. It is streamed from the origin rather than
   vendored into the repo — swap for a local file if you need offline playback. */
export const HERO_VIDEO = 'https://arthamandapam.com/static/assets/videos/season2.mp4';

/* A still lifted from that clip (50 KB). It paints immediately, so the hero is
   never an empty stage while 104 MB of video streams in — and it stands in as
   the hero image entirely under reduced motion. */
export const HERO_POSTER = '/assets/images/events/hero-poster.jpg';

export const HERO = {
  /* The source hard-codes three lines, which splits 'உங்கள் / அடையாளம்.'
     across a break mid-phrase. Two lines keep each phrase whole; the wording is
     unchanged. */
  /* Each line is split so the noun carries the brand accent — the same
     highlight pattern the Journey and Speakers headings use. */
  headingLines: [
    { lead: 'உங்கள் ', accent: 'திறமை.' },
    { lead: 'உங்கள் ', accent: 'அடையாளம்.' },
  ],
  leadBefore: 'Build your personal brand.',
  leadAccent: 'Create impactful content.',
  leadAfter: 'Grow your audience. Turn your passion into opportunities.',
  location: 'MMA Auditorium, Chennai',
  date: '05 December 2026',
  cta: 'Book Your Seat',
  ctaSecondary: "See what's included",
};

/* Credibility cue under the hero CTA. Names three of the eight speakers and
   counts the rest — specific people persuade better than a repeated statistic,
   and it avoids echoing the numbers in the marquee directly below. */
export const HERO_PROOF = {
  line: 'Learn from Anitha Sampath, Surendran, Selventhiran and five more creators.',
};

/* .home-strip renders these as two groups of three. */
export const STRIP_GROUPS = [
  [
    { value: '300+', label: 'Creators Joined' },
    { value: '10+', label: 'Industry Experts' },
    { value: '8+', label: 'Hours of Live Learning' },
  ],
  [
    { value: '100%', label: 'Practical Sessions' },
    { value: '30 Days', label: 'Content Growth Plan' },
    { value: '16+ Years', label: 'Building Brands & Creators' },
  ],
];

/* .home-section-3 renders the same six as individual groups. */
export const TICKER_ITEMS = STRIP_GROUPS.flat();

export const STATS = [
  { icon: 'icon-lamp', target: 300, suffix: '+', label: 'Creators Joined' },
  { icon: 'icon-three-targeting', target: 10, suffix: '+', label: 'Industry Experts' },
  { icon: 'icon-three-team', target: 8, suffix: '+', label: 'Hours of Live Learning' },
  { icon: 'icon-three-telephone', target: 100, suffix: '%', label: 'Practical Sessions' },
  { icon: 'icon-two-social-media', target: 30, suffix: ' Days', label: 'Content Growth Plan' },
  { icon: 'icon-three-trophy', target: 16, suffix: '+ Years', label: 'Building Brands & Creators' },
];

export const JOURNEY = [
  {
    title: 'Discover',
    lines: ['Understand your  ', 'strengths, identify your'],
    rest: ' niche, and gain the confidence to begin your creator journey with clarity.',
  },
  {
    title: 'Create',
    lines: ['Learn practical', ' frameworks to create'],
    rest: ' engaging content that reflects your personality and connects with your audience.',
  },
  {
    title: 'Grow',
    lines: ['Build trust, ', ' expand your reach, and'],
    rest: ' consistently attract the right audience across social media platforms.',
  },
  {
    title: 'Monetise',
    lines: ['Discover how  ', 'creators generate income'],
    rest: ' through brand collaborations, personal branding, products, and services. ',
  },
  {
    title: 'Build Your Brand',
    lines: ['Leave with the confidence,', ' tools, community, and roadmap'],
    rest: ' to continue growing your influence long after the workshop ends.',
  },
];

export const SPEAKERS = [
  {
    img: '/assets/images/events/Harvikash.jpg',
    alt: 'Harivikash',
    name: 'Mr. Harivikash',
    role: 'Founder, ZenVoice | ZenxAI',
  },
  {
    img: '/assets/images/events/Surendar-Gyan.jpg',
    alt: 'Surendran',
    name: 'Mr. Surendran',
    role: 'Founder, Success Gyan',
  },
  {
    img: '/assets/images/events/Anitha-sambath.jpg',
    alt: 'Anitha Sampath',
    name: 'Ms. Anitha Sampath',
    role: 'News Reader | Vlogger | Creator',
  },
  {
    img: '/assets/images/events/Selventhiran.jpg',
    alt: 'Selventhiran',
    name: 'Mr. Selventhiran',
    role: 'Writer | Mentor | Co-Founder, Arthamandapam',
  },
  {
    img: '/assets/images/events/Pragadeesh.jpg',
    alt: 'Pragadeesh',
    name: 'Mr. Pragadeesh',
    role: 'Content Creator | Theneer Idaivelai',
  },
  {
    img: '/assets/images/events/Nivetha.jpeg',
    alt: 'Nivetha',
    name: 'Ms. Nivetha',
    role: 'E Commerce Coach',
  },
  {
    img: '/assets/images/events/Sethu.jpg',
    alt: 'Sethu',
    name: 'Mr. Sethu',
    role: 'Founder | Positive Fitness Studio & Mind Media',
  },
  {
    img: '/assets/images/events/vigneswari.jpeg',
    alt: 'Vigneswari',
    name: 'Ms. Vigneswari Khanna',
    role: 'Leading Tamil Business Coach',
  },
];

export const EXPERIENCE_CARDS = [
  {
    number: '01',
    title: 'Power ',
    accent: 'Learn from Industry Experts',
    body: 'Gain practical insights, proven strategies, and real experiences from creators who have already built successful personal brands.',
  },
  {
    number: '02',
    title: 'Build Powerful  ',
    accent: 'Connections',
    body: 'Meet creators, entrepreneurs, business owners, and future collaborators who can help accelerate your creator journey.',
  },
  {
    number: '03',
    title: 'Hands-on Learning  ',
    accent: 'Sessions',
    body: 'Master practical frameworks, AI tools, and content strategies that you can start applying immediately after the workshop.',
  },
  {
    number: '04',
    title: 'Discover Creator  ',
    accent: 'Income',
    body: 'Learn how successful creators earn through brand partnerships, personal branding, digital products, and multiple income streams.',
  },
  {
    number: '05',
    title: 'Live Q&A with ',
    accent: 'Mentors',
    body: 'Get your questions answered, receive practical guidance, and gain clarity directly from experienced industry experts.',
  },
  {
    number: '06',
    title: 'Exclusive Resources & ',
    accent: 'Bonuses',
    body: 'Take home premium courses, books, creator resources, community access, and a practical action plan for growth.',
  },
];

export const PARTNERS = [
  { img: '/assets/images/clients/wyaan.webp', name: 'Yaan' },
  { img: '/assets/images/clients/dinamalar.webp', name: 'Dinamalar' },
  { img: '/assets/images/clients/55.webp', name: 'Drop Taxi' },
  { img: '/assets/images/clients/Takshashila.png', name: 'Takshashila' },
];

export const PRICING = {
  headingLead: 'Choose Your Creator',
  headingAccent: ' Experience',
  subtext: 'One powerful day. Two ways to accelerate your creator journey.',
  interTitle: 'Not Just Another Creator Workshop',
  body1:
    'This is a practical learning experience designed for creators who want to build better content, communicate with confidence, grow their audience, and turn their knowledge into influence.',
  body2: 'Learn. Create. Connect. And leave with a clear plan for what comes next.',
  standard: {
    title: 'STANDARD PASS',
    subtitle: 'Everything You Need to Start & Grow',
    price: '₹5000/-',
    cta: 'BOOK YOUR SEAT',
    features: [
      'Full-Day High-Impact Creator Workshop',
      'Season 1 Premium Video Course — 2h 50m',
      '3 Bonus Live Masterclasses in Tamil',
      'Personalised 30-Day Content Calendar',
      'Private Influencer WhatsApp Community',
      'Season 2 Video Library Access',
      '2 Bestselling Books — FREE',
      'Premium Welcome Kit',
      'Veg / Non-Veg Buffet Lunch',
    ],
  },
  premium: {
    title: 'PREMIUM PASS',
    subtitle: 'Go Beyond the Workshop Everything in Standard +',
    price: '₹15000/-',
    cta: 'GO PREMIUM',
    badge: 'Limited Premium Seats',
    features: [
      '4 Exclusive Workshops by Selventhiran',
      'How to Read',
      'Public Speaking',
      'How to Write a Nonfiction Book',
      'Kutty Writer Workshop — Bonus Gift',
      'Lifetime access to WhatsApp Community',
    ],
  },
};

export const TESTIMONIAL_VIDEOS = [
  'gR7kEwvNNpQ',
  'nOuY-7g8jfI',
  'qs6Z2y3hwtI',
  'kAHLHeFa0Dw',
  'BYRhrBTmEys',
];

export const FAQS = [
  {
    q: 'Who can attend this workshop?',
    a: "Whether you're a student, professional, entrepreneur, homemaker, freelancer, or aspiring creator, this workshop is designed for anyone who wants to build their personal brand and grow through social media.",
  },
  {
    q: 'Is this workshop suitable for beginners?',
    a: 'Yes. The sessions are structured for both beginners and creators who already have an online presence but want to improve their content and growth.',
  },
  {
    q: 'What language will the workshop be conducted in?',
    a: 'The workshop will be conducted primarily in Tamil, with English terms used where relevant.',
  },
  {
    q: "What's the difference between the Creator Pass and the Creator Elite Pass?",
    a: 'The Creator Elite Pass includes everything in the Creator Pass, along with exclusive online workshops, premium learning resources, bonus courses, books, community access, and extended post-event support.',
  },
  {
    q: 'Will I get lifetime access to the learning resources??',
    a: 'Your access depends on the pass you choose. The Creator Elite Pass includes exclusive online workshops, premium learning resources, and additional post-event content to support your creator journey.',
  },
  {
    q: 'What happens after the workshop?',
    a: "Your creator journey doesn't end when the event does. Depending on your pass, you'll continue learning through exclusive workshops, premium resources, community access, and post-event support designed to help you grow consistently.",
  },
];

export const SOCIALS = [
  { icon: 'fa-brands fa-x-twitter', href: 'https://x.com/selventhiran?lang=en' },
  { icon: 'fab fa-facebook', href: 'https://www.facebook.com/k.selventhiran' },
  { icon: 'fab fa-instagram', href: 'https://www.instagram.com/writer_selventhiran/' },
  {
    icon: 'fab fa-amazon',
    href: 'https://www.amazon.in/stores/author/B085HR1MPM?ingress=0&visitId=c501fd0b-7684-4d9c-9c58-453a1a14c962&ref_=ap_rdr',
  },
  { icon: 'fab fa-youtube', href: '#' },
];

export const OFFICES = [
  {
    city: 'Coimbatore',
    address: '175/N4, Orchids Apartments, Arivoli Nagar, Kovaipudur, Coimbatore - 641042',
  },
  {
    city: 'Chennai',
    address:
      'Rajarathinam Apartments, No 3A 3rd floor, No. 59, T.T.K. Road, Alwarpet, Chennai - 600018',
  },
];

/* Closing call to action — the page's last screen, restating the offer. */
export const FOOTER_CTA = {
  heading: 'Your talent already exists.',
  headingAccent: 'Give it an identity.',
  body: 'One day with the creators who have already built it — and a 30-day content plan you can act on the moment you leave.',
  cta: 'Book Your Seat',
  note: 'Standard ₹5000  ·  Premium ₹15000  ·  Limited premium seats',
};

export const ABOUT_LINE =
  'Delivering consistent growth through strategy, execution, and deep market insight.';

export const LEGAL = [
  { label: 'Terms & Conditions', href: '/terms_and_conditions/' },
  { label: 'Privacy Policy', href: '/privacy_policy/' },
];

/* Mirrors the live Zoho registration form field for field, so the popup asks
   exactly what the real form asks. "Lead Source" is Zoho's own tracking field
   and has a single fixed value, so it is carried as a hidden default rather
   than shown as a one-option dropdown. */
export const REGISTRATION = {
  statuses: [
    'Aspiring Creator',
    'Active creator',
    'Anchor-RJ-media professional',
    'Student',
    'Business owner',
    'Other',
  ],
  passes: [
    { label: 'Standard – ₹5,900', amount: '₹5,900' },
    { label: 'Premium – ₹17,700', amount: '₹17,700' },
  ],
  leadSource: 'Zoho Form - Enrollment Form',
};
