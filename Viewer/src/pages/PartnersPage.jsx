import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWebsiteContent } from '../hooks/useWebsiteContent';
import SEOManager from '../components/layout/SEOManager';
import ScrollProgress from '../components/layout/ScrollProgress';
import Header from '../components/layout/Header';
import FooterSection from '../components/layout/FooterSection';
import { RefreshCw } from 'lucide-react';
import PartnerCard from '../components/partners/PartnerCard';

const PartnersPage = () => {
  const { content, error, refreshContent } = useWebsiteContent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const { seoData, siteData, partnersPageData, footerData } = content;

  const pageSeoData = {
    ...seoData,
    title: `Partners | ${siteData?.siteName || 'Dynasas'}`,
    description: partnersPageData?.hero?.sectionDescription || 'Our strategic defense partners.'
  };

  const partners = partnersPageData?.items || [];

  return (
    <div className="min-h-screen bg-brand-black text-brand-white font-body selection:bg-brand-primary/30 selection:text-brand-white overflow-x-hidden">
      <SEOManager seoData={pageSeoData} />
      <ScrollProgress primaryColor="var(--color-brand-primary)" />
      <Header siteData={siteData} />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center pt-48 pb-16 overflow-hidden bg-brand-black">
        {/* Subtle Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-5%] w-1/2 h-full bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-5%] w-1/3 h-2/3 bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-brand-primary/50"></div>
              <h4 className="text-brand-primary font-heading tracking-[0.2em] text-sm font-bold uppercase">
                {partnersPageData?.hero?.sectionLabel || "OUR NETWORK"}
              </h4>
              <div className="h-[1px] w-8 bg-brand-primary/50"></div>
            </div>

            <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-8 leading-[1.1] text-brand-white tracking-tight">
              {partnersPageData?.hero?.sectionTitle || "Strategic Defense Partners"}
            </h1>

            <div className="w-16 h-1 bg-brand-primary mb-8" />

            <p className="text-brand-white/70 text-lg lg:text-xl leading-relaxed max-w-2xl font-body">
              {partnersPageData?.hero?.sectionDescription || "Collaborating with industry leaders to deliver mission-critical superiority."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partners Grid Section */}
      <main className="relative pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          {partners.length === 0 ? (
            <div className="py-24 text-center border border-brand-white/10 rounded-2xl bg-brand-white/[0.02]">
              <p className="text-brand-white/40 font-heading text-lg uppercase tracking-widest">
                Partner network expanding. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {partners.map((partner, index) => (
                <PartnerCard 
                  key={partner.id} 
                  partner={partner} 
                  index={index} 
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <FooterSection data={footerData} siteData={siteData} />
    </div>
  );
};

export default PartnersPage;
