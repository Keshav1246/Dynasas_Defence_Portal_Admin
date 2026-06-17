import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Shield, Phone, FileSignature } from 'lucide-react';
import { CONTACT_PAGE_DEFAULTS } from '../../data/contactPageDefaults';

const ContactInfoCard = ({ icon: Icon, title, value, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-[#050505] border border-[rgba(255,255,255,0.06)] p-8 overflow-hidden hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center h-full"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-brand-primary/5 blur-[50px] group-hover:bg-brand-primary/15 transition-colors duration-500 rounded-full pointer-events-none"></div>
      
      {/* Tactical Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[rgba(255,255,255,0.06)]"></div>
      <div className="absolute bottom-0 left-[20%] right-[20%] w-[60%] h-[2px] bg-transparent group-hover:bg-brand-primary transition-all duration-700 ease-out shadow-[0_0_15px_rgba(255,106,0,0.8)] opacity-0 group-hover:opacity-100"></div>
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-primary/30 group-hover:border-brand-primary transition-colors"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-primary/30 group-hover:border-brand-primary transition-colors"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-primary/30 group-hover:border-brand-primary transition-colors"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-primary/30 group-hover:border-brand-primary transition-colors"></div>

      <div className="relative z-10 flex flex-col items-center h-full w-full">
        {/* Circular HUD Icon Graphic */}
        <div className="mb-8 relative inline-flex">
          <div className="absolute inset-[-8px] border border-brand-primary/20 rounded-full group-hover:scale-110 group-hover:border-brand-primary/40 transition-all duration-500"></div>
          <div className="absolute inset-[-14px] border border-dashed border-brand-primary/10 rounded-full animate-[spin_10s_linear_infinite] group-hover:border-brand-primary/30 transition-colors duration-500"></div>
          <div className="w-16 h-16 flex items-center justify-center bg-[#0a0a0a] border border-brand-primary/30 rounded-full group-hover:bg-brand-primary/10 transition-colors duration-300 relative z-10 shadow-[0_0_15px_rgba(255,106,0,0.1)]">
            <Icon size={28} className="text-brand-primary drop-shadow-[0_0_5px_rgba(255,106,0,0.5)]" />
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-sm font-heading font-bold text-brand-white tracking-wide mb-4">
          {title}
        </h3>
        
        {/* Value */}
        <p className="text-base md:text-lg font-mono font-medium text-brand-primary mb-6 drop-shadow-[0_0_8px_rgba(255,106,0,0.2)]">
          {value}
        </p>
        
        {/* Description */}
        <p className="text-xs text-brand-white/50 font-body leading-relaxed mt-auto max-w-[220px]">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const ContactInfoSection = ({ data }) => {
  const defaults = CONTACT_PAGE_DEFAULTS.info;

  // Contact items mapped directly to props and fallbacks
  const contactCards = [
    {
      icon: Mail,
      title: "General Email",
      value: data?.generalEmail || defaults.generalEmail,
      description: "For general inquiries and information requests."
    },
    {
      icon: Shield,
      title: "Security Email",
      value: data?.securityEmail || defaults.securityEmail,
      description: "For security concerns and vulnerability reports."
    },
    {
      icon: Phone,
      title: "Main Phone",
      value: data?.mainPhone || defaults.mainPhone,
      description: "For general calls and business inquiries."
    },
    {
      icon: FileSignature,
      title: "Defense Contracts",
      value: data?.defenseContractsPhone || defaults.defenseContractsPhone,
      description: "For defense contracts and partnership opportunities."
    }
  ];

  return (
    <section className="py-24 bg-[#050505] relative z-10 border-t border-[rgba(255,255,255,0.06)] overflow-hidden">
      
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 opacity-100 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
        
        {/* Centered Header Block */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-[rgba(255,255,255,0.1)]"></div>
              <span className="text-xs text-brand-primary tracking-widest font-heading uppercase font-bold">
                {defaults.label}
              </span>
              <div className="h-[1px] w-8 bg-[rgba(255,255,255,0.1)]"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-white leading-tight">
              {defaults.heading}
            </h2>
          </motion.div>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {contactCards.map((card, index) => (
            <ContactInfoCard 
              key={index}
              index={index}
              icon={card.icon}
              title={card.title}
              value={card.value}
              description={card.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ContactInfoSection;
