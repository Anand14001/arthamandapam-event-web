import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRICING } from '../data/content';
import Reveal from './Reveal';
import { useRegistration } from './RegistrationProvider';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

function Check({ dark }) {
  return (
    <span
      aria-hidden="true"
      className={`mt-[2px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full
                  ${dark ? 'bg-brand/25 text-accent' : 'bg-brand/10 text-brand'}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-[9px] w-[9px]">
        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function FeatureList({ items, label, dark }) {
  return (
    <>
      <p
        className={`mb-4 font-display text-[10px] font-semibold uppercase tracking-[0.18em]
                    ${dark ? 'text-white/40' : 'text-black/40'}`}
      >
        {label}
      </p>
      {/* Two columns once the card is wide enough to hold them — a nine-item
          single column was most of the card's height on its own. */}
      <ul className="2xl:columns-2 2xl:gap-x-7">
        {items.map((item) => (
          <li
            key={item}
            className={`mb-[9px] flex break-inside-avoid items-start gap-2.5 font-body
                        text-[13.5px] leading-[1.5]
                        ${dark ? 'text-white/75' : 'text-black/65'}`}
          >
            <Check dark={dark} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * Choose Your Creator Experience.
 *
 * The two passes are not parallel options — Premium is Standard plus five
 * additions, which is what its own subtitle says. The previous layout put a
 * nine-item list beside a six-item list and left the visitor to diff them. Here
 * each list is labelled for what it actually is ("What's included" against
 * "Plus, exclusive to Premium"), so the relationship is readable at a glance.
 *
 * The intro is asymmetric rather than a third column, which also retires the
 * arbitrary 130px top margin that used to push the second heading into place.
 *
 * Deliberately not pinned. A pinned sequence here would hold the visitor still
 * at the exact moment they are trying to compare two prices and leave, which
 * costs more than the effect is worth. The only scroll-linked movement is a
 * drift on the decorative glow that was already part of this section.
 */
export default function PricingSection() {
  const { standard, premium } = PRICING;
  const { open } = useRegistration();
  const root = useRef(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.to('.js-pricing-glow', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  const panelBase =
    'relative flex flex-col rounded-[24px] p-[clamp(22px,2.2vw,32px)] transition-transform ' +
    'duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none max-xs:rounded-2xl';

  const ctaBase =
    'mt-5 block w-full rounded-full px-6 py-[14px] text-center font-display text-[14px] ' +
    'font-bold tracking-[0.04em] transition-all duration-300 hover:-translate-y-0.5 ' +
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4';

  return (
    <section
      id="passes"
      ref={root}
      className="relative w-full overflow-hidden bg-lilac py-[clamp(64px,8vw,120px)]"
    >
      {/* The section's existing decorative glow, now a real element so it can
          drift with the scroll. */}
      <div
        aria-hidden="true"
        className="js-pricing-glow pointer-events-none absolute -top-[20%] right-[-15%] h-[520px]
                   w-[520px] rounded-full
                   bg-[radial-gradient(circle,rgba(98,37,209,0.12)_0%,transparent_70%)]"
      />

      <div className="container-page relative z-[2]">
        {/* ---- intro ---- */}
        <div className="grid items-end gap-[clamp(28px,4vw,72px)] lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <h2
              className="font-display text-[clamp(2rem,4.2vw,3.4rem)] font-black leading-[1.08]
                         tracking-[-0.02em] text-[#1a1a1a]"
            >
              {PRICING.headingLead}
              <span className="text-brand-alt">{PRICING.headingAccent}</span>
            </h2>
            <p className="mt-5 max-w-[46ch] font-body text-[17px] leading-[1.6] text-black/60">
              {PRICING.subtext}
            </p>
          </Reveal>

          <Reveal delay={110}>
            <h3 className="font-display text-[1.2rem] font-bold text-[#1a1a1a]">
              {PRICING.interTitle}
            </h3>
            <p className="mt-4 font-body text-[15px] leading-[1.7] text-black/60">
              {PRICING.body1}
            </p>
            <p className="mt-3 font-body text-[15px] leading-[1.7] text-black/60">
              {PRICING.body2}
            </p>
          </Reveal>
        </div>

        {/* ---- the two passes ---- */}
        <div className="mt-[clamp(40px,5vw,72px)] grid items-stretch gap-[clamp(20px,2.5vw,32px)] lg:grid-cols-2">
          {/* Standard */}
          <Reveal delay={60} className="flex">
            <article
              className={`${panelBase} w-full border border-black/[0.07] bg-white
                          shadow-[0_18px_50px_rgba(26,10,60,0.07)]`}
            >
              <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-black/45">
                  {standard.title}
                </p>
                <p className="font-display text-[clamp(1.9rem,2.6vw,2.4rem)] font-black leading-none text-[#1a1a1a]">
                  {standard.price}
                </p>
              </header>

              <p className="mt-2 font-display text-[0.95rem] font-medium text-black/70">
                {standard.subtitle}
              </p>

              {/* The action sits with the price, not at the far end of a long
                  list — the decision is made here, the detail below is support. */}
              <button
                type="button"
                onClick={open}
                className={`${ctaBase} bg-[#1a1a1a] text-white outline-[#1a1a1a]
                            hover:shadow-[0_14px_34px_rgba(0,0,0,0.25)]`}
              >
                {standard.cta}
              </button>

              <hr className="my-6 border-black/10" />

              <FeatureList items={standard.features} label="What's included" />
            </article>
          </Reveal>

          {/* Premium */}
          <Reveal delay={180} className="flex">
            <article
              className={`${panelBase} w-full border border-brand/40 bg-ink text-white
                          shadow-[0_0_0_1px_rgba(98,34,204,0.25),0_26px_70px_rgba(98,34,204,0.32)]`}
            >
              <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <p className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                    {premium.title}
                  </p>
                  {/* Was a <div> inside the <ul>, which is invalid markup. */}
                  <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-[3px] font-display text-[9px] font-semibold uppercase tracking-[0.14em] text-white">
                    {premium.badge}
                  </span>
                </div>
                <p className="font-display text-[clamp(1.9rem,2.6vw,2.4rem)] font-black leading-none text-white">
                  {premium.price}
                </p>
              </header>

              <p className="mt-2 font-display text-[0.95rem] font-medium text-white/80">
                {premium.subtitle}
              </p>

              <button
                type="button"
                onClick={open}
                className={`${ctaBase} bg-brand-alt text-white outline-white
                            shadow-[0_12px_32px_rgba(98,37,209,0.45)] hover:bg-white hover:text-brand-alt`}
              >
                {premium.cta}
              </button>

              <hr className="my-6 border-white/10" />

              <FeatureList items={premium.features} label="Plus, exclusive to Premium" dark />
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
