import Reveal from './Reveal';
import { useRegistration } from './RegistrationProvider';
import {
  ABOUT_LINE,
  EMAIL,
  FOOTER_CTA,
  LEGAL,
  LOGO,
  OFFICES,
  PHONE,
  PHONE_HREF,
  SOCIALS,
} from '../data/content';

const CONTAINER = 'container-page';

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[22px] w-[22px]"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[22px] w-[22px]"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[22px] w-[22px]"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/** Small label above each footer block, with the brand rule underneath. */
function Heading({ children }) {
  return (
    <h3
      className="relative mb-6 pb-3 font-display text-[13px] font-semibold uppercase
                 tracking-[0.16em] text-white after:absolute after:bottom-0 after:left-0
                 after:h-0.5 after:w-9 after:bg-brand after:content-['']"
    >
      {children}
    </h3>
  );
}

/**
 * Landing-page footer.
 *
 * The original site's footer is a sitemap — service columns, industry columns,
 * a careers link. None of that serves a single-event page, where the footer's
 * job is to close: restate the offer, then answer the questions that come right
 * before a decision (who are you, how do I reach you, where are you).
 *
 * Three zones: a closing CTA band, a contact block, and a legal bar.
 */
export default function Footer() {
  const { open } = useRegistration();
  return (
    <footer className="relative z-[1] w-full bg-black text-white">
      {/* ---- closing CTA ------------------------------------------------- */}
      <section
        className="relative overflow-hidden bg-[linear-gradient(135deg,#6222cc_0%,#4a18a0_100%)]
                   py-[90px] text-center max-md:py-[60px]"
      >
        {/* soft centre glow, echoing the "Inside the Event" ring */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px]
                     -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]
                     bg-[radial-gradient(circle,rgba(255,255,255,0.22)_0%,transparent_70%)]"
        />

        <Reveal className={`${CONTAINER} relative z-[2]`}>
          <h2
            className="mx-auto max-w-[24ch] text-balance font-display
                       text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-[1.12] text-white"
          >
            {FOOTER_CTA.heading}{' '}
            <span className="text-white/70">{FOOTER_CTA.headingAccent}</span>
          </h2>

          <p className="mx-auto mt-6 max-w-[62ch] font-body text-[1.05rem] leading-[1.7] text-white/85 max-sm:text-base">
            {FOOTER_CTA.body}
          </p>

          <button
            type="button"
            onClick={open}
            className="mt-9 inline-block rounded-full bg-white px-12 py-[18px] font-display
                       text-[17px] font-bold tracking-[0.02em] text-brand-alt
                       shadow-[0_14px_40px_rgba(0,0,0,0.3)] transition-all duration-300
                       hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]
                       max-sm:w-full max-sm:px-6 max-sm:text-[15px]"
          >
            {FOOTER_CTA.cta}
          </button>

          <p className="mt-5 font-body text-sm tracking-[0.04em] text-white/70">
            {FOOTER_CTA.note}
          </p>
        </Reveal>
      </section>

      {/* ---- contact ------------------------------------------------------ */}
      <div className={`${CONTAINER} py-[60px] max-md:py-10`}>
        {/* Columns are sized to their content rather than evenly: the office
            block carries two full addresses, the contact block only two lines. */}
        <Reveal
          variant="stagger"
          className="grid grid-cols-[1.1fr_0.9fr_1.4fr] gap-12 max-lg:grid-cols-1 max-lg:gap-10"
        >
          {/* brand */}
          <div className="max-w-[320px]">
            <a href="/" aria-label="Arthamandapam home">
              <img
                src={LOGO}
                alt="Arthamandapam Logo"
                width="155"
                height="55"
                className="block h-[52px] w-auto rounded bg-white object-contain p-2"
              />
            </a>
            <p className="mt-5 font-body text-[15px] leading-[1.8] text-[#9ca3af]">{ABOUT_LINE}</p>

            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  aria-label="Arthamandapam social profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full border
                             border-white/15 text-white transition-all duration-300
                             hover:-translate-y-0.5 hover:border-brand hover:bg-brand"
                >
                  <i className={`${social.icon} text-[15px]`} />
                </a>
              ))}
            </div>
          </div>

          {/* reach us */}
          <div>
            <Heading>Reach Us</Heading>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={PHONE_HREF}
                  className="group flex items-start gap-3 text-[#9ca3af] transition-colors
                             duration-300 hover:text-white"
                >
                  <span className="mt-0.5 text-white/70 transition-colors group-hover:text-brand">
                    <PhoneIcon />
                  </span>
                  <span className="text-[15px] font-medium">{PHONE}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex items-start gap-3 text-[#9ca3af] transition-colors
                             duration-300 hover:text-white"
                >
                  <span className="mt-0.5 text-white/70 transition-colors group-hover:text-brand">
                    <MailIcon />
                  </span>
                  <span className="break-all text-[15px] font-medium">{EMAIL}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* offices */}
          <div>
            <Heading>Our Offices</Heading>
            <ul className="flex flex-col gap-5">
              {OFFICES.map((office) => (
                <li key={office.city} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-white/70">
                    <PinIcon />
                  </span>
                  <div>
                    <p className="font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-white">
                      {office.city}
                    </p>
                    <p className="mt-1 font-body text-[13.5px] leading-[1.6] text-[#9ca3af]">
                      {office.address}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* ---- legal -------------------------------------------------------- */}
      <div className="border-t border-[#2f363c] bg-[#15191d] py-6">
        <div
          className={`${CONTAINER} flex flex-wrap items-center justify-between gap-4
                      max-md:flex-col max-md:justify-center max-md:text-center`}
        >
          <p className="text-sm text-white">
            © Copyrights, 2026{' '}
            <a href="/" className="text-brand transition-colors hover:text-white">
              Arthamandapam
            </a>
          </p>
          <ul className="flex gap-6 max-md:flex-wrap max-md:justify-center">
            {LEGAL.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-sm text-[#9ca3af] transition-colors duration-300 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
