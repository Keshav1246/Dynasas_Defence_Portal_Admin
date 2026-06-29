import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWebsiteContent } from '../hooks/useWebsiteContent';
import SEOManager from '../components/layout/SEOManager';
import ScrollProgress from '../components/layout/ScrollProgress';
import Header from '../components/layout/Header';
import FooterSection from '../components/layout/FooterSection';
import { ArrowRight, Target, Shield, Radar, Camera, Cpu } from 'lucide-react';
import { DEFAULT_SOLUTIONS } from '../defaults/solutions';
import TacticalMap from '../components/solutions/TacticalMap';
import ScrollIndicator from '../components/layout/ScrollIndicator';

// Import local assets
import solutionsHeroImage from '../../src/assets/solutions/solutions-hero.png';
import cniProtectionImg from '../../src/assets/solutions/cni-protection.png';
import borderProtectionImg from '../../src/assets/solutions/border-protection.png';
import oilGasImg from '../../src/assets/solutions/oil&gas.jpg';
import eriManagementImg from '../../src/assets/solutions/eri-management.jpg';

const SOLUTION_IMAGES = {
  'cni-protection': cniProtectionImg,
  'border-protection': borderProtectionImg,
  'oil-gas-protection': oilGasImg,
  'eri-management': eriManagementImg,
};

// Rotates through multiple icons so they do not repeat consecutively
const FEATURE_ICONS = [Radar, Camera, Cpu, Shield, Target];
const getFeatureIcon = (index) => {
  const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
  return <Icon className="w-6 h-6 text-brand-primary" />;
};

