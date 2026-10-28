import { useState } from 'react';
import { FAQS } from '../data/content';

/**
 * .faq-one-accrodion — one panel open at a time, with the purple rail on the
 * left edge scaling in and the icomoon plus/minus toggle on the right.
 */
export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative block overflow-hidden py-[60px]">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        <div className="relative mt-[55px] block">
          <h2 className="mb-10 text-center text-[50px] font-medium uppercase leading-[60px]">
            FAQ
          </h2>

          <div>
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={faq.q}
                  className={`relative block rounded-lg border border-[#e2e0e5] bg-white
                              shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-500
                              [&+div]:mt-5
                              before:absolute before:bottom-0 before:left-0 before:top-0 before:z-[1]
                              before:w-[5px] before:rounded-l-lg before:bg-brand
                              before:transition-all before:duration-500 before:content-['']
                              ${isOpen ? 'before:scale-y-100' : 'before:scale-y-0'}`}
                >
                  <div
                    role="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="relative block cursor-pointer rounded-lg py-5 pl-10 pr-[27px]
                               transition-all delay-100 duration-200"
                  >
                    <h4 className="relative m-0 text-xl font-medium uppercase leading-[30px] text-ink">
                      {faq.q}
                      <span
                        data-open={isOpen}
                        className="faq-toggle icon absolute right-0 top-1/2 flex h-[35px] w-[35px]
                                   -translate-y-1/2 items-center justify-center rounded-full
                                   text-center transition-all duration-500"
                      />
                    </h4>
                  </div>

                  {isOpen && (
                    <div className="relative -mt-[7px] rounded-lg px-10 pb-[29px]">
                      <p className="m-0 text-base leading-8">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
