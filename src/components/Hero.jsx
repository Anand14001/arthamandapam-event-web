import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  HERO,
  HERO_POSTER,
  HERO_PROOF,
  HERO_VIDEO,
  SPEAKERS,
  STRIP_GROUPS,
} from '../data/content';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import { useRegistration } from './RegistrationProvider';

gsap.registerPlugin(ScrollTrigger);

/* Five of the eight speakers, as an overlapping avatar row. The source files are
   only 335x300, so they are used small — at 44px they stay sharp. */
const FACES = SPEAKERS.slice(0, 5);

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/**
 * Hero — full-bleed editorial.
 *
 * The event's one piece of genuine photography is the Season 1 footage, so it
 * carries the whole stage rather than sitting in a box beside a text panel. The
 * previous 60/40 split read as two unrelated blocks and left the headline
 * smaller than the video; here the type is laid over the footage in a single
 * composition, with the right half of the frame kept clear so the speaker stays
 * visible next to the copy.
 *
 * Type is sized with clamp() rather than raw vw so the layout stays composed
 * from 1366 through 1920 instead of scaling linearly with the window.
 */
export default function Hero() {
  const { open } = useRegistration();
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  // The 104 MB background clip is motion for its own sake: skip it entirely when
  // reduced motion is asked for and let the gradient stage stand on its own.
  const showVideo = !reducedMotion;
  const stage = useRef(null);

  /**
   * As the hero scrolls away the footage creeps in slightly, so the frame has
   * depth against the copy rather than sliding off as one flat plane.
   *
   * Scaling rather than translating on purpose: the media is `object-cover`
   * inside a masked panel, so moving it vertically would drag the mask's edge
   * with it. Scaling keeps the box filled and the mask aligned. ScrollTrigger
   * is already driven from the Lenis frame loop, so this stays in step with
   * the smooth scrolling.
   */
  useLayoutEffect(() => {
    if (reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.to('.js-hero-media', {
        scale: 1.07,
        ease: 'none',
        scrollTrigger: {
          trigger: stage.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    }, stage);

    return () => ctx.revert();
  }, [reducedMotion]);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  };

  return (
    <section className="relative w-full overflow-hidden bg-ink">
      <div
        ref={stage}
        className="relative flex min-h-[min(100svh,1000px)] items-center
                   max-md:min-h-[88svh] max-md:items-end"
      >
        {/* ---------- backdrop ---------- */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Base stage, under everything, so the frame is never bare. */}
          <div className="absolute inset-0 bg-[radial-gradient(125%_120%_at_18%_15%,#331066_0%,#160636_42%,#04000b_100%)]" />

          {/* The footage is framed into the right of the stage rather than
              stretched across it. The still is a 1.12:1 frame with the speaker
              centred, so covering the full width would scale by width, crop his
              head off and park him behind the copy. Holding it to ~74% puts the
              panel close to the frame's own aspect: almost no crop, and the
              subject lands clear of the text column. */}
          <div
            className="absolute inset-y-0 right-0 w-[74%] max-xl:w-[88%] max-md:inset-0 max-md:w-full
                       [mask-image:linear-gradient(to_right,transparent_0%,black_30%)]
                       max-md:[mask-image:none]"
          >
            {/* Paints in the first few KB, which is what most visitors actually
                see — the video behind it is 104 MB. Under reduced motion this is
                the hero image outright. */}
            <img
              src={HERO_POSTER}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              className="js-hero-media absolute inset-0 h-full w-full object-cover
                         object-[50%_15%] max-md:object-[55%_10%]"
            />

            {showVideo && (
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                tabIndex={-1}
                onLoadedData={() => setVideoReady(true)}
                className={`js-hero-media absolute inset-0 h-full w-full object-cover object-[50%_15%]
                            transition-opacity duration-[1200ms] ease-out
                            max-md:object-[55%_10%] ${videoReady ? 'opacity-100' : 'opacity-0'}`}
              >
                <source src={HERO_VIDEO} type="video/mp4" />
              </video>
            )}
          </div>

          {/* Legibility scrims. Horizontal on desktop so the copy sits on near
              solid ink while the right of the frame stays open; vertical on
              phones, where the copy is anchored to the bottom instead. */}
          <div
            className="absolute inset-0 max-md:hidden
                       bg-[linear-gradient(100deg,rgba(4,0,11,0.96)_0%,rgba(4,0,11,0.88)_32%,rgba(4,0,11,0.45)_62%,rgba(4,0,11,0.2)_100%)]"
          />
          <div
            className="absolute inset-0 md:hidden
                       bg-[linear-gradient(to_top,rgba(4,0,11,0.97)_0%,rgba(4,0,11,0.9)_38%,rgba(4,0,11,0.5)_68%,rgba(4,0,11,0.35)_100%)]"
          />

          {/* Darkens the strip behind the transparent fixed header. */}
          <div className="absolute inset-x-0 top-0 h-[240px] bg-[linear-gradient(to_bottom,rgba(4,0,11,0.88),rgba(4,0,11,0.45)_45%,transparent)]" />

          {/* Settles the footage into the marquee instead of cutting it off. */}
          <div className="absolute inset-x-0 bottom-0 h-[28%] bg-[linear-gradient(to_top,#04000b_0%,rgba(4,0,11,0.65)_45%,transparent_100%)]" />
        </div>

        {/* ---------- content ---------- */}
        <div
          className="container-page relative z-10
                     pb-[clamp(72px,9vh,120px)] pt-[clamp(112px,14vh,170px)]
                     max-md:pb-[clamp(48px,7vh,72px)] max-md:pt-[120px]"
        >
          <div className="max-w-none">
            {/* The headline leads the page outright. Each Tamil phrase is held on
                one line from 769px up; below that it may wrap, since nowrap at
                phone widths would overflow. */}
            <h1
              className="font-display text-[clamp(2.1rem,5vw,5.75rem)] font-bold
                         leading-[1.14] tracking-[-0.01em] text-white md:whitespace-nowrap
                         max-md:text-[clamp(1.5rem,7.2vw,2.4rem)]"
            >
              {HERO.headingLines.map((line) => (
                <span key={line.accent} className="block">
                  {line.lead}
                  <span className="text-accent">{line.accent}</span>
                </span>
              ))}
            </h1>

            {/* The middle clause is emphasised in white rather than brand purple:
                on this dark stage the purple failed contrast outright. */}
            <p
              className="mt-6 max-w-[36rem] font-body text-[clamp(1rem,1.15vw,1.2rem)]
                         leading-[1.75] text-white/75 max-md:mt-4 max-md:text-base
                         max-md:leading-[1.65]"
            >
              {HERO.leadBefore}{' '}
              <span className="font-semibold text-white">{HERO.leadAccent}</span>
              <br className="hidden md:block" />{' '}
              {HERO.leadAfter}
            </p>

            {/* date + venue, replacing the two bordered boxes */}
            <div
              className="mt-9 max-w-[36rem] flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/15
                         pt-6 max-md:mt-7 max-md:gap-x-5 max-md:pt-5"
            >
              <span className="flex items-center gap-2.5 text-white/85">
                <span className="text-brand">
                  <CalendarIcon />
                </span>
                <span className="font-display text-[clamp(14px,1.05vw,16px)] font-medium tracking-[0.01em]">
                  {HERO.date}
                </span>
              </span>

              <span className="h-4 w-px bg-white/20 max-md:hidden" />

              <span className="flex items-center gap-2.5 text-white/85">
                <span className="text-brand">
                  <PinIcon />
                </span>
                <span className="font-display text-[clamp(14px,1.05vw,16px)] font-medium tracking-[0.01em]">
                  {HERO.location}
                </span>
              </span>
            </div>

            {/* primary action, plus a way to look before committing */}
            <div className="mt-9 flex flex-wrap items-center gap-4 max-md:mt-7 max-md:gap-3">
              <button
                type="button"
                onClick={open}
                className="rounded-full bg-brand-alt px-9 py-[17px] font-display text-[16px]
                           font-semibold tracking-[0.01em] text-white
                           shadow-[0_10px_34px_rgba(98,37,209,0.45)] transition-all duration-300
                           hover:-translate-y-0.5 hover:bg-white hover:text-brand-alt
                           hover:shadow-[0_16px_44px_rgba(98,37,209,0.55)]
                           focus-visible:outline focus-visible:outline-2
                           focus-visible:outline-offset-4 focus-visible:outline-white
                           max-sm:w-full max-sm:px-6 max-sm:text-center max-sm:text-[15px]"
              >
                {HERO.cta}
              </button>

              <a
                href="#passes"
                className="rounded-full border border-white/25 px-8 py-[17px] font-display
                           text-[16px] font-medium text-white/90 transition-all duration-300
                           hover:border-white/60 hover:bg-white/10 hover:text-white
                           focus-visible:outline focus-visible:outline-2
                           focus-visible:outline-offset-4 focus-visible:outline-white
                           max-sm:w-full max-sm:px-6 max-sm:text-center max-sm:text-[15px]"
              >
                {HERO.ctaSecondary}
              </a>
            </div>

            {/* speaker proof */}
            <div className="mt-10 flex items-center gap-4 max-md:mt-7 max-md:gap-3">
              <div className="flex -space-x-3">
                {FACES.map((speaker) => (
                  <img
                    key={speaker.name}
                    src={speaker.img}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-11 w-11 shrink-0 rounded-full border-2 border-ink object-cover
                               object-[center_22%] max-md:h-9 max-md:w-9"
                  />
                ))}
              </div>
              <p className="max-w-[34ch] font-body text-[13.5px] leading-[1.5] text-white/60 max-md:text-[12.5px]">
                {HERO_PROOF.line}
              </p>
            </div>
          </div>
        </div>

        {showVideo && (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? 'Unmute background video' : 'Mute background video'}
            className="absolute bottom-7 right-7 z-20 flex h-11 w-11 items-center justify-center
                       rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-sm
                       transition-all duration-300 hover:border-white/60 hover:bg-black/70
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                       focus-visible:outline-white max-md:bottom-4 max-md:right-4 max-md:h-9 max-md:w-9"
          >
            {muted ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
                <path d="M3 9v6h4l5 4V5L7 9H3z" />
                <path
                  d="M16.5 9.5L21 14m0-4.5L16.5 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
                <path d="M3 9v6h4l5 5V4L7 9H3z" />
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Brand marquee, kept as the transition into the stats band. Scaled down
          from the source's 2vw so it reads as a rule under the hero rather than
          a second headline. */}
      <div className="ml-[-3vw] w-[110%] overflow-hidden bg-brand py-[18px] max-md:py-3">
        <div className="flex w-max animate-strip motion-reduce:animate-none">
          {STRIP_GROUPS.map((group, gi) => (
            <div key={gi} className="flex items-center gap-[4vw] pr-[4vw]">
              {group.map((item) => (
                <span
                  key={item.label}
                  className="flex items-center whitespace-nowrap font-display
                             text-[clamp(14px,1.55vw,24px)] font-bold tracking-[0.01em] text-white"
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
