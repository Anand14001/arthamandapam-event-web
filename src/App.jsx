import { useEffect } from 'react';
import { startSmoothScroll } from './lib/smoothScroll';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import JourneySection from './components/JourneySection';
import TickerStrip from './components/TickerStrip';
import ExperienceSection from './components/ExperienceSection';
import PartnersSection from './components/PartnersSection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import RegistrationProvider from './components/RegistrationProvider';

/** Section order follows the source document exactly. */
export default function App() {
  // One Lenis instance for the whole page, torn down on unmount.
  useEffect(() => startSmoothScroll(), []);

  return (
    <RegistrationProvider>
      <ScrollProgress />
      <Header />

      <main>
        <Hero />
        <StatsSection />
        <JourneySection />
        <TickerStrip />
        <ExperienceSection />
        <PartnersSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
      </main>

      <Footer />
      <ScrollToTop />
    </RegistrationProvider>
  );
}
