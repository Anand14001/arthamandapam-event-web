import { useEffect, useRef } from 'react';
import { subscribeScroll } from '../lib/smoothScroll';

/**
 * Fades a block up as it enters the viewport, once.
 *
 * Deliberately applied to a handful of section openings rather than everything
 * on the page — motion that fires on every element stops reading as motion and
 * starts reading as lag.
 *
 * Uses the page's own scroll subscription rather than IntersectionObserver.
 * Lenis coalesces native scroll events, so an observer can miss a section
 * entirely during a smooth jump; the subscription is driven from the same frame
 * loop as Lenis itself. A rect check also reveals anything already scrolled
 * past — a deep link, or the hero's "See what's included" jump — which would
 * otherwise be left stranded at opacity 0.
 *
 * The hidden state is added by script after mount, so the content is visible if
 * JavaScript never runs, and it is skipped entirely under reduced motion.
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  /** 'fade' moves the element itself; 'stagger' leaves it put and brings its
   *  direct children in one after another. */
  variant = 'fade',
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    el.classList.add(variant === 'stagger' ? 'reveal-stagger' : 'reveal');
    if (delay) el.style.transitionDelay = `${delay}ms`;

    let unsubscribe = null;
    let revealed = false;

    const check = () => {
      if (revealed) return;
      // Top edge has risen above 88% of the viewport, or is already past it.
      if (el.getBoundingClientRect().top >= window.innerHeight * 0.88) return;
      revealed = true;
      el.classList.add('is-revealed');
      if (unsubscribe) unsubscribe();
    };

    unsubscribe = subscribeScroll(check);
    // subscribeScroll runs the callback once immediately; if that already
    // revealed the element, unsubscribe now that the handle exists.
    if (revealed) unsubscribe();

    return () => unsubscribe && unsubscribe();
  }, [delay, variant]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
