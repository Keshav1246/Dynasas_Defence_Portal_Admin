import React from 'react';
import { motion } from 'framer-motion';

const ServicesPage = () => {
  return (
    <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center relative z-10 text-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-bold font-heading text-brand-white mb-6"
      >
        Capabilities
      </motion.h1>
      <p className="text-xl text-brand-white/60 font-body max-w-2xl">
        Our full capabilities matrix is currently being updated. Please refer to the homepage for core system overviews.
      </p>
    </div>
  );
};

export default ServicesPage;
