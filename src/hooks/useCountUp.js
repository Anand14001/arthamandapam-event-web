import { useEffect, useRef, useState } from 'react';

/**
 * Reproduces the counter in the page's inline script: an IntersectionObserver at
 * threshold 0.5 fires once per element, then the value steps up by
 * ceil(target / 100) every 20ms until it reaches the target.
 */
export default function useCountUp(target, suffix = '') {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);

          const increment = Math.max(1, Math.ceil(target / 100));
          let count = 0;
          const tick = () => {
            count = Math.min(count + increment, target);
            setValue(count);
            if (count < target) setTimeout(tick, 20);
          };
          tick();
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return { ref, text: `${value}${suffix}` };
}
