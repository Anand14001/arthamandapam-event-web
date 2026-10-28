import { useEffect, useState } from 'react';
import { getLenis, subscribeScroll } from '../lib/smoothScroll';

/** .scroll-to-top — 45px purple disc, bottom right, revealed once past the fold. */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => subscribeScroll(() => setVisible(window.scrollY > 500)), []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => {
        // Lenis owns the scroll position; a native smooth scroll would be
        // overridden by it on the next frame.
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="fixed bottom-10 right-10 z-[99] h-[45px] w-[45px] rounded-full bg-brand
                 text-center transition-all duration-[400ms] hover:bg-ink"
    >
      <i className="fa fa-angle-up text-lg leading-[45px] text-white" />
    </button>
  );
}
