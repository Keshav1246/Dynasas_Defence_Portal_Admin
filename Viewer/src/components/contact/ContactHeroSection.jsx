import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Lock, Globe2 } from 'lucide-react';
import { CONTACT_PAGE_DEFAULTS } from '../../data/contactPageDefaults';

const ContactHeroSection = ({ data, inquiryRef }) => {
  const defaults = CONTACT_PAGE_DEFAULTS.hero;
  
  // Use CMS data if available, fallback to defaults
  const addressQuery = encodeURIComponent(data?.headquarters || CONTACT_PAGE_DEFAULTS.info.headquarters);
  const mapsUrl = `${defaults.headquartersUrl}${addressQuery}`;

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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#050505]">
      
      {/* Extremely Faint Background Grid */}
      <div className="absolute inset-0 opacity-100 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      {/* Cinematic Right-Side Visual Composition */}
      <div className="absolute top-0 right-0 w-full lg:w-[60%] h-full z-0">
        <div className="w-full h-full relative">
          
          {/* Main Defense Image Placeholder */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
               style={{ backgroundImage: `url('${defaults.image}')`, filter: 'contrast(1.2) brightness(0.8)' }}>
          </div>
          
          {/* Dark Blue-Black Tactical Overlay */}
          <div className="absolute inset-0 bg-[#050505]/70 mix-blend-multiply"></div>
          
          {/* Left-to-Right Fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent"></div>
          
          {/* Orange Network Glow Focus Point */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>
          
          {/* Tactical Connection Lines Overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(rgba(255, 106, 0, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 106, 0, 0.15) 1px, transparent 1px)', backgroundSize: '150px 150px' }}>
          </div>

          {/* Floating HUD Panel 1: SECURE NETWORK */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute bottom-32 left-12 lg:left-24 bg-[#050505]/80 border border-brand-primary/30 p-5 shadow-[0_0_20px_rgba(255,106,0,0.1)] backdrop-blur-md z-30 hidden md:block"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-brand-primary/10 border border-brand-primary/30">
                <Lock size={18} className="text-brand-primary" />
              </div>
              <div>
                <h4 className="text-[10px] font-heading text-brand-primary tracking-widest uppercase mb-1">Secure Network</h4>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-mono text-brand-white/80">Encrypted AES-256</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating HUD Panel 2: GLOBAL CONNECTIVITY */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute top-32 right-12 lg:right-24 bg-[#050505]/80 border border-brand-primary/30 p-5 shadow-[0_0_20px_rgba(255,106,0,0.1)] backdrop-blur-md z-30 hidden md:block"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-brand-primary/10 border border-brand-primary/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-primary/20 animate-pulse"></div>
                <Globe2 size={18} className="text-brand-primary relative z-10" />
              </div>
              <div>
                <h4 className="text-[10px] font-heading text-brand-primary tracking-widest uppercase mb-1">Global Connectivity</h4>
                <div className="flex items-end gap-2">
                  <span className="text-xs font-mono text-brand-white/50">Active Nodes:</span>
                  <span className="text-lg font-mono font-bold text-brand-white leading-none">124</span>
                </div>
              </div>
            </div>
            {/* HUD Audio/Signal wave visualization mock */}
            <div className="flex items-end gap-1 h-4 mt-4 opacity-50">
              {[2,4,3,5,2,6,3,7,4,5,3,2,4].map((h, i) => (
                <div key={i} className="w-1 bg-brand-primary" style={{ height: `${h*20}%` }}></div>
              ))}
            </div>
          </motion.div>
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
            {defaults.heading} <br/>
            <span className="text-brand-primary">{defaults.headingHighlight}</span> <br/>
            {defaults.headingEnd}
          </h1>

          {/* Body Text */}
          <p className="text-xl text-brand-white/70 font-body leading-relaxed mb-12 max-w-lg">
            {defaults.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleScrollToInquiry}
              className="inline-flex items-center justify-center gap-3 bg-brand-primary text-[#050505] px-8 py-4 font-heading font-bold uppercase tracking-widest text-sm hover:bg-brand-primary/90 hover:shadow-[0_0_15px_rgba(255,106,0,0.4)] transition-all duration-300 cursor-pointer"
            >
              Contact Experts
              <ArrowRight size={18} />
            </button>
            
            {/* Functional Google Maps Link */}
            <button 
              onClick={handleMapsClick}
              className="inline-flex items-center justify-center gap-3 border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.02)] text-brand-white px-8 py-4 font-heading font-bold uppercase tracking-widest text-sm hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.3)] transition-all duration-300"
            >
              <MapPin size={18} className="text-brand-primary" />
              View Headquarters
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHeroSection;
