import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Calendar, Layers, Users, Target } from 'lucide-react';
import { PHASE_2_DUMMY_DATA } from '../../data/aboutPagePhase2Dummy';

const GlobalImpactSection = () => {
  const { label, heading, headingHighlight, description, trustBadge, statistics } = PHASE_2_DUMMY_DATA.impact;

  // Map dummy icons since they aren't stored as components in the array
  const statIcons = [Calendar, Layers, Users, Target];

  return (
    <section className="py-24 lg:py-32 bg-brand-black overflow-hidden relative z-10">
      
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/4"></div>

      <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center">
          
          {/* LEFT PANEL (25%) */}
          <div className="w-full lg:w-[25%] flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-6 h-10 border border-brand-primary/40 flex items-center justify-center bg-brand-primary/10">
                  <span className="text-[10px] text-brand-primary font-mono">0</span>
                </div>
                <span className="text-sm text-brand-primary tracking-widest font-heading uppercase font-bold">
                  {label}
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-brand-white leading-[1.1] mb-6">
                Delivering Impact <br/>
                <span className="text-brand-primary">{headingHighlight}</span>
              </h2>

              <p className="text-brand-white/70 font-body leading-relaxed mb-10 pr-4">
                {description}
              </p>

              {/* Trust Badge */}
              <div className="inline-flex items-center gap-4 py-3 px-5 border border-brand-primary/30 bg-[#050505] rounded-sm group hover:border-brand-primary/60 transition-colors">
                <ShieldCheck size={20} className="text-brand-primary group-hover:drop-shadow-[0_0_8px_rgba(255,106,0,0.8)] transition-all" />
                <span className="text-xs font-heading font-bold tracking-widest text-brand-white/90">
                  {trustBadge}
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT PANEL: STATISTICS CARDS (75%) */}
          <div className="w-full lg:w-[75%] lg:pl-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {statistics.map((stat, idx) => {
                const Icon = statIcons[idx];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="group relative bg-[#050505] border border-[rgba(255,255,255,0.06)] p-8 overflow-hidden hover:-translate-y-2 transition-transform duration-500 flex flex-col items-center text-center h-[380px]"
                  >
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-[50px] group-hover:bg-brand-primary/20 transition-colors duration-500 rounded-full pointer-events-none"></div>
                    
                    {/* Animated Border tracking */}
                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-brand-primary transition-all duration-700 ease-out group-hover:w-full"></div>
                    
                    {/* Circular HUD Graphic */}
                    <div className="relative w-32 h-32 flex items-center justify-center mb-8 shrink-0">
                      {/* Outer dashed spinning ring */}
                      <div className="absolute inset-0 border-[2px] border-dashed border-brand-primary/20 rounded-full animate-[spin_12s_linear_infinite] group-hover:border-brand-primary/50 transition-colors duration-500"></div>
                      
                      {/* Inner solid segmented ring */}
                      <div className="absolute inset-2 border-[4px] border-brand-primary/10 rounded-full"></div>
                      <div className="absolute inset-2 border-[4px] border-transparent border-t-brand-primary/60 border-b-brand-primary/60 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
                      
                      {/* Icon */}
                      <div className="relative z-10 w-12 h-12 flex items-center justify-center text-brand-primary drop-shadow-[0_0_8px_rgba(255,106,0,0.5)] group-hover:scale-110 transition-transform duration-500">
                        <Icon size={32} strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mt-auto w-full flex flex-col items-center">
                      <h3 className="text-5xl font-heading font-bold text-brand-primary mb-3 drop-shadow-[0_0_15px_rgba(255,106,0,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(255,106,0,0.6)] transition-all">
                        {stat.value}
                      </h3>
                      <h4 className="text-[13px] font-heading font-bold text-brand-white mb-3 leading-snug">
                        {stat.title}
                      </h4>
                      <p className="text-xs text-brand-white/50 font-body leading-relaxed max-w-[200px]">
                        {stat.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GlobalImpactSection;
