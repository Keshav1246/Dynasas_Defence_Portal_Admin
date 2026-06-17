import React from 'react';
import { motion } from 'framer-motion';

const TrustBar = () => {
  // Using generic placeholders as requested, this should eventually be CMS driven
  const placeholders = [
    "TRUSTED BY GLOBAL ALLIES",
    "ISO 9001 CERTIFIED",
    "DEFENSE COMPLIANT",
    "MIL-SPEC APPROVED"
  ];

  return (
    <div className="w-full py-8 border-y border-brand-border relative z-10 backdrop-blur-sm bg-brand-dark/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-60">
          {placeholders.map((text, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-label text-brand-white"
            >
              {text}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
