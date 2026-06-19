import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWebsiteContent } from '../hooks/useWebsiteContent';
import SEOManager from '../components/layout/SEOManager';
import ScrollProgress from '../components/layout/ScrollProgress';
import Header from '../components/layout/Header';
import FooterSection from '../components/layout/FooterSection';
import { RefreshCw, ArrowRight, Target, Shield, Radar, Camera, Cpu } from 'lucide-react';
import { getServiceImage } from '../utils/serviceAssetResolver';

// Import local assets
import servicesHeroImage from '../../src/assets/services/hero-services.avif';

// Rotates through multiple icons so they do not repeat consecutively
const FEATURE_ICONS = [Radar, Camera, Cpu, Shield, Target];
const getFeatureIcon = (index) => {
  const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
  return <Icon className="w-6 h-6 text-brand-primary" />;
};

const ServicesPage = () => {
  const { content, error, refreshContent } = useWebsiteContent();
  const location = useLocation();
  const [activeServiceId, setActiveServiceId] = useState('');

  useEffect(() => {
    // Handle URL parameters or Hash for scrolling to a specific service initially
    const searchParams = new URLSearchParams(location.search);
    const serviceParam = location.hash ? location.hash.replace('#', '') : searchParams.get('service');

    if (serviceParam) {
      setTimeout(() => {
        const element = document.getElementById(`service-${serviceParam}`);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });

          // Temporary subtle highlight to indicate which section was deep-linked
          element.classList.add('bg-brand-white/[0.02]', 'transition-colors', 'duration-1000');
          setTimeout(() => {
            element.classList.remove('bg-brand-white/[0.02]');
          }, 3000);
        }
      }, 500);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  if (error) {
    return (
      <div className="w-full min-h-screen bg-brand-black flex flex-col items-center justify-center text-brand-white p-6">
        <h2 className="text-3xl font-bold mb-4 font-heading">Connection Lost</h2>
        <p className="text-brand-white/60 mb-8 max-w-md text-center font-body">{error}</p>
        <button
          onClick={refreshContent}
          className="flex items-center gap-2 px-6 py-3 bg-brand-white/10 hover:bg-brand-white/20 transition-colors rounded-sm font-heading uppercase tracking-wider text-sm"
        >
          <RefreshCw size={18} />
          Retry Connection
        </button>
      </div>
    );
  }

  if (!content) return null;

  const { seoData, siteData, servicesData, servicesPageData, footerData } = content;

  const pageSeoData = {
    ...seoData,
    title: `Capabilities | ${siteData?.siteName || 'Dynasas'}`,
    description: servicesPageData?.heroDescription || 'Our mission-critical capabilities.'
  };

  const services = servicesData?.items || [];

  const scrollToService = (id) => {
    const element = document.getElementById(`service-${id}`);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const createSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  // Helper function to split feature text (bold title vs description)
  const renderFeatureText = (text) => {
    const delimiterIndex = text.indexOf(':') !== -1 ? text.indexOf(':') : (text.indexOf(' - ') !== -1 ? text.indexOf(' - ') : -1);

    if (delimiterIndex !== -1) {
      const title = text.substring(0, delimiterIndex).trim();
      const offset = text.charAt(delimiterIndex) === ':' ? 1 : 3;
      const desc = text.substring(delimiterIndex + offset).trim();

      return (
        <div className="flex flex-col">
          <span className="font-heading font-bold text-brand-white text-base mb-1">{title}</span>
          <span className="text-brand-white/60 text-sm leading-relaxed">{desc}</span>
        </div>
      );
    }

    return (
      <span className="text-brand-white/80 font-heading font-bold text-base">{text}</span>
    );
  };

  const renderHeroTitle = (title) => {
    if (!title) return null;
    const words = title.split(' ');
    if (words.length <= 2) return title;
    const lastTwo = words.slice(-2).join(' ');
    const rest = words.slice(0, -2).join(' ');
    return (
      <>
        {rest} <br className="hidden lg:block" />
        <span className="text-brand-primary">{lastTwo}</span>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-brand-black text-brand-white font-body selection:bg-brand-primary/30 selection:text-brand-white overflow-x-hidden">
      <SEOManager seoData={pageSeoData} />
      <ScrollProgress primaryColor="var(--color-brand-primary)" />
      <Header siteData={siteData} />

      {/* 1. Premium Hero Background Section */}
      <section className="relative min-h-[75vh] flex items-center pt-32 pb-24 overflow-hidden">
        {/* Defence Command Center Background Image & Overlays */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <img
            src={servicesHeroImage}
            alt="Defence Operations Command Center"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          {/* Black overlay at 60% to preserve readability and match defence aesthetic */}
          <div className="absolute inset-0 bg-brand-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/80" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Hero Content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-4 h-6 border border-brand-primary rounded-full flex items-center justify-center">
                    <div className="w-1 h-2 bg-brand-primary rounded-full" />
                  </div>
                  <h4 className="text-brand-primary font-heading tracking-[0.2em] text-sm font-bold uppercase">
                    {servicesPageData?.heroLabel || "SERVICES"}
                  </h4>
                </div>

                <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-8 leading-[1.1] text-brand-white tracking-tight">
                  {renderHeroTitle(servicesPageData?.heroTitle || "Mission-Critical Defence Services")}
                </h1>

                <div className="w-16 h-1 bg-brand-primary mb-8" />

                <p className="text-brand-white/70 text-lg lg:text-xl leading-relaxed max-w-2xl font-body">
                  {servicesPageData?.heroDescription || "We deliver advanced technological superiority platforms to defense, intelligence, and national security organizations worldwide."}
                </p>
              </motion.div>
            </div>

            {/* 2. Services Navigator Card (Floating Right) */}
            <div className="lg:col-span-4 lg:col-start-9 hidden lg:block">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="bg-brand-black/40 backdrop-blur-2xl border border-brand-white/10 rounded-2xl p-8 relative overflow-hidden shadow-2xl max-w-[360px] ml-auto"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/10 blur-[60px] rounded-full pointer-events-none" />

                {servicesPageData?.servicesNavigatorTitle && (
                  <h5 className="text-xs font-heading font-semibold text-brand-white/40 uppercase tracking-[0.2em] mb-8">
                    {servicesPageData.servicesNavigatorTitle}
                  </h5>
                )}

                <ul className="space-y-6">
                  {services.length > 0 ? (
                    services.map((service, index) => {
                      const slug = createSlug(service.title);
                      const isActive = activeServiceId === slug;

                      return (
                        <li key={service.id || index}>
                          <button
                            onClick={() => scrollToService(slug)}
                            className="group flex items-center justify-between w-full focus:outline-none transition-all duration-300 relative p-3 -mx-3 rounded-lg hover:bg-[rgba(255,255,255,0.03)]"
                          >
                            {/* Left Orange Accent Line on Hover */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-brand-primary group-hover:h-full transition-all duration-300 ease-out rounded-full" />

                            <div className="flex items-center gap-6 pl-2">
                              <span className={`text-sm font-heading tracking-widest transition-colors duration-300 ${isActive ? 'text-brand-primary font-bold' : 'text-brand-white/30 group-hover:text-brand-primary/70'}`}>
                                {(index + 1).toString().padStart(2, '0')}
                              </span>
                              <span className={`text-[15px] font-heading text-left transition-colors duration-300 ${isActive ? 'text-brand-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-brand-white/60 group-hover:text-brand-white drop-shadow-[0_0_8px_rgba(255,255,255,0)] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'}`}>
                                {service.title}
                              </span>
                            </div>
                            {/* Animated Active Dot indicator */}
                            <div className="relative flex items-center justify-center w-5 h-5 ml-2">
                              <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isActive ? 'bg-brand-primary shadow-[0_0_8px_rgba(255,106,0,0.8)]' : 'bg-brand-white/10 group-hover:bg-brand-primary/50 group-hover:shadow-[0_0_5px_rgba(255,106,0,0.5)]'}`} />
                              {(isActive || true) && (
                                <motion.div
                                  animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                  className={`absolute inset-0 rounded-full border border-t-transparent transition-colors duration-300 ${isActive ? 'border-brand-primary/40' : 'border-transparent group-hover:border-brand-primary/20'}`}
                                />
                              )}
                            </div>
                          </button>
                        </li>
                      );
                    })
                  ) : (
                    <li><span className="text-brand-white/40 font-heading text-sm">No capabilities assigned</span></li>
                  )}
                </ul>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Dynamic Service Sections */}
      <main className="relative pb-32">
        {services.length === 0 ? (
          <div className="py-32 flex justify-center items-center">
            <p className="text-brand-white/40 font-heading text-xl uppercase tracking-widest">No services available.</p>
          </div>
        ) : (
          <div className="container mx-auto px-6 lg:px-12">
            {services.map((service, index) => {
              const slug = createSlug(service.title);
              const imagePath = service.image || getServiceImage(slug);
              const numberStr = (index + 1).toString().padStart(2, '0');
              const splitTitle = service.title.split(' ');
              const topWord = splitTitle[0] || '';
              const bottomWords = splitTitle.slice(1).join(' ') || '';

              return (
                <motion.div
                  key={service.id || index}
                  id={`service-${slug}`}
                  onViewportEnter={() => setActiveServiceId(slug)}
                  viewport={{ margin: "-50% 0px -50% 0px" }} // Triggers when element is perfectly at center of viewport
                  className="py-24 lg:py-32 relative overflow-visible"
                >
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-center">

                    {/* Left Side: Numbering UI, Faded Background Title, and Larger Floating Image */}
                    <div className="relative w-full aspect-square lg:aspect-[4/3] flex items-center justify-center pl-16 xl:pl-20">

                      {/* Left-edge specific numbering UI - Start exactly at the top */}
                      <div className="absolute left-0 top-0 h-full flex flex-col items-center justify-start z-20 pointer-events-none opacity-90 pt-8 lg:pt-12" style={{ width: '40px' }}>
                        <span className="text-brand-primary font-heading font-bold text-2xl leading-none mb-6">
                          {numberStr}
                        </span>
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: '45%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeInOut" }}
                          className="w-[2px] bg-brand-primary/80 my-2"
                        />
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 1.0, duration: 0.5 }}
                          className="w-3 h-3 rounded-full border-2 border-brand-primary bg-brand-black mt-2"
                        />
                      </div>

                      {/* Image Wrapper */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative z-[1] w-full h-full xl:w-[115%] xl:-ml-4 flex flex-col items-center justify-center overflow-visible"
                      >
                        {/* Top Watermark = 1 */}
                        {topWord && (
                          <div className="absolute top-0 -translate-y-[45%] w-full flex justify-center pointer-events-none z-[1] select-none">
                            <h2
                              className="font-heading font-black uppercase m-0 p-0 text-center"
                              style={{
                                fontSize: 'clamp(80px, 8vw, 140px)',
                                lineHeight: '0.85',
                                letterSpacing: '-4px',
                                opacity: 0.08,
                                color: '#202020',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {topWord}
                            </h2>
                          </div>
                        )}

                        {/* Grid/Glow Base (simulate 3D floating effect underneath the image) */}
                        <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-3/4 aspect-[2/1] rounded-full border border-brand-primary/20 bg-brand-primary/5 blur-[2px] z-[1]" style={{ transform: 'translateX(-50%) perspective(500px) rotateX(75deg)' }}>
                          <div className="absolute inset-4 rounded-full border border-brand-primary/30" />
                          <div className="absolute inset-8 rounded-full border border-brand-primary/40" />
                        </div>

                        {/* Actual Image = 2 */}
                        <img
                          src={imagePath}
                          alt={service.title}
                          className="relative z-[2] w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />

                        {/* Bottom Watermark = 1 */}
                        {bottomWords && (
                          <div className="absolute bottom-[5%] translate-y-[60%] w-full flex justify-center pointer-events-none z-[1] select-none">
                            <h2
                              className="font-heading font-black uppercase m-0 p-0 text-center"
                              style={{
                                fontSize: 'clamp(80px, 8vw, 140px)',
                                lineHeight: '0.85',
                                letterSpacing: '-4px',
                                opacity: 0.08,
                                color: '#202020',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {bottomWords}
                            </h2>
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* Right Side: Dynamic Info Card = 3 */}
                    <div className="relative z-[3]">
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="group relative bg-[#0c0c0e] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 lg:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] hover:-translate-y-1 hover:bg-[#0f0f11] transition-all duration-500 overflow-hidden"
                      >
                        {/* Glow Effect */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/5 blur-[60px] group-hover:bg-brand-primary/15 transition-colors duration-500 rounded-full pointer-events-none" />

                        {/* Tactical Top Accent Line */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-[rgba(255,255,255,0.06)]" />
                        <div className="absolute top-0 left-0 w-0 h-[2px] bg-brand-primary group-hover:w-full transition-all duration-700 ease-out" />

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-primary/30 group-hover:border-brand-primary transition-colors" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-primary/30 group-hover:border-brand-primary transition-colors" />

                        <div className="relative z-10">
                          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4 text-brand-white group-hover:text-brand-primary transition-colors duration-300">
                            {service.title}
                          </h2>

                          {service.subtitle && (
                            <h3 className="text-lg text-brand-white/80 font-heading mb-6">
                              {service.subtitle}
                            </h3>
                          )}

                          <p className="text-brand-white/60 leading-relaxed mb-10 text-[15px] group-hover:text-brand-white/80 transition-colors duration-300">
                            {service.description}
                          </p>

                          {service.features && service.features.length > 0 && (
                            <div className="mb-10 space-y-8 border-t border-[rgba(255,255,255,0.06)] pt-10 group-hover:border-[rgba(255,255,255,0.1)] transition-colors duration-300">
                              {service.features.map((feature, fIndex) => (
                                <div key={fIndex} className="flex items-center gap-6">
                                  <div className="shrink-0 p-2.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
                                    {getFeatureIcon(fIndex)}
                                  </div>
                                  {renderFeatureText(feature)}
                                </div>
                              ))}
                            </div>
                          )}

                          {(service.ctaText || service.ctaLink) && (
                            <div className="mt-8">
                              <a
                                href={service.ctaLink || '/contact'}
                                className="inline-flex items-center gap-3 text-brand-primary font-heading text-[13px] font-bold tracking-widest uppercase hover:text-brand-white transition-colors duration-300 group/btn"
                              >
                                {service.ctaText || 'Explore Service'}
                                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                              </a>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      <FooterSection data={footerData} siteData={siteData} />
    </div>
  );
};

export default ServicesPage;