const SolutionsPage = () => {
  const { content } = useWebsiteContent();
  const location = useLocation();
  const [activeSolutionId, setActiveSolutionId] = useState('');

  useEffect(() => {
    // Handle URL parameters or Hash for scrolling to a specific solution initially
    const searchParams = new URLSearchParams(location.search);
    const solutionParam = location.hash ? location.hash.replace('#', '') : searchParams.get('solution');

    if (solutionParam) {
      setTimeout(() => {
        const element = document.getElementById(`solution-${solutionParam}`);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });

          // Temporary subtle highlight to indicate which section was deep-linked
          element.classList.add('bg-brand-primary/10', 'rounded-2xl', 'transition-colors', 'duration-1000', 'shadow-[0_0_30px_rgba(255,106,0,0.2)]');
          setTimeout(() => {
            element.classList.remove('bg-brand-primary/10', 'shadow-[0_0_30px_rgba(255,106,0,0.2)]');
          }, 3000);
        }
      }, 500);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  if (!content) return null;

  const { seoData, siteData, footerData } = content;

  const pageSeoData = {
    ...seoData,
    title: `Solutions | ${siteData?.siteName || 'Dynasas'}`,
    description: DEFAULT_SOLUTIONS.hero.description
  };

  const solutions = DEFAULT_SOLUTIONS.items || [];

  const scrollToSolution = (id) => {
    const element = document.getElementById(`solution-${id}`);
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
      <section className="relative min-h-[75vh] flex items-center pt-40 pb-24 lg:pb-32">


        <div className="container mx-auto px-6 lg:pl-24 lg:pr-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

            {/* Left Hero Content */}
            <div className="lg:col-span-5 relative z-20">
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
                    {DEFAULT_SOLUTIONS.hero.label}
                  </h4>
                </div>

                <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-8 leading-[1.1] text-brand-white tracking-tight drop-shadow-md">
                  {renderHeroTitle(DEFAULT_SOLUTIONS.hero.title)}
                </h1>

                <div className="w-16 h-1 bg-brand-primary mb-8" />

                <p className="text-brand-white/90 text-lg lg:text-xl leading-relaxed max-w-2xl font-body drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  {DEFAULT_SOLUTIONS.hero.description}
                </p>
              </motion.div>
            </div>

            {/* Solutions Navigator Card has been removed to open up the layout */}

            {/* Right Hero Content (Image) */}
            <div className="lg:col-span-7 relative z-0 flex justify-end">
              <TacticalMap />
            </div>

          </div>
        </div>
        <ScrollIndicator className="bottom-4 lg:bottom-12" />
      </section>

      {/* 3. Dynamic Solution Sections */}
      <main className="relative pb-32">
        {solutions.length === 0 ? (
          <div className="py-32 flex justify-center items-center">
            <p className="text-brand-white/40 font-heading text-xl uppercase tracking-widest">No solutions available.</p>
          </div>
        ) : (
          <div className="container mx-auto px-6 lg:px-12">
            {solutions.map((solution, index) => {
              const splitTitle = solution.title.split(' ');
              const topWord = splitTitle[0] || '';
              const bottomWords = splitTitle.slice(1).join(' ') || '';

              return (
                <motion.div
                  key={solution.id || index}
                  id={`solution-${solution.id}`}
                  onViewportEnter={() => setActiveSolutionId(solution.id)}
                  viewport={{ margin: "-50% 0px -50% 0px" }} // Triggers when element is perfectly at center of viewport
                  className="py-24 lg:py-32 relative overflow-visible"
                >
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-center">

                    {/* Left Side: Numbering UI, Faded Background Title, and Larger Floating Image */}
                    <div className="relative w-full aspect-square lg:aspect-[4/3] flex items-center justify-center pl-16 xl:pl-20">

                      {/* Left-edge specific numbering UI - Start exactly at the top */}
                      <div className="absolute left-0 top-0 h-full flex flex-col items-center justify-start z-20 pointer-events-none opacity-90 pt-8 lg:pt-12" style={{ width: '40px' }}>
                        <span className="text-brand-primary font-heading font-bold text-2xl leading-none mb-6">
                          {(index + 1).toString().padStart(2, '0')}
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


                        {/* Grid/Glow Base (simulate 3D floating effect underneath the image) */}
                        <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-3/4 aspect-[2/1] rounded-full border border-brand-primary/20 bg-brand-primary/5 blur-[2px] z-[1]" style={{ transform: 'translateX(-50%) perspective(500px) rotateX(75deg)' }}>
                          <div className="absolute inset-4 rounded-full border border-brand-primary/30" />
                          <div className="absolute inset-8 rounded-full border border-brand-primary/40" />
                        </div>

                        {/* Actual Image = 2 */}
                        <img
                          src={SOLUTION_IMAGES[solution.id] || solution.image}
                          alt={solution.title}
                          className="relative z-[2] w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />


                      </motion.div>
                    </div>

                    {/* Right Side: Dynamic Info Card = 3 */}
                    <div className="relative z-[3]">
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="group relative bg-brand-dark border border-brand-border rounded-2xl p-8 lg:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] hover:-translate-y-1 hover:bg-brand-dark-secondary transition-all duration-500 overflow-hidden"
                      >
                        {/* Glow Effect */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/5 blur-[60px] group-hover:bg-brand-primary/15 transition-colors duration-500 rounded-full pointer-events-none" />

                        {/* Tactical Top Accent Line */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-brand-border" />
                        <div className="absolute top-0 left-0 w-0 h-[2px] bg-brand-primary group-hover:w-full transition-all duration-700 ease-out" />

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-primary/30 group-hover:border-brand-primary transition-colors" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-primary/30 group-hover:border-brand-primary transition-colors" />

                        <div className="relative z-10">
                          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4 text-brand-white group-hover:text-brand-primary transition-colors duration-300">
                            {solution.title}
                          </h2>

                          <p className="text-brand-light-gray leading-relaxed mb-10 text-[15px] group-hover:text-brand-light-gray/80 transition-colors duration-300">
                            {solution.description}
                          </p>

                          {solution.features && solution.features.length > 0 && (
                            <div className="mb-10 space-y-8 border-t border-brand-border pt-10 group-hover:border-brand-border transition-colors duration-300">
                              {solution.features.map((feature, fIndex) => (
                                <div key={fIndex} className="flex items-center gap-6">
                                  <div className="shrink-0 p-2.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
                                    {getFeatureIcon(fIndex)}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-heading font-bold text-brand-white text-base mb-1">{feature.title}</span>
                                    <span className="text-brand-light-gray text-sm leading-relaxed">{feature.description}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {(solution.ctaText || solution.ctaLink) && (
                            <div className="mt-8">
                              <a
                                href={solution.ctaLink || '/contact'}
                                className="inline-flex items-center gap-3 text-brand-primary font-heading text-[13px] font-bold tracking-widest uppercase hover:text-brand-white transition-colors duration-300 group/btn"
                              >
                                {solution.ctaText || 'Explore Solution'}
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

export default SolutionsPage;
