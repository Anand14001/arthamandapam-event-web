import { PRICING, REGISTER_URL } from '../data/content';

const CARD_BASE =
  'relative flex min-h-[680px] flex-col justify-between overflow-hidden rounded-3xl p-[40px_30px] ' +
  'shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 ' +
  'hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] ' +
  'max-xl:min-h-[600px] max-md:min-h-[550px] max-md:p-[30px] ' +
  'max-xs:min-h-0 max-xs:rounded-2xl max-xs:p-6';

const BTN_BASE =
  'w-full rounded-[50px] border-none p-[16px_24px] text-center font-display text-[1rem] ' +
  'font-bold tracking-[0.5px] relative z-[3] cursor-pointer transition-all duration-300 ' +
  'hover:scale-[1.03] active:scale-[0.98] max-xs:p-[14px_20px] max-xs:text-[0.95rem]';

function Feature({ children }) {
  return (
    <li className="mb-4 flex items-start gap-3 text-[0.95rem] font-medium leading-[1.6] max-xs:mb-3 max-xs:text-[0.85rem]">
      <span className="mt-0.5 shrink-0 font-bold">✓</span> {children}
    </li>
  );
}

/**
 * .pricing-section — a 0.9 / 1.1 / 1.1 column grid of intro copy plus the two
 * passes, collapsing to the intro spanning both cards at 1024px and a single
 * column at 768px.
 */
export default function PricingSection() {
  const { standard, premium } = PRICING;

  return (
    <section
      className="relative flex justify-center overflow-hidden bg-lilac p-[80px_20px]
                 before:pointer-events-none before:absolute before:-top-1/2 before:right-[-20%]
                 before:h-[500px] before:w-[500px] before:rounded-full before:content-['']
                 before:bg-[radial-gradient(circle,rgba(98,37,209,0.1)_0%,transparent_70%)]
                 max-md:p-[60px_16px] max-xs:p-[40px_12px]"
    >
      <div
        className="relative z-[2] grid w-full max-w-[1400px] grid-cols-[0.9fr_1.1fr_1.1fr] gap-[30px]
                   max-xl:grid-cols-2 max-xl:gap-[25px] max-md:grid-cols-1 max-md:gap-5"
      >
        {/* intro */}
        <div className="flex flex-col justify-start py-5 max-xl:col-span-full">
          <div>
            <h1
              className="mb-5 font-display text-[clamp(2.2rem,5vw,3.5rem)] font-black leading-[1.1]
                         text-[#1a1a1a] max-md:text-[2.5rem] max-xs:text-[1.8rem]"
            >
              {PRICING.headingLead}
              <span className="text-brand-alt">{PRICING.headingAccent}</span>
            </h1>

            <p className="text-[1rem] leading-[1.6] text-[#555] max-md:max-w-full max-xs:text-[0.9rem]">
              {PRICING.subtext}
            </p>

            <h3
              className="mb-5 mt-[130px] border-b border-[#1a1a1a] font-display text-[1.3rem]
                         font-bold max-xs:!mt-5"
            >
              {PRICING.interTitle}
            </h3>

            <p className="mb-5 text-[1rem] leading-[1.6] text-[#555] max-xs:text-[0.9rem]">
              {PRICING.body1}
            </p>
            <p className="text-[1rem] leading-[1.6] text-[#555] max-xs:text-[0.9rem]">
              {PRICING.body2}
            </p>
          </div>
        </div>

        {/* standard pass */}
        <div className={`${CARD_BASE} border border-[#f0f0f0] bg-white text-[#1a1a1a]`}>
          <div className="relative z-[2] flex-grow">
            <div>
              <h3 className="mb-2 font-display text-[2rem] font-bold max-xs:text-[1.2rem]">
                {standard.title}
              </h3>
              <p className="text-[1.1rem]">{standard.subtitle}</p>
              <div className="mb-[30px] font-display text-[3rem] font-black max-md:text-[2.5rem] max-xs:text-[2rem]">
                {standard.price}
              </div>
              <ul className="mb-10 flex-grow">
                {standard.features.map((f) => (
                  <Feature key={f}>{f}</Feature>
                ))}
              </ul>
            </div>
          </div>

          <a
            href={REGISTER_URL}
            className={`${BTN_BASE} border-2 border-transparent bg-[#1a1a1a] !text-white
                        hover:shadow-[rgba(9,30,66,0.25)_0px_4px_8px_-2px,rgba(9,30,66,0.08)_0px_0px_0px_1px]`}
          >
            {standard.cta}
          </a>
        </div>

        {/* premium pass — dark card with the gradient scrim the theme paints
            over its background plate */}
        <div
          className={`${CARD_BASE} border border-[#333] bg-[#1a1a1a] text-white
                      before:pointer-events-none before:absolute before:inset-0 before:z-[1]
                      before:rounded-3xl before:content-['']
                      before:bg-[linear-gradient(180deg,rgba(26,26,26,0.85)_0%,rgba(26,26,26,0.5)_50%,rgba(26,26,26,0.2)_100%)]`}
        >
          <div className="relative z-[2] flex-grow">
            <div>
              <h3 className="relative z-[2] mb-2 font-display text-[2rem] font-bold text-white max-xs:text-[1.2rem]">
                {premium.title}
              </h3>
              <p className="text-[1.1rem]">{premium.subtitle}</p>
              <div className="mb-[30px] font-display text-[3rem] font-black max-md:text-[2.5rem] max-xs:text-[2rem]">
                {premium.price}
              </div>
              <ul className="mb-10 flex-grow">
                {premium.features.map((f) => (
                  <Feature key={f}>{f}</Feature>
                ))}
                <div
                  className="mt-5 inline-block rounded-[20px] border border-white/30 bg-white/15
                             px-4 py-2 text-[0.8rem] font-semibold uppercase tracking-[1px] text-white"
                >
                  {premium.badge}
                </div>
              </ul>
            </div>
          </div>

          <a
            href={REGISTER_URL}
            className={`${BTN_BASE} bg-white !text-[#1a1a1a] hover:bg-[#f0f0f0]`}
          >
            {premium.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
