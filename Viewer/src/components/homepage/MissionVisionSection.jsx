import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';



const MissionVisionSection = ({ data }) => {
  const mission = data?.mission;
  const vision = data?.vision;

  return (
    <section id="mission" className="py-24 w-full text-brand-white relative z-10 border-t border-brand-border bg-brand-black">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Mission & Vision Cards Row */}
        <div className="flex flex-col lg:flex-row gap-8 mb-24">
          
          {/* Mission Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 p-8 md:p-12 border border-brand-border/50 bg-brand-dark/20 relative flex flex-col group hover:border-brand-primary/50 transition-colors duration-500"
          >
            {/* Tactical Accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-primary opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand-primary opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center gap-4 mb-8">
              <Target className="text-brand-primary w-8 h-8 opacity-80" />
              <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-wide">
                {mission.title}
              </h3>
            </div>
            
            <p className="text-lg text-brand-white/80 leading-relaxed font-body mb-12 flex-1">
              {mission.statement}
            </p>

            <div>
              <h4 className="text-sm text-brand-primary font-heading tracking-widest uppercase mb-6 border-b border-brand-border pb-4">
                {mission.listTitle}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {(mission?.items || []).map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-brand-white/70 group-hover:text-brand-white transition-colors">
                    <span className="w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_8px_rgba(255,106,0,0.5)]"></span>
                    <span className="font-body text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="flex-1 p-8 md:p-12 border border-brand-border/50 bg-brand-dark/20 relative flex flex-col group hover:border-brand-primary/50 transition-colors duration-500"
          >
            {/* Tactical Accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-primary opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand-primary opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center gap-4 mb-8">
              <Eye className="text-brand-primary w-8 h-8 opacity-80" />
              <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-wide">
                {vision.title}
              </h3>
            </div>
            
            <p className="text-lg text-brand-white/80 leading-relaxed font-body mb-12 flex-1">
              {vision.statement}
            </p>

            <div>
              <h4 className="text-sm text-brand-primary font-heading tracking-widest uppercase mb-6 border-b border-brand-border pb-4">
                {vision.listTitle}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {(vision?.items || []).map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-brand-white/70 group-hover:text-brand-white transition-colors">
                    <span className="w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_8px_rgba(255,106,0,0.5)]"></span>
                    <span className="font-body text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>



      </div>
    </section>
  );
};

export default MissionVisionSection;
