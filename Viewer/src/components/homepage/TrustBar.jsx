import React from 'react';
import { motion } from 'framer-motion';

const TrustBar = ({ data }) => {
  const items = data && data.length > 0 ? data : [];

  if (items.length === 0) return null;

  return (
    <div className="w-full py-8 relative z-10 backdrop-blur-sm bg-brand-dark/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-60">
          {items.map((text, idx) => (
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
