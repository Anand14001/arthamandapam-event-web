import { useEffect, useState } from 'react';

/**
 * Counts from 0 up to `target`, stepping by ceil(target / 100) every 20ms —
 * the same curve the source page used.
 *
 * The trigger is passed in rather than observed here. The counters used to run
 * off their own IntersectionObserver, which meant they fired independently of
 * the banner's entrance animation, and IntersectionObserver is unreliable under
 * Lenis anyway: it coalesces scroll events hard enough that a section can be
 * skipped entirely during a smooth jump. The banner now starts them from the
 * same ScrollTrigger that reveals the headline.
 *
 * `instant` skips the count for visitors who asked for reduced motion — they
 * get the final figure, not an animated tally.
 */
export default function useCountUp(target, suffix = '', { start = false, instant = false } = {}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (instant) {
      setValue(target);
      return undefined;
    }
    if (!start) return undefined;

    let cancelled = false;
    let timer;
    const increment = Math.max(1, Math.ceil(target / 100));
    let count = 0;

    const tick = () => {
      if (cancelled) return;
      count = Math.min(count + increment, target);
      setValue(count);
      if (count < target) timer = setTimeout(tick, 20);
    };
    tick();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [target, start, instant]);

  return `${value}${suffix}`;
}
