import { useState } from 'react';
import Reveal from './Reveal';
import { EMAIL, FAQS, PHONE, PHONE_HREF } from '../data/content';

/**
 * Frequently asked questions.
 *
 * A hairline-divided list on a constrained measure rather than six stacked
 * cards with drop shadows: the questions are the content, so the dividers carry
 * the structure and nothing competes with them. Centred and narrow on purpose —
 * "Inside the Event" above already runs a two-column sticky layout, and a long
 * question row on a 1400px rail puts the toggle an awkward distance from the
 * text it belongs to.
 *
 * Questions are sentence case. The previous version set them in uppercase,
 * which costs real legibility on a 70-character question.
 *
 * Each row is a real button with `aria-expanded` and `aria-controls`, and the
 * panel is a labelled region. The old markup used `role="button"` on a div, so
 * it could not be opened from the keyboard at all.
 */
function Toggle({ isOpen }) {
  return (
    <span
      aria-hidden="true"
      className={`relative ml-5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full
                  border transition-colors duration-300
                  ${isOpen ? 'border-brand bg-brand text-white' : 'border-black/15 text-ink group-hover:border-brand group-hover:text-brand'}`}
    >
      <span className="relative block h-3 w-3">
        <span className="absolute left-0 top-1/2 h-[1.5px] w-3 -translate-y-1/2 bg-current" />
        <span
          className={`absolute left-1/2 top-0 h-3 w-[1.5px] -translate-x-1/2 bg-current
                      transition-transform duration-300 ease-out motion-reduce:transition-none
                      ${isOpen ? 'rotate-90' : ''}`}
        />
      </span>
    </span>
  );
}

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="w-full bg-white py-[clamp(64px,8vw,120px)]">
      <div className="container-page">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <h2
            className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold
                       leading-[1.15] tracking-[-0.02em] text-ink"
          >
            Frequently Asked <span className="text-brand">Questions</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[56ch] font-body text-[16px] leading-[1.7] text-black/55">
            Who it&apos;s for, what language it runs in, what each pass includes, and what happens
            after the workshop.
          </p>
        </Reveal>

        <Reveal variant="stagger" className="mx-auto mt-[clamp(36px,4.5vw,64px)] max-w-[900px]">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;

            return (
              <div key={faq.q} className="border-t border-black/10 last:border-b">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group flex w-full items-center justify-between gap-4 py-6
                               text-left transition-colors duration-200
                               focus-visible:outline focus-visible:outline-2
                               focus-visible:outline-offset-2 focus-visible:outline-brand
                               max-sm:py-5"
                  >
                    <span
                      className={`font-display text-[clamp(1rem,1.3vw,1.125rem)] font-medium
                                  leading-[1.45] transition-colors duration-200
                                  ${isOpen ? 'text-brand' : 'text-ink group-hover:text-brand'}`}
                    >
                      {faq.q}
                    </span>
                    <Toggle isOpen={isOpen} />
                  </button>
                </h3>

                {/* 0fr -> 1fr animates the panel open without measuring heights
                    in JavaScript. */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out
                              motion-reduce:transition-none
                              ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[72ch] pb-7 pr-12 font-body text-[16px] leading-[1.75] text-black/60 max-sm:pr-0">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>

        {/* The question that is not on the list. */}
        <div
          className="mx-auto mt-[clamp(32px,4vw,56px)] flex max-w-[900px] flex-wrap items-center
                     justify-between gap-5 rounded-2xl bg-lilac px-[clamp(20px,3vw,36px)]
                     py-[clamp(20px,2.6vw,30px)] max-sm:flex-col max-sm:items-start"
        >
          <p className="font-display text-[1.05rem] font-medium text-ink">
            Still have a question?
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            <a
              href={`mailto:${EMAIL}`}
              className="font-body text-[15px] font-medium text-brand underline-offset-4 hover:underline"
            >
              {EMAIL}
            </a>
            <a
              href={PHONE_HREF}
              className="font-body text-[15px] font-medium text-brand underline-offset-4 hover:underline"
            >
              {PHONE}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
