import { useEffect, useRef } from 'react';
import { subscribeScroll } from '../lib/smoothScroll';

/**
 * A hairline progress bar across the top of the viewport.
 *
 * This page is long — roughly ten screens — and a fixed header gives no sense
 * of how much is left. The bar answers that in the cheapest way possible.
 *
 * It writes `scaleX` straight to the node rather than going through React
 * state: this updates on every frame of the scroll, and re-rendering a
 * component sixty times a second to move one bar would be wasteful.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const bar = barRef.current;
      if (!bar) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    return subscribeScroll(update);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[1000] h-[3px] bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-brand-alt"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
