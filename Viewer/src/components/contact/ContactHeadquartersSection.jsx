import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Building2, ShieldCheck, Users } from 'lucide-react';
import { CONTACT_PAGE_DEFAULTS } from '../../data/contactPageDefaults';

const ContactHeadquartersSection = ({ data }) => {
  const defaults = CONTACT_PAGE_DEFAULTS.hq;
  
  const mailingAddress = data?.mailingAddress || defaults.mailingAddress;
  const website = data?.website || defaults.website;
  
  const handleMapsClick = () => {
    const addressQuery = encodeURIComponent(mailingAddress.replace(/\n/g, ', '));
    window.open(`https://www.google.com/maps/search/?api=1&query=${addressQuery}`, "_blank", "noopener,noreferrer");
  };

  const handleWebsiteClick = () => {
    window.open(defaults.websiteUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-24 bg-[#050505] relative border-t border-[rgba(255,255,255,0.06)] overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 mb-16">
          
          {/* LEFT CONTENT (40%) */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-6 h-10 border border-brand-primary/40 flex items-center justify-center bg-brand-primary/10">
                  <span className="text-[10px] text-brand-primary font-mono">0</span>
                </div>
                <span className="text-sm text-brand-primary tracking-widest font-heading uppercase font-bold">
                  {defaults.label}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-white leading-[1.1] mb-6">
                {defaults.heading} <br/>
                <span className="text-brand-primary">{defaults.headingHighlight}</span>
              </h2>

              <p className="text-brand-white/70 font-body leading-relaxed mb-10 pr-4">
                {defaults.description}
              </p>

              {/* Interaction Cards */}
              <div className="space-y-4">
                
                {/* Address Card */}
                <div 
                  onClick={handleMapsClick}
                  className="group flex gap-5 p-6 border border-brand-primary/20 bg-brand-primary/5 hover:bg-brand-primary/10 hover:border-brand-primary/40 transition-all duration-300 cursor-pointer rounded-sm"
                >
                  <div className="mt-1">
                    <MapPin size={24} className="text-brand-primary drop-shadow-[0_0_8px_rgba(255,106,0,0.5)] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-heading font-bold text-brand-primary tracking-widest uppercase mb-2">Mailing Address</h4>
                    <p className="text-brand-white/90 font-body leading-relaxed whitespace-pre-line text-sm">
                      {mailingAddress}
                    </p>
                  </div>
                </div>

                {/* Website Card */}
                <div 
                  onClick={handleWebsiteClick}
                  className="group flex items-center justify-between p-6 border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.05)] hover:border-brand-primary/30 transition-all duration-300 cursor-pointer rounded-sm"
                >
                  <div className="flex gap-5 items-center">
                    <Globe size={24} className="text-brand-white/50 group-hover:text-brand-primary transition-colors duration-300" />
                    <div>
                      <h4 className="text-[10px] font-heading font-bold text-brand-white/50 tracking-widest uppercase mb-1">Website</h4>
                      <p className="text-brand-primary font-body text-sm hover:underline">
                        https://www.{website}
                      </p>
                    </div>
                  </div>
                  <div className="text-brand-white/30 group-hover:text-brand-white/70 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          {/* RIGHT VISUAL (60%) */}
          <div className="w-full lg:w-[60%] min-h-[400px] lg:min-h-[500px] relative border border-[rgba(255,255,255,0.06)] bg-[#0a0a0a] overflow-hidden group">
            
            {/* Cinematic Background Image */}
            <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-50 transition-opacity duration-700 mix-blend-luminosity"
                 style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}></div>
            
            {/* Grid Overlay */}
            <div className="absolute inset-0 opacity-30"
                 style={{ backgroundImage: 'linear-gradient(rgba(255, 106, 0, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 106, 0, 0.2) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
            
            {/* Central Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-primary/20 blur-[100px] rounded-full pointer-events-none"></div>

            {/* Simulated Central Node (HQ) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-brand-primary rounded-full shadow-[0_0_20px_rgba(255,106,0,1)] z-20">
              <div className="absolute inset-[-20px] border border-brand-primary/50 rounded-full animate-ping"></div>
              <div className="absolute inset-[-40px] border border-brand-primary/30 rounded-full animate-[spin_4s_linear_infinite] border-t-transparent"></div>
              <MapPin size={32} className="absolute -top-10 -left-3.5 text-brand-primary drop-shadow-[0_0_10px_rgba(255,106,0,0.8)]" />
            </div>

            {/* Floating Labels */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute top-1/4 left-1/4 border border-brand-primary/30 bg-[#050505]/80 backdrop-blur px-3 py-1.5 flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full"></div>
              <span className="text-[9px] font-heading font-bold text-brand-white uppercase tracking-wider">Washington, DC</span>
              <span className="text-[9px] font-mono text-brand-primary">18 KM</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="absolute bottom-1/4 left-10 border border-brand-primary/30 bg-[#050505]/80 backdrop-blur px-3 py-1.5 flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full"></div>
              <span className="text-[9px] font-heading font-bold text-brand-white uppercase tracking-wider">Dulles Int'l Airport</span>
              <span className="text-[9px] font-mono text-brand-primary">32 KM</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="absolute top-1/3 right-10 border border-brand-primary/30 bg-[#050505]/80 backdrop-blur px-3 py-1.5 flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full"></div>
              <span className="text-[9px] font-heading font-bold text-brand-white uppercase tracking-wider">Pentagon</span>
              <span className="text-[9px] font-mono text-brand-primary">10 KM</span>
            </motion.div>

          </div>
        </div>

        {/* BOTTOM FEATURE BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[rgba(255,255,255,0.06)] divide-y md:divide-y-0 md:divide-x divide-[rgba(255,255,255,0.06)]">
          <div className="p-6 flex items-start gap-4 hover:bg-[rgba(255,255,255,0.02)] transition-colors">
            <Building2 size={24} className="text-brand-primary shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-heading font-bold text-brand-white mb-1">Strategic Location</h4>
              <p className="text-xs text-brand-white/50 font-body leading-relaxed">Near key defense corridors and agencies.</p>
            </div>
          </div>
          <div className="p-6 flex items-start gap-4 hover:bg-[rgba(255,255,255,0.02)] transition-colors">
            <ShieldCheck size={24} className="text-brand-primary shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-heading font-bold text-brand-white mb-1">Secure Facility</h4>
              <p className="text-xs text-brand-white/50 font-body leading-relaxed">State-of-the-art secure infrastructure.</p>
            </div>
          </div>
          <div className="p-6 flex items-start gap-4 hover:bg-[rgba(255,255,255,0.02)] transition-colors">
            <Users size={24} className="text-brand-primary shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-heading font-bold text-brand-white mb-1">Expert Team</h4>
              <p className="text-xs text-brand-white/50 font-body leading-relaxed">Dedicated professionals driving mission success.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactHeadquartersSection;
