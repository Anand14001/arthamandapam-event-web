import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STATS } from '../data/content';
import useCountUp from '../hooks/useCountUp';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import { subscribeScroll } from '../lib/smoothScroll';

gsap.registerPlugin(ScrollTrigger);

/* The headline's two lines, each revealed from behind its own mask. Splitting
   them here rather than with a <br> is what makes the line-by-line reveal
   possible; the rendered text is unchanged. */
const HEADLINE = ['A Proven Experience. A Bigger', 'Season Ahead.'];

/**
 * .stats-section — six counters on the lighter purple band. Six per row on
 * desktop with hairline dividers, three per row on tablet, two on phones.
 */
function StatCard({ stat, index, counting, reduced, inView }) {
  const text = useCountUp(stat.target, stat.suffix, { start: counting, instant: reduced });

  return (
    <div
      style={{ transitionDelay: inView ? `${420 + index * 70}ms` : '0ms' }}
      className={`relative basis-[16.66%] px-2.5 py-5 transition-[opacity,translate]
                  duration-700 ease-out motion-reduce:transition-none
                  ${inView ? 'translate-y-0 opacity-100' : 'translate-y-[26px] opacity-0'}
                  max-xl:basis-1/3 max-xl:border-b max-xl:border-white/10
                  max-sm:basis-1/2 max-sm:px-[5px] max-sm:py-[30px]
                  ${
                    index < STATS.length - 1
                      ? 'desk:after:absolute desk:after:right-0 desk:after:top-1/4 desk:after:h-1/2 desk:after:w-px desk:after:bg-white/20 desk:after:content-[""]'
                      : ''
                  }
                  ${
                    index % 2 === 0
                      ? 'max-sm:after:absolute max-sm:after:right-0 max-sm:after:top-[20%] max-sm:after:h-[60%] max-sm:after:w-px max-sm:after:bg-white/10 max-sm:after:content-[""]'
                      : ''
                  }`}
    >
      <div
        className="mx-auto mb-[15px] flex h-20 w-20 items-center justify-center rounded-full
                   bg-white shadow-[0_8px_15px_rgba(0,0,0,0.1)] max-sm:h-[70px] max-sm:w-[70px]"
      >
        <i className={`icon ${stat.icon} text-[30px] text-accent max-sm:text-[25px]`} />
      </div>

      <span className="my-[5px] block text-[2.2rem] font-bold max-sm:text-[1.8rem]">{text}</span>

      <p className="mx-auto max-w-[130px] text-[1rem] font-semibold leading-[1.3] tracking-[1px]">
        {stat.label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const root = useRef(null);
  const [inView, setInView] = useState(false);
  const [counting, setCounting] = useState(false);
  const reduced = usePrefersReducedMotion();

  /**
   * One trigger runs the whole banner — the headline lines, the counters and
   * the stat cards — so they share a rhythm instead of firing from unrelated
   * observers, and it latches once so a small scroll back and forth never
   * replays it.
   *
   * The reveal itself is CSS transitions rather than a GSAP timeline. The end
   * state is then a class, not the result of a frame loop finishing: if the
   * page is backgrounded or a frame is dropped mid-tween, the content still
   * ends up visible. GSAP earns its place below, for the scrubbed parallax,
   * which CSS cannot express.
   */
  useEffect(() => {
    if (reduced) {
      setInView(true);
      setCounting(true);
      return undefined;
    }

    let latched = false;
    let unsubscribe = null;

    const check = () => {
      if (latched || !root.current) return;
      if (root.current.getBoundingClientRect().top >= window.innerHeight * 0.82) return;
      latched = true;
      setInView(true);
      setCounting(true);
      if (unsubscribe) unsubscribe();
    };

    unsubscribe = subscribeScroll(check);
    if (latched) unsubscribe();

    return () => unsubscribe && unsubscribe();
  }, [reduced]);

  /**
   * The band is a flat colour, so there is no backdrop to parallax; the type
   * itself drifts instead. Deliberately small — around 16px across the whole
   * section — so it reads as depth rather than as movement. ScrollTrigger is
   * already driven from the Lenis frame loop, so this stays in step with the
   * smooth scrolling.
   */
  useLayoutEffect(() => {
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.to('.js-stat-head', {
        yPercent: -16,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={root}
      className="bg-accent px-2.5 pb-[60px] pt-[30px] text-center text-white max-sm:p-[20px_5px]"
    >
      <h2
        className="js-stat-head mb-10 font-display text-[clamp(1.2rem,3vw,3rem)] font-bold
                   tracking-[0.02em] text-white max-sm:mb-5 max-sm:text-[1.5rem]"
      >
        {HEADLINE.map((line, i) => (
          // The mask clips the line while it travels; the padding keeps
          // descenders clear of the clip edge.
          <span key={line} className="block overflow-hidden pb-[0.08em]">
            <span
              style={{ transitionDelay: inView ? `${i * 120}ms` : '0ms' }}
              className={`block transition-transform duration-[900ms]
                          ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none
                          ${inView ? 'translate-y-0' : 'translate-y-[115%]'}`}
            >
              {line}
            </span>
          </span>
        ))}
      </h2>

      <div className="container-page flex flex-wrap justify-center">
        {STATS.map((stat, i) => (
          <StatCard
            key={stat.label}
            stat={stat}
            index={i}
            counting={counting}
            reduced={reduced}
            inView={inView}
          />
        ))}
      </div>
    </section>
  );
}
