import { useEffect, useState } from 'react';
import { LOGO, REGISTER_URL } from '../data/content';

/**
 * Landing-page header: logo and a single call to action, nothing else.
 *
 * A one-goal page has nothing to navigate to, so site nav would only offer ways
 * to leave. The bar is transparent over the black hero and condenses into a
 * solid blurred strip once the hero scrolls away, which keeps the CTA reachable
 * from any point on a page this long without it competing with the hero.
 */
export default function Header() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-[999] w-full transition-all duration-300 ${
        stuck
          ? 'border-b border-white/10 bg-black/90 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md'
          : 'border-b border-white/5 bg-transparent py-[22px]'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-[55px] max-lg:px-6 max-sm:px-5">
        <a href="/" aria-label="Arthamandapam home" className="shrink-0">
          <img
            src={LOGO}
            alt="Arthamandapam Logo"
            width="155"
            height="55"
            className={`w-auto object-contain transition-all duration-300 ${
              stuck ? 'h-[42px]' : 'h-[55px]'
            } max-sm:h-10`}
          />
        </a>

        <a
          href={REGISTER_URL}
          className="shrink-0 rounded-full border border-brand-alt bg-brand-alt px-7 py-3
                     font-display text-[15px] font-semibold tracking-[0.02em] text-white
                     shadow-[0_6px_20px_rgba(98,37,209,0.35)] transition-all duration-300
                     hover:-translate-y-0.5 hover:bg-white hover:text-brand-alt
                     hover:shadow-[0_10px_28px_rgba(98,37,209,0.45)]
                     max-sm:px-5 max-sm:py-2.5 max-sm:text-[13px]"
        >
          Book Your Seat
        </a>
      </div>
    </header>
  );
}
