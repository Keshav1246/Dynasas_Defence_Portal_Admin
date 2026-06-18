import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getServiceImage } from '../../../utils/serviceAssetResolver';

const ServiceCard = ({ service, index, position, setActiveIndex }) => {
  const isCenter = position === 'center';
  const isTop = position === 'top';
  const isBottom = position === 'bottom';

  const handleMobileClick = () => {
    if (!isCenter && setActiveIndex) {
      setActiveIndex(index);
    }
  };

  const imageUrl = getServiceImage(service);

  // Animation variants for the layout transition
  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 50, 
      scale: 0.95 
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
    exit: { 
      opacity: 0, 
      y: -50, 
      scale: 0.95,
      transition: { duration: 0.4, ease: "easeIn" }
    }
  };

  return (
    <motion.div 
      layout
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`relative transition-all duration-700 cursor-pointer lg:cursor-default overflow-hidden border border-brand-border/30 flex-shrink-0
        ${isCenter ? 'bg-brand-dark/80 backdrop-blur-md p-6 md:p-8 flex-1 h-auto min-h-fit' : 'bg-brand-dark/20 p-4 h-[100px] flex-none'}`}
      onClick={handleMobileClick}
    >
      {/* Active Left Border Indicator */}
      <motion.div 
        initial={false}
        animate={{ opacity: isCenter ? 1 : 0 }}
        className="absolute top-0 left-0 bottom-0 w-1 bg-brand-primary"
      />

      <div className={`transition-opacity duration-500 h-full flex flex-col justify-center ${isCenter ? 'opacity-100' : 'opacity-40 grayscale'}`}>
        
        {/* Header Area (Always visible) */}
        <div>
          <div className="text-label text-brand-primary mb-2 flex items-center gap-4">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <span className="text-brand-white/40">/</span>
            <span>{service.category}</span>
          </div>
          
          <Link to={service.ctaLink} className={`block group ${!isCenter && 'pointer-events-none'}`}>
            <h3 className={`${isCenter ? 'text-2xl md:text-4xl mb-6' : 'text-xl mb-0'} font-bold font-heading group-hover:text-brand-primary transition-colors truncate`}>
              {service.title}
            </h3>
          </Link>
        </div>

        {/* Dynamic Expansion Area (Center Only) */}
        <AnimatePresence mode="wait">
          {isCenter && (
            <motion.div
              key="expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              {/* Mobile Only Image */}
              <div className="md:hidden w-full h-48 mb-6 border border-brand-border relative overflow-hidden mt-4">
                <img 
                  src={imageUrl} 
                  alt={service.imageAlt || service.title} 
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(10,10,10,0.9)] z-10 pointer-events-none" />
              </div>

              <p className="text-lg text-brand-white/80 font-body leading-relaxed mb-8 max-w-2xl">
                {service.fullDescription}
              </p>

              {/* Stats Area */}
              {service.stats && service.stats.length > 0 && (
                <div className="grid grid-cols-2 gap-8 mb-8 border-t border-brand-border pt-6 max-w-md">
                  {service.stats.map((stat, i) => (
                    <div key={i}>
                      <div className="text-2xl font-bold font-heading text-brand-primary mb-1">{stat.value}</div>
                      <div className="text-label text-brand-white/50">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <Link
                to={service.ctaLink}
                className="group inline-flex items-center gap-3 bg-brand-primary/10 border border-brand-primary text-brand-white px-6 py-3 font-semibold uppercase tracking-wider text-sm hover:bg-brand-primary hover:text-brand-white transition-all duration-300"
              >
                {service.ctaText}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
