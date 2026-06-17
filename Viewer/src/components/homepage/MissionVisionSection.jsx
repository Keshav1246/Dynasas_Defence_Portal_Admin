import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const DUMMY_DATA = {
  mission: {
    title: "OUR MISSION",
    statement: "To deliver transformative defense and aerospace technologies that ensure strategic superiority, enhance operational effectiveness and safeguard national interests through continuous innovation.",
    listTitle: "FOCUS AREAS",
    items: [
      "Aerospace Systems",
      "Cyber Defense",
      "Command & Control",
      "Tactical Communications"
    ]
  },
  vision: {
    title: "OUR VISION",
    statement: "To become a global leader in next-generation defense innovation by integrating AI, autonomy, advanced sensing and resilient digital infrastructure.",
    listTitle: "FUTURE PRIORITIES",
    items: [
      "Autonomous Operations",
      "Multi-Domain Integration",
      "Advanced Surveillance",
      "Strategic Partnerships"
    ]
  },
  partners: {
    heading: "TRUSTED BY INDUSTRY LEADERS",
    description: "Dynasas collaborates with leading defense, aerospace and technology organizations to deliver mission-critical systems and next-generation operational capabilities.",
    ctaText: "View Strategic Partnerships",
    ctaLink: "/about",
    logos: [
      { id: 1, name: "Partner Alpha" },
      { id: 2, name: "Partner Beta" },
      { id: 3, name: "Partner Gamma" },
      { id: 4, name: "Partner Delta" },
      { id: 5, name: "Partner Epsilon" },
      { id: 6, name: "Partner Zeta" }
    ]
  }
};

const MissionVisionSection = ({ data }) => {
  const mission = data?.mission?.title ? data.mission : DUMMY_DATA.mission;
  const vision = data?.vision?.title ? data.vision : DUMMY_DATA.vision;
  const partners = DUMMY_DATA.partners;

  return (
    <section className="py-24 w-full text-brand-white relative z-10 border-t border-brand-border bg-brand-black">
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
                {mission.listTitle || 'FOCUS AREAS'}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {(mission.items || DUMMY_DATA.mission.items).map((item, i) => (
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
                {vision.listTitle || 'FUTURE PRIORITIES'}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {(vision.items || DUMMY_DATA.vision.items).map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-brand-white/70 group-hover:text-brand-white transition-colors">
                    <span className="w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_8px_rgba(255,106,0,0.5)]"></span>
                    <span className="font-body text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>

        {/* Partners Preview Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border border-brand-border/30 bg-brand-dark/10 p-8 md:p-16 relative overflow-hidden"
        >
          {/* Decorative Background Grid */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(var(--color-brand-primary) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          </div>
          
          {/* LEFT: Partner Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
             {partners.logos.map((logo) => (
               <div key={logo.id} className="aspect-video border border-brand-border/40 bg-brand-black/50 flex items-center justify-center p-4 group hover:border-brand-primary/40 transition-colors">
                  <span className="font-heading text-xs text-brand-white/30 font-bold uppercase tracking-widest group-hover:text-brand-white/60 transition-colors text-center">
                    {logo.name}
                  </span>
               </div>
             ))}
          </div>

          {/* RIGHT: Content Block */}
          <div className="flex flex-col justify-center relative z-10 lg:pl-8">
            <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-brand-white">
              {partners.heading}
            </h3>
            <p className="text-lg text-brand-white/70 font-body leading-relaxed mb-10">
              {partners.description}
            </p>
            <div>
              <Link 
                to={partners.ctaLink}
                className="inline-flex items-center gap-3 bg-brand-primary/10 border border-brand-primary text-brand-white px-8 py-4 font-semibold uppercase tracking-widest text-sm hover:bg-brand-primary hover:text-brand-white transition-all duration-300 group"
              >
                {partners.ctaText}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default MissionVisionSection;
