import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollIndicator = ({ className }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-50 pointer-events-none ${className || 'bottom-8'}`}
        >
          <div className="w-[22px] h-[36px] rounded-full border border-brand-white/40 flex justify-center p-1">
            <motion.div
              animate={{ 
                y: [0, 14, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-[2px] h-[6px] rounded-full bg-brand-white"
            />
          </div>
          <motion.span 
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-[9px] uppercase tracking-[0.3em] mt-3 font-heading font-semibold text-brand-white/60"
          >
            Scroll
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollIndicator;
