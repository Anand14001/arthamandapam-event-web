import { PARTNERS } from '../data/content';
import Reveal from './Reveal';

/* One half of the rail. Four logos only fill ~900px, so the set is repeated
   until a half comfortably exceeds the widest viewport we support — otherwise
   the loop would show a gap before it wraps. The track renders two identical
   halves and travels exactly -50%, which puts it back where it started. */
const REPEATS = 4;
const HALF = Array.from({ length: REPEATS }, () => PARTNERS).flat();

/**
 * .partners-section — four client marks on a continuous right-to-left rail that
 * pauses on hover.
 *
 * Only the first set carries alt text; every repeat after it is aria-hidden, so
 * a screen reader hears the four partners once rather than thirty-two times.
 */
export default function PartnersSection() {
  return (
    <section className="my-5 w-full overflow-hidden bg-white px-5 pb-[45px] pt-[30px] max-xs:p-[25px_15px_35px]">
      <Reveal as="h2" className="m-[40px_0_20px] text-center text-[50px] font-medium uppercase leading-[60px]">
        Our Trusted Partners
      </Reveal>

      {/* The mask feathers both ends so logos fade out instead of being clipped
          mid-mark at the edges. Under reduced motion the rail stops, so it becomes
          manually scrollable — otherwise the off-screen partners are unreachable
          on a narrow viewport. */}
      <div
        className="group relative w-full overflow-hidden motion-reduce:overflow-x-auto
                   [mask-image:linear-gradient(to_right,transparent_0%,black_7%,black_93%,transparent_100%)]"
      >
        <div
          className="flex w-max animate-partners will-change-transform
                     group-hover:[animation-play-state:paused]
                     motion-reduce:animate-none"
        >
          {[0, 1].map((half) =>
            HALF.map((partner, i) => {
              // Everything after the very first set is decorative duplication.
              const decorative = half > 0 || i >= PARTNERS.length;
              return (
                <div
                  key={`${half}-${i}`}
                  className="flex w-[clamp(150px,18vw,230px)] shrink-0 flex-col items-center px-4 text-center"
                  aria-hidden={decorative ? 'true' : undefined}
                >
                  <div className="flex h-[95px] w-full items-center justify-center max-md:h-[85px] max-xs:h-[70px]">
                    <img
                      src={partner.img}
                      alt={decorative ? '' : partner.name}
                      loading="lazy"
                      className="block h-auto max-h-[80px] w-auto max-w-[170px] object-contain
                                 max-md:max-h-[70px] max-md:max-w-[145px]
                                 max-xs:max-h-[60px] max-xs:max-w-[120px]"
                    />
                  </div>
                  <p
                    className="mt-5 font-[Arial,sans-serif] text-sm font-semibold leading-[1.5]
                               text-partner max-md:mt-3 max-md:text-[13px] max-xs:mt-2.5 max-xs:text-xs"
                  >
                    {partner.name}
                  </p>
                </div>
              );
            }),
          )}
        </div>
      </div>
    </section>
  );
}
