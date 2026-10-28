import { STATS } from '../data/content';
import useCountUp from '../hooks/useCountUp';

/**
 * .stats-section — six counters on the lighter purple band. Six per row on
 * desktop with hairline dividers, three per row on tablet, two on phones.
 */
function StatCard({ stat, index }) {
  const { ref, text } = useCountUp(stat.target, stat.suffix);

  return (
    <div
      className={`relative basis-[16.66%] px-2.5 py-5
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

      <span
        ref={ref}
        className="my-[5px] block text-[2.2rem] font-bold max-sm:text-[1.8rem]"
      >
        {text}
      </span>

      <p className="mx-auto max-w-[130px] text-[1rem] font-semibold leading-[1.3] tracking-[1px]">
        {stat.label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-accent px-2.5 pb-[60px] pt-[30px] text-center text-white max-sm:p-[20px_5px]">
      <h2
        className="mb-10 font-display text-[clamp(1.2rem,3vw,3rem)] font-bold tracking-[0.02em]
                   text-white max-sm:mb-5 max-sm:text-[1.5rem]"
      >
        A Proven Experience. A Bigger
        <br /> Season Ahead.
      </h2>

      <div className="mx-auto flex flex-wrap justify-center">
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  );
}
