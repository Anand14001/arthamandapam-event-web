import { EXPERIENCE_CARDS } from '../data/content';
import Reveal from './Reveal';
import { useRegistration } from './RegistrationProvider';

/**
 * Inside the Event.
 *
 * Rebuilt on the composition of the reference's "Organize your schedule"
 * section: a three-track grid of `12px | 10.3fr | 7fr` with 55px gutters — a
 * slim rounded rail, the item list, and a sticky title column — on a near-black
 * ground.
 *
 * The behaviour that makes it work is that every card is `position: sticky` at
 * the same offset, so each one parks under the header and the next slides over
 * it as you scroll, while the title column stays put beside them. Nothing here
 * may sit inside an `overflow: hidden` ancestor or the stacking silently stops
 * working — which is why this section no longer clips itself.
 *
 * Content is unchanged: the ring's old "Learn • Create • Grow • Monetise" line
 * is kept beside the heading. The card numbers are still in the data as stable
 * keys, but are no longer shown — the reference uses that slot for a session
 * time, and a bare ordinal added nothing.
 */
export default function ExperienceSection() {
  const { open } = useRegistration();
  return (
    <section id="event" className="w-full bg-ink py-[clamp(72px,9vw,140px)]">
      <div className="container-page">
        <div
          className="grid items-start gap-[clamp(28px,3.5vw,55px)]
                     lg:grid-cols-[12px_10.3fr_7fr]"
        >
          {/* The rail: decorative, and it anchors the list to the grid's first
              track exactly as the reference does. */}
          <div
            aria-hidden="true"
            className="hidden self-stretch rounded-[20px] border border-white/10 bg-brand lg:block"
          />

          {/* Each card sticks at the same offset, so they stack on scroll. The
              offset clears the fixed header rather than the reference's 50px. */}
          <ol className="flex min-w-0 flex-col gap-6">
            {EXPERIENCE_CARDS.map((card) => (
              <li
                key={card.number}
                className="sticky top-[84px] rounded-xl border border-white/[0.07]
                           bg-[#0b0911] p-[clamp(28px,3vw,50px)_clamp(22px,2.6vw,40px)]
                           max-md:top-[72px]"
              >
                <h3
                  className="font-display text-[clamp(1.3rem,2.1vw,2rem)] font-medium
                             leading-[1.3] text-white"
                >
                  {card.title}
                  <span className="text-accent">{card.accent}</span>
                </h3>

                <p className="mt-6 font-body text-[16px] leading-[1.6] text-white/55 max-md:mt-4 max-md:text-[15px]">
                  {card.body}
                </p>
              </li>
            ))}
          </ol>

          {/* Title column — sticky beside the list on desktop, leading the
              section on narrow screens. */}
          <div
            className="order-first min-w-0 lg:order-none lg:sticky lg:top-[84px]
                       lg:self-start lg:pl-[clamp(24px,4vw,65px)]"
          >
            <Reveal>
              <h2
                className="font-display text-[clamp(1.9rem,3.4vw,3.1rem)] font-semibold
                           leading-[1.17] tracking-[-0.02em] text-white"
              >
                Inside the Event
              </h2>

              <p className="mt-6 font-body text-[16px] leading-[1.6] text-white/55 max-lg:max-w-[60ch]">
                Every session is carefully designed to help you build your personal brand, create
                better content, grow your audience, and unlock new opportunities.
              </p>

              <p className="mt-5 font-display text-[13px] uppercase tracking-[0.18em] text-white/40">
                Learn • Create • Grow • Monetise
              </p>

              <button
                type="button"
                onClick={open}
                className="mt-9 inline-block rounded-full bg-brand-alt px-8 py-[15px]
                           font-display text-[15px] font-semibold text-white
                           shadow-[0_10px_30px_rgba(98,37,209,0.4)] transition-all duration-300
                           hover:-translate-y-0.5 hover:bg-white hover:text-brand-alt
                           focus-visible:outline focus-visible:outline-2
                           focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Book Your Seat
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
