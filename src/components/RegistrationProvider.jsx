import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import RegistrationForm from './RegistrationForm';
import { REGISTER_URL } from '../data/content';
import { getLenis } from '../lib/smoothScroll';

const RegistrationContext = createContext({ open: () => {} });

/** Any CTA on the page can call `open()` without prop drilling. */
export const useRegistration = () => useContext(RegistrationContext);

/**
 * Registration popup.
 *
 * Opens in place instead of sending the visitor off to the hosted Zoho form.
 * The panel is sized to fit any viewport and scrolls internally, with the page
 * behind it held still.
 *
 * The form inside is our own markup, matching the Zoho form field for field.
 * It is not yet wired to a backend — see RegistrationForm — so the header keeps
 * a link to the live form, which does accept registrations and payment.
 */
export default function RegistrationProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef(null);
  const lastFocused = useRef(null);

  const open = useCallback(() => {
    lastFocused.current = document.activeElement;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Hand focus back to whichever CTA opened the dialog.
    if (lastFocused.current && lastFocused.current.focus) lastFocused.current.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    // Lenis keeps driving scroll position on its own, so overflow:hidden alone
    // would not hold the page still behind the dialog.
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      getLenis()?.start();
    };
  }, [isOpen, close]);

  return (
    <RegistrationContext.Provider value={{ open }}>
      {children}

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Book your seat"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          className="fixed inset-0 z-[1000000] flex items-center justify-center bg-black/80
                     p-[clamp(10px,3vw,28px)] backdrop-blur-sm"
        >
          <div
            className="relative flex h-[min(92svh,940px)] w-[min(780px,100%)] flex-col
                       overflow-hidden rounded-2xl bg-white shadow-[0_30px_90px_rgba(0,0,0,0.5)]
                       max-sm:rounded-xl"
          >
            <header className="flex shrink-0 items-center justify-between gap-4 border-b border-black/10 px-5 py-3">
              <p className="font-display text-[14px] font-semibold text-ink">Book Your Seat</p>

              <div className="flex items-center gap-4">
                {/* If the embed is ever blocked, the original form is still one
                    click away rather than unreachable. */}
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[12px] text-black/50 underline-offset-4 hover:text-brand hover:underline max-sm:hidden"
                >
                  Open in a new tab
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Close registration form"
                  className="flex h-9 w-9 items-center justify-center rounded-full border
                             border-black/10 text-ink transition-colors duration-200
                             hover:border-brand hover:text-brand focus-visible:outline
                             focus-visible:outline-2 focus-visible:outline-offset-2
                             focus-visible:outline-brand"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <RegistrationForm />
            </div>
          </div>
        </div>
      )}
    </RegistrationContext.Provider>
  );
}
