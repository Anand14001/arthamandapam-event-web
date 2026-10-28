import { TICKER_ITEMS } from '../data/content';

/**
 * .home-section-3 — the gradient band tilted -6deg across the page. It is made
 * slightly wider than the viewport and nudged left so the rotation never
 * exposes a corner.
 */
export default function TickerStrip() {
  return (
    <section
      className="ml-[-2vw] w-[102.5%] -rotate-6 overflow-hidden whitespace-nowrap
                 bg-[linear-gradient(135deg,#6222cc_0%,#4a18a0_100%)] py-[1vw]
                 max-sm:ml-0 max-sm:w-full max-sm:py-[3vw]"
    >
      <div className="flex w-max animate-ticker will-change-transform">
        {TICKER_ITEMS.map((item) => (
          <div
            key={item.label}
            className="flex min-w-max shrink-0 items-center gap-[5vw] pr-[5vw]"
          >
            <span className="whitespace-nowrap font-display text-[2.5vw] font-black leading-none text-white max-sm:text-[6vw]">
              {item.value} {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
