import { PARTNERS } from '../data/content';

/** .partners-section — four client marks on a 1200px grid, two-up on tablet. */
export default function PartnersSection() {
  return (
    <section className="my-5 w-full bg-white px-5 pb-[45px] pt-[30px] max-xs:p-[25px_15px_35px]">
      <h2 className="m-[40px_0_20px] text-center text-[50px] font-medium uppercase leading-[60px]">
        Our Trusted Partners
      </h2>

      <div
        className="mx-auto grid max-w-[1200px] grid-cols-4 items-start gap-[30px]
                   max-md:grid-cols-2 max-md:gap-[35px_20px] max-xs:gap-[30px_12px]"
      >
        {PARTNERS.map((partner) => (
          <div key={partner.name} className="flex min-w-0 flex-col items-center text-center">
            <div className="flex h-[95px] w-full items-center justify-center max-md:h-[85px] max-xs:h-[70px]">
              <img
                src={partner.img}
                alt={partner.name}
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
        ))}
      </div>
    </section>
  );
}
