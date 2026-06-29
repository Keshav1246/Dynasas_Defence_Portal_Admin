import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { ABOUT_PAGE_DEFAULTS } from '../../data/aboutPageDefaults';
import ScrollIndicator from '../layout/ScrollIndicator';

const AboutHeroSection = ({ data }) => {
  const defaults = data?.hero || {};
  const overview = data?.overview || data?.companyOverview;
  const foundedYear = data?.details?.foundedYear;
  const headquarters = data?.details?.headquarters;

  const yearsOfLegacy = data?.details?.yearsOfLegacy;
  
  const sectionLabel = defaults.sectionLabel;
  const sectionTitle = defaults.sectionTitle;
  const bgImage = defaults.bgImage;
  const heroOverview = overview || defaults.overview;
  const primaryCTA = defaults.primaryCTA || { text: 'Our Mission', link: '#mission' };
  const secondaryCTA = defaults.secondaryCTA || { text: 'Contact Us', link: '/contact' };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-black pt-24 pb-24 lg:pt-28 lg:pb-32 mt-8">
      
      {/* Background Subtle Dot Grid to match screenshot */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 relative z-10 max-w-[1300px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* LEFT CONTENT (50%) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full flex flex-col justify-center"
          >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-8 bg-brand-primary"></div>
            <span className="text-sm text-brand-primary tracking-widest font-heading uppercase font-bold">
            {sectionLabel}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-brand-white leading-[1.1] mb-6 tracking-tight" dangerouslySetInnerHTML={{ __html: (sectionTitle || '').replace('Defense Technology', '<br class="hidden md:block" /><span class="text-brand-primary">Defense Technology</span>') }}>
          </h1>

          <p className="text-base md:text-lg text-brand-white/70 font-body leading-relaxed mb-10 max-w-xl">
            {heroOverview}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link to={primaryCTA.link} className="inline-flex items-center justify-center gap-3 bg-brand-primary text-brand-black px-8 py-4 font-heading font-bold uppercase tracking-widest text-sm hover:bg-brand-white hover:text-brand-black transition-colors duration-300">
              {primaryCTA.text}
              <ArrowRight size={18} />
            </Link>
            <Link to={secondaryCTA.link} className="inline-flex items-center justify-center gap-3 border border-brand-white/15 text-brand-white px-8 py-4 font-heading font-bold uppercase tracking-widest text-sm hover:bg-brand-white/5 transition-colors duration-300">
              {secondaryCTA.text}
            </Link>
          </div>

          {/* Compact Inline Info Cards */}
          <div className="flex flex-wrap items-center gap-8 lg:gap-12 pt-8 border-t border-brand-white/10">
            <div className="flex items-center gap-4 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-brand-primary/30 bg-brand-primary/5 text-brand-primary group-hover:bg-brand-primary/20 transition-colors">
                <Calendar size={18} />
              </div>
              <div>
                <h4 className="text-brand-white/50 text-[10px] font-heading tracking-widest uppercase mb-0.5">Founded</h4>
                <p className="text-brand-white font-mono font-bold text-lg">{foundedYear}</p>
              </div>
            </div>
            
            <div className="hidden sm:block h-8 w-px bg-brand-white/10"></div>

            <div className="flex items-center gap-4 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-brand-primary/30 bg-brand-primary/5 text-brand-primary group-hover:bg-brand-primary/20 transition-colors">
                <MapPin size={18} />
              </div>
              <div>
                <h4 className="text-brand-white/50 text-[10px] font-heading tracking-widest uppercase mb-0.5">Headquarters</h4>
                <p className="text-brand-white font-mono font-bold text-lg">{[data?.details?.city, data?.details?.state].filter(Boolean).join(', ') || headquarters}</p>
              </div>
            </div>
          </div>
          </motion.div>

          {/* RIGHT VISUAL (50%) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full flex justify-center items-center relative mt-12 lg:mt-0 lg:-translate-y-8 xl:-translate-y-12"
          >
            <img 
              src={bgImage} 
              alt="Headquarters Architecture" 
              className="relative z-10 w-full h-auto max-h-[850px] object-contain scale-100 lg:scale-[1.05] xl:scale-[1.1] origin-center" 
            />
          </motion.div>

        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
};

export default AboutHeroSection;
