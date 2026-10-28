import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * The page's single Lenis instance.
 *
 * Kept at module level so the few places that need to drive the scroll —
 * the back-to-top button, the video modal — can reach it without prop
 * drilling, and so a second instance can never be created.
 */
let lenis = null;

export const getLenis = () => lenis;

/**
 * Subscribe to scroll position changes.
 *
 * Components must not listen to the window's own 'scroll' event while Lenis is
 * driving: Lenis suppresses the native events it causes, so a whole-page jump
 * can emit one event or none, and anything thresholding on scrollY silently
 * stops updating. This notifies from Lenis's callback, and also binds the
 * native event so it still works before Lenis has started and if it is ever
 * removed. Handlers are idempotent, so the overlap is harmless.
 */
const listeners = new Set();

export function subscribeScroll(fn) {
  listeners.add(fn);
  window.addEventListener('scroll', fn, { passive: true });
  fn();
  return () => {
    listeners.delete(fn);
    window.removeEventListener('scroll', fn);
  };
}

/**
 * Starts smooth scrolling. Returns a teardown function.
 *
 * Lenis is driven by GSAP's ticker rather than its own rAF loop: the page
 * already runs ScrollTrigger in the journey section, and sharing one loop keeps
 * the two in step instead of racing across separate frames.
 */
export function startSmoothScroll() {
  if (lenis) return () => {};

  lenis = new Lenis({
    // Responsive rather than floaty — the scroll should settle quickly enough
    // that the page still feels under the visitor's control.
    lerp: 0.12,
    smoothWheel: true,
    // Touch devices keep their native scrolling. Synthesising it tends to feel
    // heavier than the real thing and interferes with the carousel's swipes.
    syncTouch: false,
    wheelMultiplier: 1,
    // Offsets in-page jumps so a heading does not land under the fixed header.
    anchors: { offset: -96 },
    // Smoothing is skipped entirely when the visitor asks for reduced motion.
    respectReducedMotion: true,
    autoRaf: false,
  });

  // Everything downstream is driven from the one frame loop rather than from
  // scroll events. Lenis coalesces native scroll events heavily, and its own
  // 'scroll' event proved unreliable to depend on for UI state, so the frame is
  // the single source of truth. The cost is two scalar comparisons per frame:
  // React bails out of a setState that does not change the value, so an idle
  // page re-renders nothing.
  const raf = (time) => {
    lenis.raf(time * 1000); // GSAP ticker is in seconds
    ScrollTrigger.update();
    listeners.forEach((fn) => fn());
  };
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // Images and fonts settle after mount and shift everything below them, so
  // trigger positions measured at mount would be stale.
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);

  return () => {
    window.removeEventListener('load', refresh);
    gsap.ticker.remove(raf);
    gsap.ticker.lagSmoothing(500, 33); // restore GSAP's default
    lenis.destroy();
    lenis = null;
  };
}
