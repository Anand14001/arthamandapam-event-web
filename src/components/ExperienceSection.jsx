import { EXPERIENCE_CARDS } from '../data/content';

/**
 * .experience-section — six glass cards orbiting a glowing ring. The cards are
 * absolutely placed on a 900px stage from 993px up, shift inward at 992px, and
 * collapse into a single stacked column at 768px.
 */
const POSITIONS = [
  'top-0 left-[150px] max-lg:left-[50px]',
  'top-0 right-[150px] max-lg:right-[50px]',
  'top-[320px] left-[60px] max-lg:top-[275px] max-lg:left-0',
  'top-[320px] right-[60px] max-lg:top-[275px] max-lg:right-0',
  'bottom-0 left-[150px] max-lg:left-[50px]',
  'bottom-0 right-[150px] max-lg:right-[50px]',
];

export default function ExperienceSection() {
  return (
    <section
      className="relative m-[103px_0_0] w-full max-w-full overflow-hidden bg-ink py-[4vw]
                 before:pointer-events-none before:absolute before:inset-0 before:content-['']
                 before:bg-[linear-gradient(135deg,rgba(98,34,204,0.08)_0%,rgba(98,34,204,0.04)_50%,transparent_100%)]
                 max-lg:py-[8vw] max-md:p-[10vw_5vw] max-sm:p-[12vw_4vw]"
    >
      <header className="relative z-[1] mx-auto mb-[60px] max-w-[80%] px-[6vw] text-center max-md:max-w-full max-md:px-0">
        <h2
          className="mb-4 font-display text-[4.5vw] font-bold leading-[1.2] tracking-[-0.01em]
                     text-white max-md:mb-[14px] max-md:text-[7vw]"
        >
          Inside the Event
        </h2>
        <p className="font-body text-[1.4vw] font-light leading-[1.7] text-[#ddd] max-md:text-[15px] max-md:leading-[1.6]">
          Every session is carefully designed to help you build your personal brand, create better
          content, grow your audience, and unlock new opportunities.{' '}
        </p>
      </header>

      <div
        className="relative mx-auto flex min-h-[900px] max-w-[1600px] items-center justify-center
                   px-[8vw] max-2xl:min-h-[600px] max-2xl:gap-6
                   max-lg:min-h-[800px] max-lg:px-[3vw]
                   max-md:m-0 max-md:block max-md:min-h-0 max-md:max-w-full max-md:p-0"
      >
        {/* stage-glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[700px] w-[700px]
                     -translate-x-1/2 -translate-y-1/2 blur-[100px]
                     bg-[radial-gradient(circle,rgba(98,34,204,0.3)_0%,rgba(98,34,204,0.15)_35%,transparent_70%)]
                     max-2xl:h-[500px] max-2xl:w-[500px] max-md:h-[300px] max-md:w-[300px]"
        />

        {/* centre ring */}
        <div
          className="absolute left-1/2 top-1/2 z-10 flex h-[380px] w-[380px] -translate-x-1/2
                     -translate-y-1/2 items-center justify-center rounded-full
                     border-[3px] border-brand/70
                     bg-[radial-gradient(circle_at_35%_35%,#2a2a2a_0%,#1a1a1a_60%)]
                     shadow-[0_0_100px_rgba(98,34,204,0.5),0_0_200px_rgba(98,34,204,0.25),inset_0_0_80px_rgba(98,34,204,0.15)]
                     max-2xl:h-[260px] max-2xl:w-[260px]
                     max-lg:h-[280px] max-lg:w-[280px]
                     max-md:static max-md:mx-auto max-md:mb-[50px] max-md:mt-10 max-md:h-[220px]
                     max-md:w-[220px] max-md:translate-x-0 max-md:translate-y-0 max-md:border-2
                     max-md:bg-ink-gray max-md:bg-none max-md:z-[5]
                     max-md:shadow-[0_0_60px_rgba(98,34,204,0.4),0_0_120px_rgba(98,34,204,0.15),inset_0_0_40px_rgba(98,34,204,0.08)]"
        >
          <div className="px-[30px] text-center">
            <span
              className="mb-3 inline-block rounded-2xl bg-brand px-4 py-[5px] font-display
                         text-[11px] font-bold uppercase tracking-[0.1em] text-white
                         max-md:mb-2.5 max-md:px-[14px]"
            >
              INSIDE
            </span>
            <h3
              className="mb-2.5 font-display text-[clamp(36px,4.4vw,44px)] font-bold leading-[1.2]
                         text-white max-2xl:text-[clamp(32px,4vw,40px)]
                         max-xl:text-[clamp(28px,3.5vw,36px)] max-lg:text-[clamp(28px,3.2vw,32px)]
                         max-md:mb-2 max-md:text-[32px]"
            >
              THE EVENT
            </h3>
            <p
              className="font-body text-[clamp(13px,1.5vw,15px)] font-light leading-[1.4] text-[#999]
                         max-xl:text-[clamp(12px,1.4vw,14px)] max-md:text-[15px] max-md:text-[#aaa]"
            >
              Learn • Create • Grow • Monetise
            </p>
          </div>
        </div>

        {/* the six cards */}
        {EXPERIENCE_CARDS.map((card, i) => (
          <article
            key={card.number}
            className={`absolute z-[2] flex h-[250px] w-[400px] flex-col rounded-3xl border-[1.5px]
                        border-brand/40 bg-brand/10 p-5 backdrop-blur-[12px]
                        shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(98,34,204,0.25)]
                        transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                        hover:-translate-y-3 hover:border-brand/90 hover:bg-brand/15
                        hover:shadow-[0_20px_60px_rgba(98,34,204,0.3),inset_0_1px_0_rgba(98,34,204,0.35)]
                        max-2xl:max-w-[240px] max-2xl:p-[24px_20px]
                        max-lg:min-h-[220px] max-lg:w-[240px]
                        max-md:static max-md:mx-auto max-md:mb-[25px] max-md:h-auto max-md:min-h-0
                        max-md:w-full max-md:max-w-full max-md:rounded-[18px] max-md:p-[24px_20px]
                        max-md:z-[3] max-md:hover:-translate-y-2
                        ${POSITIONS[i]}`}
          >
            <span
              className="mb-[14px] block font-display text-[clamp(14px,1.6vw,30px)] font-bold
                         uppercase tracking-[0.12em] text-white
                         max-2xl:text-[clamp(13px,1.5vw,15px)] max-xl:text-[clamp(12px,1.4vw,14px)]
                         max-md:mb-2.5 max-md:text-sm max-md:text-brand"
            >
              {card.number}
            </span>

            <h3
              className="mb-[14px] font-display text-[clamp(18px,2.4vw,28px)] font-medium
                         leading-[1.3] text-white max-2xl:text-[clamp(18px,2vw,22px)]
                         max-xl:text-[clamp(16px,1.8vw,18px)] max-lg:mb-3
                         max-md:mb-3 max-md:text-lg"
            >
              {card.title}
              <span className="font-bold text-white max-md:text-brand">{card.accent}</span>
            </h3>

            <p
              className="flex-1 font-body text-[clamp(14px,1.6vw,17px)] font-light leading-[1.7]
                         text-[#ddd] max-2xl:text-[clamp(13px,1.4vw,15px)]
                         max-xl:text-[clamp(12px,1.3vw,13px)]
                         max-md:text-sm max-md:leading-[1.6] max-md:text-[#bbb]"
            >
              {card.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
