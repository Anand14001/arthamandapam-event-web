import { useEffect, useState } from 'react';
import { HERO, LOGO } from '../data/content';
import { subscribeScroll } from '../lib/smoothScroll';
import { useRegistration } from './RegistrationProvider';

/* Short labels on purpose — a nav bar is scanned, not read. Each points at a
   section anchor; Lenis handles the smooth jump and the header offset. */
const LINKS = [
  { href: '#speakers', label: 'Speakers' },
  { href: '#event', label: 'The Event' },
  { href: '#passes', label: 'Passes' },
  { href: '#stories', label: 'Stories' },
  { href: '#faq', label: 'FAQ' },
];

const SECTION_IDS = LINKS.map((l) => l.href.slice(1));

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-[14px] w-[14px] transition-transform duration-300 group-hover/cta:translate-x-1"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * Landing-page header.
 *
 * Transparent over the black hero, condensing into a solid blurred bar once it
 * scrolls away. Section links sit in the middle and the registration CTA holds
 * the right edge, so the one action the page exists for is always within reach.
 *
 * The CTA opens the registration dialog rather than navigating, and carries the
 * event date beside it — a real fact that does more work than an exclamation
 * mark would. It is styled unlike anything else in the bar so it reads as the
 * action, not another link.
 *
 * The active link is tracked from the page's own scroll subscription rather
 * than IntersectionObserver, which Lenis's coalesced scroll events make
 * unreliable.
 */
export default function Header() {
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useRegistration();

  useEffect(
    () =>
      subscribeScroll(() => {
        setStuck(window.scrollY > 40);

        // The section whose top has most recently passed under the header.
        let current = '';
        for (const id of SECTION_IDS) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 140) current = id;
        }
        setActive(current);
      }),
    [],
  );

  // Escape closes the mobile panel.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const solid = stuck || menuOpen;

  return (
    <header
      className={`fixed left-0 top-0 z-[999] w-full transition-all duration-300 ${
        solid
          ? 'border-b border-white/10 bg-black/90 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md'
          : 'border-b border-white/5 bg-transparent py-[18px]'
      }`}
    >
      <div className="container-page flex items-center justify-between gap-6 max-sm:gap-3">
        <a href="/" aria-label="Arthamandapam home" className="shrink-0">
          <img
            src={LOGO}
            alt="Arthamandapam Logo"
            width="155"
            height="55"
            className={`w-auto object-contain transition-all duration-300 ${
              solid ? 'h-[40px]' : 'h-[50px]'
            } max-sm:h-8`}
          />
        </a>

        {/* desktop links */}
        <nav aria-label="Sections" className="max-lg:hidden">
          <ul className="flex items-center gap-7">
            {LINKS.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative font-display text-[13.5px] font-medium tracking-[0.02em]
                                transition-colors duration-200
                                after:absolute after:-bottom-1.5 after:left-0 after:h-[2px]
                                after:rounded-full after:bg-brand-alt after:transition-all
                                after:duration-300 after:content-['']
                                ${
                                  isActive
                                    ? 'text-white after:w-full'
                                    : 'text-white/65 after:w-0 hover:text-white hover:after:w-full'
                                }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-4 max-sm:gap-2">
          {/* The date earns its place: it is the reason to act now. */}
          <span className="font-display text-[11px] font-medium uppercase tracking-[0.16em] text-white/50 max-xl:hidden">
            {HERO.date}
          </span>

          <button
            type="button"
            onClick={open}
            className="group/cta flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#7a33e0_0%,#6222cc_55%,#4a18a0_100%)]
                       px-6 py-[11px] font-display text-[13.5px] font-bold tracking-[0.02em]
                       text-white shadow-[0_8px_26px_rgba(98,37,209,0.5)] transition-all duration-300
                       hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(98,37,209,0.65)]
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4
                       focus-visible:outline-white max-sm:px-4 max-sm:text-[12.5px]"
          >
            <span className="max-sm:hidden">Reserve Your Seat</span>
            <span className="sm:hidden">Reserve</span>
            <span className="max-sm:hidden">
              <ArrowIcon />
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="header-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="hidden h-10 w-10 items-center justify-center rounded-full border
                       border-white/20 text-white transition-colors duration-200
                       hover:border-white/50 focus-visible:outline focus-visible:outline-2
                       focus-visible:outline-offset-2 focus-visible:outline-white max-lg:flex"
          >
            <span className="relative block h-[14px] w-[18px]">
              <span
                className={`absolute left-0 h-[2px] w-full rounded bg-current transition-all duration-300
                            ${menuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded bg-current
                            transition-opacity duration-200 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              <span
                className={`absolute left-0 h-[2px] w-full rounded bg-current transition-all duration-300
                            ${menuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* mobile panel */}
      <div
        id="header-menu"
        className={`overflow-hidden transition-[max-height,opacity] duration-300 lg:hidden
                    ${menuOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <nav aria-label="Sections" className="container-page pb-5 pt-4">
          <ul className="flex flex-col">
            {LINKS.map((link) => (
              <li key={link.href} className="border-b border-white/10 last:border-b-0">
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-3 font-display text-[15px] font-medium transition-colors
                              duration-200 ${
                                active === link.href.slice(1)
                                  ? 'text-brand-alt'
                                  : 'text-white/80 hover:text-white'
                              }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-4 font-display text-[11px] uppercase tracking-[0.16em] text-white/45">
            {HERO.date} · {HERO.location}
          </p>
        </nav>
      </div>
    </header>
  );
}
