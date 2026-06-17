import React from 'react';
import { motion } from 'framer-motion';

const ServicesProgressRail = ({ total, activeIndex }) => {
  return (
    <div className="hidden lg:flex flex-col gap-4 relative w-full pr-4">
      {Array.from({ length: total }).map((_, idx) => {
        const isActive = idx === activeIndex;
        return (
          <div key={idx} className="flex items-center gap-4 group">
            {/* Number */}
            <div className={`transition-all duration-500 font-mono text-sm w-6 text-right ${isActive ? 'text-brand-primary font-bold' : 'text-brand-white/30'}`}>
              {String(idx + 1).padStart(2, '0')}
            </div>
            {/* Tactical Bar */}
            <div className="flex-1 h-[2px] bg-brand-white/10 relative overflow-hidden">
              <motion.div 
                initial={false}
                animate={{ 
                  width: isActive ? '100%' : (idx < activeIndex ? '100%' : '20%'),
                  backgroundColor: isActive ? '#FF6A00' : (idx < activeIndex ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)')
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute top-0 left-0 bottom-0"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServicesProgressRail;
