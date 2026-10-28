import { useEffect, useState } from 'react';

/** .scroll-to-top — 45px purple disc, bottom right, revealed once past the fold. */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-10 right-10 z-[99] h-[45px] w-[45px] rounded-full bg-brand
                 text-center transition-all duration-[400ms] hover:bg-ink"
    >
      <i className="fa fa-angle-up text-lg leading-[45px] text-white" />
    </button>
  );
}
