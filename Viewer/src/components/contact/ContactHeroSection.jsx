import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Lock, Globe2 } from 'lucide-react';
import { CONTACT_PAGE_DEFAULTS } from '../../data/contactPageDefaults';
import ScrollIndicator from '../layout/ScrollIndicator';
import darkThemeContactHero from '../../assets/contact/dark-theme-contact-hero.png';

const ContactHeroSection = ({ data, inquiryRef }) => {
  const defaults = data?.hero || {};
  const primaryCTA = defaults.primaryCTA || 'Contact Experts';
  const secondaryCTA = defaults.secondaryCTA || 'View Headquarters';

  const [isLightMode, setIsLightMode] = React.useState(
    () => typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light'
  );

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setIsLightMode(document.documentElement.getAttribute('data-theme') === 'light');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  const currentHeroImage = isLightMode ? defaults.image : darkThemeContactHero;

  // Use CMS data if available, fallback to defaults
  const addressQuery = encodeURIComponent(data?.fullAddress || data?.headquarters || 'Gurugram, Haryana, India');
  const mapsUrl = `${defaults.headquartersUrl || 'https://www.google.com/maps/search/?api=1&query='}${addressQuery}`;

  const handleMapsClick = () => {
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  };

  const handleScrollToInquiry = () => {
    if (inquiryRef?.current) {
      const headerOffset = 100;
      const elementPosition = inquiryRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-brand-black">

      {/* Cinematic Right-Side Visual Composition */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <div className="w-full h-full relative">
          {/* Main Defense Image */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${currentHeroImage}')` }}>
          </div>
        </div>
      </div>

      {/* LEFT CONTENT AREA (40%) */}
      <div className="container mx-auto px-6 relative z-10 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-[45%]"
        >
          {/* Top Label */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-8 bg-brand-primary"></div>
            <span className="text-sm text-brand-primary tracking-widest font-heading uppercase font-bold">
              {defaults.label}
            </span>
          </div>

          {/* Large Heading */}
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-brand-white leading-[1.1] mb-8">
            {defaults.heading} <br />
            <span className="text-brand-primary">{defaults.headingHighlight}</span> <br />
            {defaults.headingEnd}
          </h1>

          {/* Body Text */}
          <p className="text-xl text-brand-white font-body leading-relaxed mb-12 max-w-lg">
            {defaults.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleScrollToInquiry}
              className="inline-flex items-center justify-center gap-3 bg-brand-primary text-brand-black px-8 py-4 font-heading font-bold uppercase tracking-widest text-sm hover:bg-brand-primary/90 hover:shadow-[0_0_15px_rgba(255,106,0,0.4)] transition-all duration-300 cursor-pointer"
            >
              {primaryCTA}
              <ArrowRight size={18} />
            </button>

            {/* Functional Google Maps Link */}
            <button
              onClick={handleMapsClick}
              className="inline-flex items-center justify-center gap-3 border border-[rgba(0,0,0,0.15)] bg-[rgba(255,255,255,0.4)] text-[#1a1a1a] px-8 py-4 font-heading font-bold uppercase tracking-widest text-sm hover:bg-[rgba(255,255,255,0.6)] hover:border-[rgba(0,0,0,0.3)] transition-all duration-300"
            >
              <MapPin size={18} className="text-brand-primary" />
              {secondaryCTA}
            </button>
          </div>
        </motion.div>
      </div>
      
      <ScrollIndicator />
    </section>
  );
};

export default ContactHeroSection;
