import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { ABOUT_PAGE_DEFAULTS } from '../../data/aboutPageDefaults';

const AboutHeroSection = ({ data }) => {
  const defaults = data?.hero || {};
  const overview = data?.overview || data?.companyOverview;
  const foundedYear = data?.details?.foundedYear;
  const headquarters = data?.details?.headquarters;

  const getCityOnly = (address) => {
    if (!address) return '';
    const parts = address.split(',').map(p => p.trim());
    return parts[0];
  };
  
  const sectionLabel = defaults.sectionLabel;
  const sectionTitle = defaults.sectionTitle;
  const bgImage = defaults.bgImage;
  const heroOverview = overview || defaults.overview;
  const primaryCTA = defaults.primaryCTA || { text: 'Our Mission', link: '#mission' };
  const secondaryCTA = defaults.secondaryCTA || { text: 'Contact Us', link: '/contact' };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#050505]">
      
      {/* Background Subtle Grid - Extremely faint as requested */}
      <div className="absolute inset-0 opacity-100 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      {/* Cinematic Right-Side Image Composition */}
      <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full z-0">
        <div className="w-full h-full relative">
          {/* Main Image */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgImage})` }}></div>
          
          {/* Dark Blue-Black Overlay for Tactical Aesthetic */}
          <div className="absolute inset-0 bg-[#050505]/70 mix-blend-multiply"></div>
          
          {/* Left-to-Right Fade to blend smoothly into the black background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent"></div>
          
          {/* Orange Network Glow */}
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-primary/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
          
          {/* Subtle Tactical HUD Elements / Connection Lines overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(rgba(255, 106, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 106, 0, 0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
          </div>


        </div>
      </div>

      {/* Main Content Area (Overlaying left side) */}
      <div className="container mx-auto px-6 relative z-10 py-32 mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-8 bg-brand-primary"></div>
            <span className="text-sm text-brand-primary tracking-widest font-heading uppercase font-bold">
            {sectionLabel}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-brand-white leading-[1.1] mb-8" dangerouslySetInnerHTML={{ __html: (sectionTitle || '').replace('Defense Technology', '<br class="hidden md:block" /><span class="text-brand-primary">Defense Technology</span>') }}>
          </h1>

          <p className="text-xl text-brand-white/70 font-body leading-relaxed mb-12 max-w-xl">
            {heroOverview}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link to={primaryCTA.link} className="inline-flex items-center justify-center gap-3 bg-brand-primary text-[#050505] px-8 py-4 font-heading font-bold uppercase tracking-widest text-sm hover:bg-brand-white hover:text-[#050505] transition-colors duration-300">
              {primaryCTA.text}
              <ArrowRight size={18} />
            </Link>
            <Link to={secondaryCTA.link} className="inline-flex items-center justify-center gap-3 border border-[rgba(255,255,255,0.15)] text-brand-white px-8 py-4 font-heading font-bold uppercase tracking-widest text-sm hover:bg-brand-white/5 transition-colors duration-300">
              {secondaryCTA.text}
            </Link>
          </div>

          {/* Compact Inline Info Cards */}
          <div className="flex flex-wrap items-center gap-8 lg:gap-12 pt-8 border-t border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-4 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-brand-primary/30 bg-brand-primary/5 text-brand-primary group-hover:bg-brand-primary/20 transition-colors">
                <Calendar size={18} />
              </div>
              <div>
                <h4 className="text-brand-white/40 text-[10px] font-heading tracking-widest uppercase mb-0.5">Founded</h4>
                <p className="text-brand-white font-mono font-bold text-lg">{foundedYear}</p>
              </div>
            </div>
            
            <div className="hidden sm:block h-8 w-px bg-[rgba(255,255,255,0.06)]"></div>

            <div className="flex items-center gap-4 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-brand-primary/30 bg-brand-primary/5 text-brand-primary group-hover:bg-brand-primary/20 transition-colors">
                <MapPin size={18} />
              </div>
              <div>
                <h4 className="text-brand-white/40 text-[10px] font-heading tracking-widest uppercase mb-0.5">Headquarters</h4>
                <p className="text-brand-white font-mono font-bold text-lg">{getCityOnly(headquarters)}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
