import React from 'react';
import { useWebsiteContent } from '../hooks/useWebsiteContent';
import SEOManager from '../components/layout/SEOManager';
import ScrollProgress from '../components/layout/ScrollProgress';
import Header from '../components/layout/Header';
import HeroSection from '../components/homepage/HeroSection';
import TrustBar from '../components/homepage/TrustBar';
import ServicesSection from '../components/homepage/ServicesSection';
import AboutSection from '../components/homepage/AboutSection';
import MissionVisionSection from '../components/homepage/MissionVisionSection';
import StatisticsSection from '../components/homepage/StatisticsSection';
import PartnersSection from '../components/homepage/PartnersSection';
import FooterSection from '../components/layout/FooterSection';
import { RefreshCw } from 'lucide-react';

const HomePage = () => {
  const { content, error, refreshContent } = useWebsiteContent();

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

  const {
    seoData,
    siteData,
    heroData,
    servicesData,
    aboutData,
    statisticsData,
    partnersData,
    footerData,
  } = content;

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-black text-brand-white font-body">
      <SEOManager seoData={seoData} />
      <ScrollProgress primaryColor="var(--color-brand-primary)" />

      <Header siteData={siteData} />

      <main>
        {/* Enforced Order per Blueprint */}
        <HeroSection data={heroData} />
        <TrustBar data={heroData?.trustBarItems || []} />

        {/* Top Spacer for Services Section */}
        <div className="h-24 md:h-24 w-full bg-brand-black relative z-10"></div>

        <ServicesSection data={servicesData} />

        {/* Bottom Spacer for Services Section */}
        <div className="h-24 md:h-24 w-full bg-brand-black relative z-10"></div>

        <AboutSection data={aboutData} />
        <MissionVisionSection data={aboutData} />
        
        {/* Partners Section mapping from CMS */}
        <PartnersSection data={partnersData} />
      </main>

      <FooterSection data={footerData} siteData={siteData} />
    </div>
  );
};

export default HomePage;
