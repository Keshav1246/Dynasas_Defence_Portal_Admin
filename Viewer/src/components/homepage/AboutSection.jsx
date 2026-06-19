import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = ({ data }) => {
  if (!data) return null;

  const getCityOnly = (address) => {
    if (!address) return '';
    if (address.toLowerCase().includes('gurgaon') || address.toLowerCase().includes('gurugram')) return 'Gurgaon';
    if (address.toLowerCase().includes('delhi')) return 'New Delhi';
    const parts = address.split(',').map(p => p.trim());
    return parts[0];
  };

  return (
    <section className="pt-32 pb-8 w-full text-brand-white relative z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col items-center text-center gap-6">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center gap-4"
          >
            <div className="h-[1px] w-8 bg-brand-primary/50"></div>
            <span className="text-label text-brand-primary">
              {data.sectionLabel || "ABOUT DYNASAS"}
            </span>
            <div className="h-[1px] w-8 bg-brand-primary/50"></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-heading max-w-4xl"
          >
            {data.sectionTitle}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-brand-white/70 leading-relaxed font-body max-w-3xl mt-4"
          >
            {data.companyOverview}
          </motion.p>

          {/* Company Details Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-12 pt-8"
          >
            <div>
              <h4 className="text-label text-brand-white/40 mb-2">Founded</h4>
              <p className="text-2xl font-bold font-heading">{data.foundedYear}</p>
            </div>
            <div>
              <h4 className="text-label text-brand-white/40 mb-2">Headquarters</h4>
              <p className="text-2xl font-bold font-heading">{getCityOnly(data.headquarters)}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
