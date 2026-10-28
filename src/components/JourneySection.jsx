import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { JOURNEY, SPEAKERS, HERO } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

/**
 * .home-section-2 — the outlined white panel holding the five journey steps and
 * the speaker grid, capped by the lilac location/date bar. Scroll animations are
 * ported one-for-one from the page's events.js.
 */
export default function JourneySection() {
  const root = useRef(null);

  useEffect(() => {
    // Entrance animations are decoration; skip them when the visitor has asked
    // for reduced motion so nothing animates in from a hidden state.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('.js-tag', {
        scrollTrigger: { trigger: '.js-tag', start: 'top 85%', once: true },
        duration: 1.2,
        rotationX: -90,
        transformOrigin: 'top center',
        opacity: 0,
        ease: 'power4.out',
        clearProps: 'all',
      });

      gsap.from('.js-card', {
        scrollTrigger: { trigger: '.js-card', start: 'top 85%', once: true },
        y: 120,
        scale: 0.75,
        opacity: 0,
        duration: 1,
        stagger: 0.25,
        ease: 'back.out(1.4)',
        clearProps: 'all',
      });

      gsap.from('.js-speakers-title', {
        scrollTrigger: { trigger: '.js-speakers-title', start: 'top 85%', once: true },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        clearProps: 'all',
      });

      gsap.from('.js-speaker', {
        scrollTrigger: { trigger: '.js-speaker-grid', start: 'top 90%', once: true },
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: { each: 0.08, ease: 'none' },
        ease: 'power2.out',
        force3D: true,
        clearProps: 'transform,opacity',
      });

      gsap.from('.js-footer-icon svg', {
        scrollTrigger: { trigger: '.js-footer-icon', start: 'top 85%', once: true },
        scale: 0,
        rotation: 360,
        opacity: 0,
        duration: 1,
        ease: 'elastic.out(1,0.4)',
        clearProps: 'all',
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative w-full bg-white px-[6vw] py-[3vw] max-sm:p-[5vw]">
      <div
        className="js-tag absolute left-[6vw] top-[3vw] z-[2] rounded-[0.8vw_0.8vw_0.8vw_0] bg-brand
                   px-[2vw] py-[1.2vw] font-display text-[1.5vw] font-bold text-white
                   max-sm:left-[5vw] max-sm:top-[5vw] max-sm:rounded-[3vw_3vw_3vw_0]
                   max-sm:px-[6vw] max-sm:py-[3vw] max-sm:text-[5vw]"
      >
        <i className="icon icon-three-right-arrow" />
      </div>

      <div
        className="rounded-[1vw_1vw_0_0] border-[0.12vw] border-brand bg-white px-[4vw] pb-[5vw]
                   pt-[7vw] max-sm:rounded-[3vw_3vw_0_0] max-sm:px-0 max-sm:pb-[10vw] max-sm:pt-[20vw]"
      >
        <h2
          className="text-center font-display text-[4vw] font-black leading-[1.1] text-black
                     max-sm:mt-[5vw] max-sm:text-[7.5vw]"
        >
          Your Creator <br className="max-sm:hidden" />
          <span className="text-brand">Journey</span> Starts Here
        </h2>

        {/* five steps: 3 across, then 2 across, on a six-column grid */}
        <div
          className="mt-[4vw] grid grid-cols-6 gap-5 max-md:grid-cols-1
                     max-sm:gap-[4vw] max-sm:px-[5vw] max-sm:py-[4vw]"
        >
          {JOURNEY.map((item, i) => (
            <div
              key={item.title}
              className={`js-card w-full rounded-[1.5vw] border-[0.15vw] border-brand p-[2vw]
                          text-center max-sm:rounded-[4vw] max-sm:p-[6vw]
                          ${i < 3 ? 'col-span-2' : 'col-span-3'} max-md:col-span-1`}
            >
              <h3
                className="mb-[-0.8vw] font-display text-[3vw] font-black leading-none text-brand
                           max-sm:text-[10vw]"
              >
                {item.title}
              </h3>
              <p className="mt-[2vw] font-body text-[1.4vw] font-light leading-[1.3] max-sm:mt-[4vw] max-sm:text-[5vw]">
                {item.lines[0]}
                <br /> {item.lines[1]}
                <br />
                {item.rest}
              </p>
            </div>
          ))}
        </div>

        {/* speakers */}
        <div className="mb-[5vw] mt-[3vw] w-full">
          <h3
            className="js-speakers-title mb-10 text-center font-display text-[4vw] font-black
                       leading-[1.1] text-black max-xl:text-[3.5vw]
                       max-sm:mb-[6vw] max-sm:text-[7vw]"
          >
            Learn from the <span className="text-brand">Creators Who've </span> <br /> Already Built
            It.
          </h3>

          <div
            className="js-speaker-grid grid w-full grid-cols-3 gap-[2vw] max-xl:gap-[1.5vw]
                       max-sm:grid-cols-2 max-sm:gap-[3vw] max-sm:px-[5vw]"
          >
            {SPEAKERS.map((speaker) => (
              <div
                key={speaker.name}
                className="js-speaker relative overflow-hidden bg-[#f9f9f9] transition-[transform,box-shadow]
                           duration-300 will-change-transform hover:-translate-y-[0.5vw]
                           hover:shadow-[0_10px_30px_rgba(98,34,204,0.15)] max-sm:rounded-[4vw]"
              >
                <img
                  src={speaker.img}
                  alt={speaker.alt}
                  loading="lazy"
                  className="block h-[400px] w-full rounded-[1.5vw_1.5vw_0_0] object-cover
                             max-xl:h-[35vw] max-sm:h-[45vw] max-sm:rounded-[4vw_4vw_0_0]"
                />
                <div className="rounded-[0_0_20px_20px] border border-brand p-[1.5vw] max-sm:p-[3vw]">
                  <p
                    className="mb-[0.4vw] font-display text-[1.5vw] font-black leading-[1.2]
                               text-black max-xl:text-[1.8vw] max-sm:mb-[1.5vw] max-sm:text-[4vw]"
                  >
                    {speaker.name}
                  </p>
                  <p
                    className="mb-[0.3vw] font-display text-[1vw] font-bold text-brand
                               max-xl:text-[1.3vw] max-sm:mb-[1vw] max-sm:text-[3vw] max-sm:leading-[1.4]"
                  >
                    {speaker.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* lilac location / date bar, continuous with the panel above it */}
      <div
        className="flex items-center justify-center gap-[3vw] border-[0.12vw] border-t-0
                   border-brand bg-lilac p-[2vw] max-sm:gap-[4vw] max-sm:p-[5vw]"
      >
        <div className="flex items-center gap-[1vw] max-sm:flex-col max-sm:text-center">
          <strong className="font-display text-[2vw] max-sm:text-[4vw]">Location</strong>
          <span className="font-body text-[1.8vw] font-light max-sm:text-[3vw]">
            MMA Auditorium, Chennai.
          </span>
        </div>

        <div className="js-footer-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 231.8 231.78"
            className="w-[4vw] fill-brand max-sm:w-[10vw]"
          >
            <path d="M115.82,231.78l-9.28-43.95c-6.5-30.77-29.46-55.51-60.33-62.11L0,115.81l43.8-9.23c31.63-6.66,55.94-30.7,62.64-62.34L115.81,0l9.26,43.85c6.64,31.45,30.46,55.87,61.93,62.52l44.8,9.47-44.79,9.48c-31.64,6.69-55.94,31.21-62.03,62.93l-9.16,43.53Z" />
          </svg>
        </div>

        <div className="flex items-center gap-[1vw] max-sm:flex-col max-sm:text-center">
          <strong className="font-display text-[2vw] max-sm:text-[4vw]">Dates</strong>
          <span className="font-body text-[1.8vw] font-light max-sm:text-[3vw]">{HERO.date}</span>
        </div>
      </div>
    </section>
  );
}
