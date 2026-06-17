import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = ({ data }) => {
  if (!data) return null;

  return (
    <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {data.backgroundVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={data.backgroundVideo} type="video/mp4" />
          </video>
        ) : data.backgroundImage ? (
          <img
            src={data.backgroundImage}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-brand-black" />
        )}
        
        {/* Dark Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-brand-black/50 to-brand-dark" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-brand-white flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-block"
        >
          <span className="px-4 py-1 border border-brand-border rounded-full text-xs uppercase tracking-[0.2em] font-medium backdrop-blur-sm bg-brand-black/20">
            {data.badgeText}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 tracking-tight max-w-4xl leading-tight text-brand-white"
        >
          {data.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-brand-white/80 max-w-2xl mb-12 font-body font-light"
        >
          {data.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto font-heading relative z-50"
        >
          {data.primaryCTA?.text && (
            <Link
              to={data.primaryCTA.link || '#'}
              className="group bg-brand-primary text-brand-white px-8 py-4 font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-3 hover:bg-brand-primary-hover hover:shadow-[0_0_15px_rgba(255,106,0,0.5)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
            >
              {data.primaryCTA.text}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
          {data.secondaryCTA?.text && (
            <Link
              to={data.secondaryCTA.link || '#'}
              className="px-8 py-4 font-semibold uppercase tracking-wider text-sm border border-brand-primary text-brand-white hover:bg-brand-primary hover:text-brand-white hover:shadow-[0_0_15px_rgba(255,106,0,0.5)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
            >
              {data.secondaryCTA.text}
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
