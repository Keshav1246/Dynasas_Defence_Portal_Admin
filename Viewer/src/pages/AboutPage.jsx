import React, { useEffect } from 'react';
import { useWebsiteContent } from '../hooks/useWebsiteContent';
import SEOManager from '../components/layout/SEOManager';
import ScrollProgress from '../components/layout/ScrollProgress';
import Header from '../components/layout/Header';
import FooterSection from '../components/layout/FooterSection';
import AboutHeroSection from '../components/about/AboutHeroSection';
import CompanySnapshotSection from '../components/about/CompanySnapshotSection';
import CompanyJourneySection from '../components/about/CompanyJourneySection';
import GlobalImpactSection from '../components/about/GlobalImpactSection';
import { RefreshCw } from 'lucide-react';
import { ABOUT_PAGE_DEFAULTS } from '../data/aboutPageDefaults';

const AboutPage = () => {
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

  const { seoData, siteData, aboutData, footerData } = content;

  // Custom SEO for About page
  const aboutSeoData = {
    ...seoData,
    title: `About Us | ${siteData?.siteName || 'Dynasas'}`,
    description: ABOUT_PAGE_DEFAULTS.snapshotDescription
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-black text-brand-white font-body">
      <SEOManager seoData={aboutSeoData} />
      <ScrollProgress primaryColor="var(--color-brand-primary)" />
      
      <Header siteData={siteData} />
      
      <main>
        {/* Phase 1 Sections */}
        <AboutHeroSection data={aboutData} />
        <CompanySnapshotSection data={aboutData} />
        
        {/* Phase 2 Sections */}
        <CompanyJourneySection />
        <GlobalImpactSection />
        
        {/* Future sections (Mission, Vision, Leadership, etc) will go here */}
      </main>

      <FooterSection data={footerData} siteData={siteData} />
    </div>
  );
};

export default AboutPage;
