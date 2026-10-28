import { useEffect, useRef, useState } from 'react';
import { TESTIMONIAL_VIDEOS } from '../data/content';
import { getLenis } from '../lib/smoothScroll';
import Reveal from './Reveal';

/* YouTube serves these Shorts as a 16:9 frame with the real vertical shot
   pillarboxed in the middle. Cropping that to 9:16 lands exactly on the
   pillarboxed region, so the faces stay correctly framed. */
const poster = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
const posterFallback = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-[3px] h-5 w-5 fill-brand">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/**
 * Participant videos.
 *
 * Replaces a coverflow carousel that autoplayed every three seconds, overlapped
 * its own cards and could only be operated with a mouse. Five clips fit on one
 * line from 1025px up, so there is nothing to page through; below that the row
 * becomes a native snap rail. No carousel library, no autoplay, no duplicated
 * slides — the visitor decides what to look at and when.
 *
 * The dark ground is deliberate: it separates this chapter from the lilac
 * pricing band above and the white FAQ below, and vertical video reads far
 * better against it.
 */
export default function TestimonialsSection() {
  const [activeVideo, setActiveVideo] = useState(null);
  const closeRef = useRef(null);
  const lastFocused = useRef(null);

  // Holding the page still needs Lenis stopped as well as overflow hidden,
  // since Lenis keeps driving the scroll position on its own.
  useEffect(() => {
    const lenis = getLenis();
    if (activeVideo) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
      closeRef.current?.focus();
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }

    const onKey = (e) => {
      if (e.key === 'Escape') setActiveVideo(null);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      getLenis()?.start();
    };
  }, [activeVideo]);

  const open = (id, e) => {
    lastFocused.current = e.currentTarget;
    setActiveVideo(id);
  };

  const close = () => {
    setActiveVideo(null);
    lastFocused.current?.focus();
  };

  return (
    <section id="stories" className="w-full overflow-hidden bg-ink py-[clamp(56px,7vw,110px)]">
      <div className="container-page">
        <Reveal
          as="h2"
          className="mb-[clamp(32px,4vw,56px)] text-center text-[clamp(1.75rem,4vw,3.125rem)]
                     font-medium uppercase leading-[1.15] text-white"
        >
          What Our <span className="text-accent">Participants</span> Say
        </Reveal>

        {/* One row on desktop; a snap rail below, where five cards would be too
            small to read. */}
        <Reveal
          as="ul"
          variant="stagger"
          className="no-scrollbar -mx-[var(--page-gutter)] flex snap-x snap-mandatory gap-4
                     overflow-x-auto px-[var(--page-gutter)] pb-2
                     xl:mx-0 xl:gap-5 xl:overflow-visible xl:px-0"
        >
          {TESTIMONIAL_VIDEOS.map((id, i) => (
            <li
              key={id}
              className="w-[58vw] max-w-[260px] shrink-0 snap-start sm:w-[230px]
                         xl:w-auto xl:max-w-none xl:flex-1 xl:shrink"
            >
              <button
                type="button"
                onClick={(e) => open(id, e)}
                aria-label={`Play participant video ${i + 1} of ${TESTIMONIAL_VIDEOS.length}`}
                className="group relative block aspect-[9/16] w-full cursor-pointer overflow-hidden
                           rounded-2xl bg-black ring-1 ring-white/10 transition-shadow duration-300
                           hover:shadow-[0_18px_50px_rgba(0,0,0,0.55)]
                           focus-visible:outline focus-visible:outline-2
                           focus-visible:outline-offset-3 focus-visible:outline-accent"
              >
                <img
                  src={poster(id)}
                  alt=""
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = posterFallback(id);
                  }}
                  className="absolute inset-0 h-full w-full object-cover transition-transform
                             duration-500 ease-out group-hover:scale-[1.05]"
                />

                {/* Keeps the play control legible over a bright frame. */}
                <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.5)_0%,transparent_45%)]" />

                <span
                  className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2
                             -translate-y-1/2 items-center justify-center rounded-full
                             bg-white/95 shadow-[0_6px_20px_rgba(0,0,0,0.35)]
                             transition-transform duration-300 ease-out
                             group-hover:scale-110 max-sm:h-12 max-sm:w-12"
                >
                  <PlayIcon />
                </span>
              </button>
            </li>
          ))}
        </Reveal>
      </div>

      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Participant video"
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/[0.92] p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="relative w-[min(400px,92vw)] max-md:w-[min(340px,88vw)]">
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close video"
              className="absolute -top-11 right-0 text-[32px] font-bold leading-none text-white
                         transition-colors duration-200 hover:text-accent
                         focus-visible:outline focus-visible:outline-2
                         focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              &times;
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${encodeURIComponent(activeVideo)}?autoplay=1&playsinline=1&rel=0`}
              title="Participant video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="block aspect-[9/16] max-h-[82vh] w-full rounded-xl border-none bg-black"
            />
          </div>
        </div>
      )}
    </section>
  );
}
