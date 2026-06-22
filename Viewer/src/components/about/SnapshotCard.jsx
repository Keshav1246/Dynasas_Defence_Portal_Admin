import React from 'react';
import { motion } from 'framer-motion';

const SnapshotCard = ({ icon: Icon, value, label, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-[#050505] border border-[rgba(255,255,255,0.06)] p-8 lg:p-10 overflow-hidden hover:-translate-y-1 transition-transform duration-500"
    >
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-[50px] group-hover:bg-brand-primary/20 transition-colors duration-500 rounded-full pointer-events-none"></div>
      
      {/* Tactical Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[rgba(255,255,255,0.06)]"></div>
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-primary group-hover:w-full transition-all duration-700 ease-out"></div>
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-primary/30 group-hover:border-brand-primary transition-colors"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-primary/30 group-hover:border-brand-primary transition-colors"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Tactical Circular Graphic with Icon */}
        <div className="mb-10 relative inline-flex">
          {/* Outer dashed ring */}
          <div className="absolute inset-[-10px] border border-dashed border-brand-primary/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
          {/* Inner solid ring */}
          <div className="w-14 h-14 flex items-center justify-center bg-[#050505] border border-brand-primary/30 rounded-full group-hover:bg-brand-primary/10 transition-colors duration-300 relative z-10 shadow-[0_0_15px_rgba(255,106,0,0.1)]">
            <Icon size={24} className="text-brand-primary" />
          </div>
        </div>
        
        <div className="mt-auto">
          {/* Large Orange Value */}
          <h3 className="text-3xl lg:text-4xl font-heading font-bold text-brand-primary mb-4 tracking-tight drop-shadow-[0_0_15px_rgba(255,106,0,0.3)] whitespace-nowrap overflow-hidden text-ellipsis">
            {value}
          </h3>
          <h4 className="text-sm font-heading tracking-widest text-brand-white uppercase mb-4">
            {label}
          </h4>
          <p className="text-sm text-brand-white/50 font-body leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SnapshotCard;
