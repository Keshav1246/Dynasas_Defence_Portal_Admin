import React from 'react';
import { motion } from 'framer-motion';

const PartnersSection = ({ data }) => {
  if (!data?.items?.length) return null;

  return (
    <section className="py-32 w-full relative z-10 border-t border-brand-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* LEFT SIDE: Partner logos grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {data.items.map((partner, idx) => (
              <motion.a
                key={partner.id}
                href={partner.website}
                target={partner.website ? "_blank" : undefined}
                rel={partner.website ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`flex items-center justify-center p-6 h-32 border border-brand-border hover:shadow-[0_0_15px_rgba(255,106,0,0.2)] hover:border-brand-primary transition-all duration-300 group bg-brand-dark/30 backdrop-blur-sm ${partner.website ? 'cursor-pointer' : 'cursor-default'}`}
              >
                {partner.logo ? (
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-full max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 invert"
                  />
                ) : (
                  <span className="font-bold text-brand-white/50 group-hover:text-brand-primary transition-colors text-center text-sm font-heading">
                    {partner.name}
                  </span>
                )}
              </motion.a>
            ))}
          </div>

          {/* RIGHT SIDE: Text content and CTA */}
          <div className="flex flex-col items-start text-left lg:pl-10">
            {data.sectionLabel && (
              <div className="flex items-center gap-4 mb-4">
                <span className="text-label text-brand-primary tracking-widest uppercase">
                  {data.sectionLabel}
                </span>
                <div className="h-[1px] w-8 bg-brand-primary/50"></div>
              </div>
            )}
            
            <h2 className="text-4xl md:text-5xl font-bold text-brand-white font-heading mb-6">
              {data.sectionTitle}
            </h2>
            
            {data.sectionDescription && (
              <p className="text-lg text-brand-white/70 mb-10 leading-relaxed max-w-xl">
                {data.sectionDescription}
              </p>
            )}

            {data.ctaText && (
              <a 
                href={data.ctaLink} 
                className="inline-flex items-center gap-3 px-8 py-4 border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-dark transition-all duration-300 font-bold tracking-wide uppercase text-sm group"
              >
                {data.ctaText}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </a>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
