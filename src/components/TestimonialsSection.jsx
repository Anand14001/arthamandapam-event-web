import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { TESTIMONIAL_VIDEOS } from '../data/content';

/**
 * .youtube-carousel-section — 9:16 Shorts thumbnails in a coverflow carousel
 * that opens the clip in a vertical modal. Swiper options match the page's
 * inline init exactly (depth 120, 3s autoplay, 600ms speed).
 */
export default function TestimonialsSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);

  // The source locks body scroll while the modal is open and closes on Escape.
  useEffect(() => {
    document.body.style.overflow = activeVideo ? 'hidden' : '';
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveVideo(null);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activeVideo]);

  const arrow =
    'absolute top-1/2 z-20 flex h-[45px] w-[45px] -translate-y-1/2 cursor-pointer items-center ' +
    'justify-center rounded-full border-2 border-brand bg-white transition-colors duration-200 ' +
    'hover:bg-[#f5f0ff] max-md:hidden';
  const chevron = 'h-2.5 w-2.5 border-[#333]';

  return (
    <section className="relative overflow-hidden bg-white pb-[50px] pt-20 text-center max-md:pb-[30px] max-md:pt-[50px]">
      <h2
        className="mb-[50px] text-[50px] font-medium uppercase leading-[60px] text-black
                   max-md:mb-[30px] max-md:px-4 max-md:text-[30px] max-[380px]:text-[26px]"
      >
        What Our Participants Say
      </h2>

      <div className="relative mx-auto max-w-[1400px] px-[60px] max-md:px-2.5">
        <div ref={prevRef} className={`${arrow} left-0`} aria-label="Previous video" role="button">
          <span className={`${chevron} rotate-[-45deg] border-l-2 border-t-2 translate-x-[2px] translate-y-[2px]`} />
        </div>
        <div ref={nextRef} className={`${arrow} right-0`} aria-label="Next video" role="button">
          <span className={`${chevron} rotate-45 border-r-2 border-t-2 -translate-x-[2px] translate-y-[2px]`} />
        </div>

        <Swiper
          modules={[EffectCoverflow, Navigation, Autoplay]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          loop
          loopAdditionalSlides={0}
          watchSlidesProgress
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 120, modifier: 1, slideShadows: false }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          speed={600}
          observer
          observeParents
          className="w-full overflow-hidden pb-10 pt-5"
        >
          {TESTIMONIAL_VIDEOS.map((id) => (
            <SwiperSlide
              key={id}
              onClick={() => setActiveVideo(id)}
              className="!h-[480px] !w-[270px] cursor-pointer overflow-hidden rounded-[14px] bg-black
                         max-md:!h-[391px] max-md:!w-[220px] max-md:rounded-xl
                         max-[380px]:!h-[338px] max-[380px]:!w-[190px]"
            >
              <div
                className="group flex h-full w-full items-center justify-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('https://img.youtube.com/vi/${id}/maxresdefault.jpg')` }}
              >
                <div
                  className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full
                             bg-white/90 text-2xl text-brand shadow-[0_4px_15px_rgba(0,0,0,0.3)]
                             transition-all duration-300 group-hover:scale-110 group-hover:bg-white
                             group-hover:shadow-[0_6px_20px_rgba(0,0,0,0.4)]"
                >
                  <span className="ml-1 leading-none">▶</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* vertical video modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[999999] flex h-full w-full items-center justify-center bg-black/[0.92] p-[15px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveVideo(null);
          }}
        >
          <div className="relative m-auto w-[min(400px,92vw)] max-w-[400px] max-md:w-[min(340px,88vw)]">
            <span
              role="button"
              aria-label="Close video"
              onClick={() => setActiveVideo(null)}
              className="absolute -top-[42px] right-0 cursor-pointer text-[35px] font-bold leading-none
                         text-white transition-colors duration-300 hover:text-brand
                         max-md:-top-[35px] max-md:text-[30px]"
            >
              &times;
            </span>
            <iframe
              src={`https://www.youtube.com/embed/${encodeURIComponent(activeVideo)}?autoplay=1&playsinline=1&rel=0`}
              title="YouTube Shorts video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="block aspect-[9/16] max-h-[82vh] w-full rounded-xl border-none bg-black max-md:max-h-[78vh]"
            />
          </div>
        </div>
      )}
    </section>
  );
}
