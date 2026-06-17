import React, { useEffect, useRef } from 'react';
import { useWebsiteContent } from '../hooks/useWebsiteContent';
import SEOManager from '../components/layout/SEOManager';
import ScrollProgress from '../components/layout/ScrollProgress';
import Header from '../components/layout/Header';
import FooterSection from '../components/layout/FooterSection';
import ContactHeroSection from '../components/contact/ContactHeroSection';
import ContactInfoSection from '../components/contact/ContactInfoSection';
import ContactHeadquartersSection from '../components/contact/ContactHeadquartersSection';
import ContactInquirySection from '../components/contact/ContactInquirySection';
import { RefreshCw } from 'lucide-react';

const ContactPage = () => {
  const { content, error, refreshContent } = useWebsiteContent();
  const inquirySectionRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error) {
    return (
      <div className="w-full min-h-screen bg-[#050505] flex flex-col items-center justify-center text-brand-white p-6">
        <h2 className="text-3xl font-bold mb-4 font-heading text-brand-primary">Connection Lost</h2>
        <p className="text-brand-white/60 mb-8 max-w-md text-center font-body">{error}</p>
        <button 
          onClick={refreshContent}
          className="flex items-center gap-2 px-6 py-3 border border-brand-primary/30 hover:border-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 transition-all duration-300 rounded-sm font-heading uppercase tracking-widest text-sm text-brand-primary"
        >
          <RefreshCw size={18} />
          Retry Connection
        </button>
      </div>
    );
  }

  if (!content) return null;

  const { seoData, siteData, contactData, footerData } = content;

  const contactSeoData = {
    ...seoData,
    title: `Contact Us | ${siteData?.siteName || 'Dynasas'}`,
    description: "Get in touch with our experts for mission-critical technology solutions, command & control systems, and defense technology."
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050505] text-brand-white font-body">
      <SEOManager seoData={contactSeoData} />
      <ScrollProgress primaryColor="var(--color-brand-primary)" />
      
      <Header siteData={siteData} />
      
      <main className="pt-[100px] md:pt-[120px]">
        <ContactHeroSection data={contactData} inquiryRef={inquirySectionRef} />
        <ContactInfoSection data={contactData} />
        <ContactHeadquartersSection data={contactData} />
        <ContactInquirySection data={contactData} forwardRef={inquirySectionRef} />
      </main>

      <FooterSection data={footerData} siteData={siteData} />
    </div>
  );
};

export default ContactPage;
