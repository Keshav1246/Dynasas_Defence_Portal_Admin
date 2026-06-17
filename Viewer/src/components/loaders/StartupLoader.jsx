import React from 'react';
import { motion } from 'framer-motion';

const StartupLoader = () => {
  const loaderUrl = "/assets/Loader Image.png";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-black overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Background Pulse / Glow */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF7A45]/20 via-[#0A0A0A] to-[#0A0A0A] opacity-50"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main Logo Container */}
      <motion.div
        className="relative z-10 flex flex-col items-center w-full px-6"
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        exit={{ scale: 1.05, opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
      >
        <motion.img 
          src={loaderUrl} 
          alt="Dynasas Loader"
          className="w-full max-w-2xl md:max-w-4xl lg:max-w-[1024px] mb-8 object-contain"
          animate={{
            filter: ["drop-shadow(0px 0px 0px rgba(241,90,36,0))", "drop-shadow(0px 0px 25px rgba(241,90,36,0.4))", "drop-shadow(0px 0px 0px rgba(241,90,36,0))"]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default StartupLoader;
