import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { PHASE_2_DUMMY_DATA } from '../../data/aboutPagePhase2Dummy';

const CompanyJourneySection = () => {
  const { label, heading, description, achievement, milestones, values } = PHASE_2_DUMMY_DATA.journey;

  return (
    <section className="relative py-24 lg:py-32 bg-[#050505] overflow-hidden border-t border-[rgba(255,255,255,0.06)]">
      
      {/* Tactical Defense Background Placeholder */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        {/* Dark terrain / topographic lines placeholder effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-primary/5 via-[#050505]/50 to-[#050505]"></div>
        <div className="absolute inset-0" 
             style={{ 
               backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               mixBlendMode: 'luminosity',
               filter: 'contrast(1.5) brightness(0.5)'
             }}>
        </div>
        {/* Connection Lines Overlay */}
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255, 106, 0, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 106, 0, 0.15) 1px, transparent 1px)', backgroundSize: '120px 120px' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-[1400px]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8">
          
          {/* LEFT PANEL (30%) */}
          <div className="w-full lg:w-[30%] flex flex-col justify-center">
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

              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-brand-white leading-tight mb-6">
                {heading}
              </h2>

              <p className="text-brand-white/70 font-body leading-relaxed mb-12">
                {description}
              </p>

              {/* Achievement Card */}
              <div className="p-6 border border-brand-primary/20 bg-brand-primary/5 rounded-sm flex items-start gap-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-[40px] rounded-full group-hover:bg-brand-primary/20 transition-colors"></div>
                <div className="p-3 bg-brand-dark border border-[rgba(255,255,255,0.1)] text-brand-primary shrink-0 relative z-10 shadow-[0_0_15px_rgba(255,106,0,0.2)]">
                  <Trophy size={24} />
                </div>
                <div className="relative z-10">
                  <p className="text-brand-white font-body font-medium leading-snug">
                    <span className="text-brand-primary font-bold">25+</span> Years of excellence in delivering mission-critical defense solutions worldwide.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT PANEL: TIMELINE VISUALIZATION (70%) */}
          <div className="w-full lg:w-[70%] relative lg:pl-12 lg:h-[500px] flex items-center">
            
            {/* Horizontal Timeline Line (Desktop) */}
            <div className="hidden lg:block absolute left-12 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-brand-primary/10 via-brand-primary to-brand-primary/10 shadow-[0_0_20px_rgba(255,106,0,0.5)]"></div>
            
            {/* Vertical Timeline Line (Mobile/Tablet) */}
            <div className="lg:hidden absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-primary/10 via-brand-primary to-brand-primary/10 shadow-[0_0_20px_rgba(255,106,0,0.5)]"></div>

            <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center relative gap-8 lg:gap-4 pl-12 lg:pl-0">
              {milestones.map((milestone, idx) => {
                const Icon = milestone.icon;
                const isEven = idx % 2 === 0;
                
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className={`relative w-full lg:w-1/5 flex flex-col group ${isEven ? 'lg:-translate-y-24' : 'lg:translate-y-24'}`}
                  >
                    {/* Node on the line (Desktop) */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-black border-2 border-brand-primary items-center justify-center z-20 shadow-[0_0_15px_rgba(255,106,0,0.8)]"
                         style={{ top: isEven ? '100px' : '-100px', marginTop: isEven ? '40px' : '-40px' }}>
                      <div className="w-1 h-1 bg-brand-primary rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Connecting dashed line (Desktop) */}
                    <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-[1px] h-10 border-l border-dashed border-brand-primary/50 z-10"
                         style={{ top: isEven ? '100%' : '-40px' }}>
                    </div>

                    {/* Node on the line (Mobile) */}
                    <div className="lg:hidden absolute -left-12 top-6 w-4 h-4 rounded-full bg-brand-black border-2 border-brand-primary flex items-center justify-center z-20 shadow-[0_0_15px_rgba(255,106,0,0.8)]">
                      <div className="w-1 h-1 bg-brand-primary rounded-full animate-pulse"></div>
                    </div>

                    {/* Milestone Card */}
                    <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-[rgba(255,255,255,0.06)] p-5 relative overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:border-brand-primary/40 hover:shadow-[0_10px_30px_rgba(255,106,0,0.1)] hover:z-30">
                      {/* Glow effect */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-brand-primary/10 blur-[20px] rounded-full group-hover:bg-brand-primary/20 transition-colors"></div>
                      
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 border border-[rgba(255,255,255,0.1)] text-brand-primary bg-brand-black/50">
                          <Icon size={16} />
                        </div>
                        <span className="text-xl font-heading font-bold text-brand-primary drop-shadow-[0_0_8px_rgba(255,106,0,0.4)]">
                          {milestone.year}
                        </span>
                      </div>
                      
                      <h4 className="text-sm font-heading font-bold text-brand-white mb-2 leading-tight">
                        {milestone.title}
                      </h4>
                      <p className="text-xs text-brand-white/50 font-body leading-relaxed">
                        {milestone.description}
                      </p>
                      
                      {/* Tactical Bottom Line */}
                      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-primary transition-all duration-500 group-hover:w-full"></div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

        {/* BOTTOM VALUES BAR */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 lg:mt-32 pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap justify-center items-center gap-4 lg:gap-8"
        >
          {values.map((val, idx) => (
            <React.Fragment key={idx}>
              <span className="text-xs lg:text-sm font-heading tracking-[0.2em] text-brand-white/70 uppercase">
                {val}
              </span>
              {idx < values.length - 1 && (
                <div className="w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(255,106,0,0.6)]"></div>
              )}
            </React.Fragment>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default CompanyJourneySection;
