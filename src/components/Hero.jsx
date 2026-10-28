import { useEffect, useRef, useState } from 'react';
import { HERO, HERO_VIDEO, REGISTER_URL, STRIP_GROUPS } from '../data/content';

/**
 * .home-section-1 — 60/40 split of looping showreel and the purple pitch card
 * that sits on an offset black "shadow" plate, followed by the purple marquee.
 * All sizing is in vw, exactly as the source stylesheet has it.
 */
export default function Hero() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  // The source autoplays muted and exposes a single mute/unmute toggle.
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  return (
    <section className="w-full overflow-hidden bg-black pb-[2vw] pt-[7vw] max-sm:pb-[6vw] max-sm:pt-[35vw]">
      <div
        className="flex w-full items-stretch gap-[2.5vw] px-[6vw] py-[2vw]
                   max-sm:flex-col max-sm:gap-[5vw] max-sm:px-[6vw] max-sm:py-0"
      >
        {/* video */}
        <div
          className="relative z-10 w-3/5 overflow-hidden rounded-[2vw]
                     max-sm:h-[100vw] max-sm:w-full max-sm:rounded-[5vw]"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="block h-full w-full object-cover"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>

          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            title={muted ? 'Unmute video' : 'Mute video'}
            className="absolute bottom-[1vw] right-[1vw] z-[100] flex h-[4.5vw] w-[4.5vw]
                       cursor-pointer items-center justify-center rounded-full border-2
                       border-white/80 bg-black/60 transition-all duration-300
                       hover:border-white hover:bg-black/80
                       max-sm:bottom-[4vw] max-sm:right-[4vw] max-sm:h-[12vw] max-sm:w-[12vw]"
          >
            {muted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="block h-[2.5vw] w-[2.5vw] max-sm:h-[6vw] max-sm:w-[6vw]"
              >
                <path d="M3 9v6h4l5 4V5L7 9H3z" />
                <path
                  d="M16.5 9.5L21 14m0-4.5L16.5 14"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="block h-[2.5vw] w-[2.5vw] max-sm:h-[6vw] max-sm:w-[6vw]"
              >
                <path d="M3 9v6h4l5 5V4L7 9H3z" />
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
        </div>

        {/* pitch card */}
        <div className="relative w-2/5 max-sm:w-full">
          <div
            className="relative z-[2] h-full rounded-[1.5vw] bg-brand py-[2vw]
                       after:absolute after:bottom-[0.6vw] after:left-[-0.8vw] after:z-[-1]
                       after:h-[99%] after:w-full after:rounded-[1.5vw] after:border
                       after:border-brand after:bg-black after:content-['']
                       max-sm:rounded-[4vw] max-sm:px-[2vw] max-sm:py-[10vw]
                       max-sm:after:bottom-[1vw] max-sm:after:left-[-2vw] max-sm:after:rounded-[4vw]"
          >
            <h1
              className="mb-[1.5vw] pl-[1.5vw] font-display text-[3.3vw] font-black uppercase
                         leading-[1.2] text-white max-sm:mb-[5vw] max-sm:text-[10vw]"
            >
              {HERO.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p
              className="max-w-[98%] pl-[1.5vw] font-display text-[2vw] font-medium leading-[1.1]
                         text-white max-sm:max-w-full max-sm:text-[8vw]"
            >
              {HERO.leadBefore}{' '}
              {/* The live stylesheet colours this line with the brand purple on
                  the purple card, so it reads as a deliberate tonal accent. */}
              <span className="block font-bold text-brand">{HERO.leadAccent}</span>
              {HERO.leadAfter}
            </p>

            <div
              className="mb-[1vw] mt-[2vw] grid w-[93%] grid-cols-2 gap-[1vw] pl-[1.5vw]
                         max-sm:mt-[8vw] max-sm:gap-[3vw]"
            >
              <div className="w-full flex-1 rounded-[0.8vw] border-[0.12vw] border-white/80 p-[1vw] max-sm:rounded-[3vw] max-sm:p-[4vw]">
                <h4 className="mb-[0.4vw] font-display text-[1.3vw] font-medium text-white max-sm:text-[6vw]">
                  Location
                </h4>
                <span className="block font-body text-[1.1vw] leading-[1.4] text-white max-sm:text-[5vw]">
                  {HERO.location}
                </span>
              </div>

              <div className="w-full flex-1 rounded-[0.8vw] border-[0.12vw] border-white/80 p-[1vw] max-sm:rounded-[3vw] max-sm:p-[4vw]">
                <h4 className="mb-[0.4vw] font-display text-[1.3vw] font-medium text-white max-sm:text-[6vw]">
                  Dates
                </h4>
                <span className="block font-body text-[1.1vw] leading-[1.4] text-white max-sm:text-[5vw]">
                  {HERO.date}
                </span>
              </div>

              <a
                href={REGISTER_URL}
                className="col-span-full mt-5 w-full rounded-[50px] border border-brand-alt
                           bg-brand-alt p-3 text-center font-display text-2xl font-semibold
                           text-white max-xs:text-[1.2rem]"
              >
                {HERO.cta}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* .home-strip — purple marquee, slightly wider than the viewport and
          pulled left so neither edge shows a seam. */}
      <div className="ml-[-3vw] mt-0 w-[110%] overflow-hidden bg-brand py-[25px] max-sm:mt-[4vw] max-sm:py-[2vw]">
        <div className="flex w-max animate-strip">
          {STRIP_GROUPS.map((group, gi) => (
            <div key={gi} className="flex items-center gap-[5vw] pr-[5vw]">
              {group.map((item) => (
                <span
                  key={item.label}
                  className="flex items-center whitespace-nowrap font-display text-[2vw]
                             font-black text-white max-sm:text-[8vw]"
                >
                  {item.value} {item.label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
