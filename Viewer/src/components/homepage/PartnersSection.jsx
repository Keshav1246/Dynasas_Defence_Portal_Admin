import React from 'react';
import { motion } from 'framer-motion';

const PartnersSection = ({ data }) => {
  if (!data?.items?.length) return null;

  return (
    <section className="py-32 w-full relative z-10 border-t border-brand-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-brand-primary/50"></div>
            <span className="text-label text-brand-primary">
              {data.sectionLabel}
            </span>
            <div className="h-[1px] w-8 bg-brand-primary/50"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-white font-heading">
            {data.sectionTitle}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center">
          {data.items.map((partner, idx) => (
            <motion.a
              key={partner.id}
              href={partner.website || '#'}
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
      </div>
    </section>
  );
};

export default PartnersSection;
