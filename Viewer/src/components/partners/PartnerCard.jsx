import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const PartnerCard = ({ partner, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
      className="group relative bg-[#0c0c0e] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col h-full hover:bg-[#0f0f11]"
    >
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-[50px] group-hover:bg-brand-primary/15 transition-colors duration-500 rounded-full pointer-events-none" />

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-0 h-[2px] bg-brand-primary group-hover:w-full transition-all duration-700 ease-out" />
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-primary/30 group-hover:border-brand-primary transition-colors" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-primary/30 group-hover:border-brand-primary transition-colors" />

      {/* Logo Container */}
      <div className="h-20 mb-8 flex items-center justify-start border-b border-brand-white/10 pb-6 group-hover:border-brand-white/20 transition-colors">
        {partner.logo && partner.logo !== '/assets/placeholder-logo.svg' ? (
          <img 
            src={partner.logo} 
            alt={partner.name} 
            className="max-h-full max-w-[70%] object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 invert"
          />
        ) : (
          <span className="text-xl font-bold font-heading text-brand-white/80 group-hover:text-brand-primary transition-colors">
            {partner.name}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col relative z-10">
        <h3 className="text-2xl font-bold font-heading text-brand-white mb-4 group-hover:text-brand-primary transition-colors duration-300">
          {partner.name}
        </h3>
        
        {partner.description && (
          <p className="text-brand-white/60 leading-relaxed text-sm mb-8 group-hover:text-brand-white/80 transition-colors">
            {partner.description}
          </p>
        )}

        {/* Website Link (Pushed to bottom) */}
        <div className="mt-auto pt-4">
          {partner.website ? (
            <a 
              href={partner.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold font-heading uppercase tracking-widest text-brand-primary/80 hover:text-brand-primary transition-colors group/link"
            >
              Visit Website
              <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          ) : (
            <span className="text-xs font-bold font-heading uppercase tracking-widest text-brand-white/20">
              Active Partner
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PartnerCard;
