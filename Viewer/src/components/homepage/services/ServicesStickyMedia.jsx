import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getServiceImage } from '../../../utils/serviceAssetResolver';

const ServicesStickyMedia = ({ activeService }) => {
  if (!activeService) return null;

  const imageUrl = getServiceImage(activeService);

  return (
    <div className="relative w-full bg-brand-black">
      {/* Fallback tactical gradient in case images fail to load */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-brand-black opacity-50" />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeService.id}
          initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative w-full"
        >
          <img
            src={imageUrl}
            alt={activeService.imageAlt || activeService.title}
            className="w-full h-auto object-contain object-center opacity-60"
            onError={(e) => {
              // Basic fallback if the image fails to load
              e.target.style.display = 'none';
            }}
          />
          {/* Tactical HUD Overlay Elements */}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(10,10,10,0.9)] z-10 pointer-events-none" />
          <div className="absolute top-4 left-4 border-t border-l border-brand-primary/50 w-8 h-8 z-10" />
          <div className="absolute bottom-4 right-4 border-b border-r border-brand-primary/50 w-8 h-8 z-10" />

        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ServicesStickyMedia;
