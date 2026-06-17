import React from 'react';
import { motion } from 'framer-motion';
import { Shield, MapPin, Clock } from 'lucide-react';
import { ABOUT_PAGE_DEFAULTS } from '../../data/aboutPageDefaults';
import SnapshotCard from './SnapshotCard';

const CompanySnapshotSection = ({ data }) => {
  // Use CMS data or fallbacks
  const foundedYear = data?.details?.foundedYear || ABOUT_PAGE_DEFAULTS.foundedYear;
  const headquarters = data?.details?.headquarters || ABOUT_PAGE_DEFAULTS.headquarters;
  const yearsOfLegacy = data?.details?.yearsOfLegacy || "25+";
  const snapshotDescription = ABOUT_PAGE_DEFAULTS.snapshotDescription; // Hard fallback for phase 1

  return (
    <section className="py-24 bg-[#050505] relative z-10 border-t border-[rgba(255,255,255,0.06)] overflow-hidden">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 opacity-100 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-20 items-end">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-brand-primary"></div>
              <span className="text-label text-brand-primary tracking-widest font-heading uppercase">
                COMPANY SNAPSHOT
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-white leading-tight">
              Built on Experience.<br/>
              <span className="text-brand-primary">Driven by Purpose.</span>
            </h2>
          </div>
          
          <div className="flex-1 lg:max-w-xl">
            <p className="text-lg text-brand-white/70 font-body leading-relaxed border-l-2 border-brand-primary/30 pl-6 py-2">
              {snapshotDescription}
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SnapshotCard 
            index={0}
            icon={Shield}
            value={foundedYear}
            label="Founded Year"
            description="Established with a commitment to strategic defense superiority."
          />
          <SnapshotCard 
            index={1}
            icon={MapPin}
            value={headquarters}
            label="Headquarters"
            description="Global operations directed from our primary command center."
          />
          <SnapshotCard 
            index={2}
            icon={Clock}
            value={yearsOfLegacy}
            label="Years of Legacy"
            description="Decades of proven excellence in complex operational environments."
          />
        </div>

      </div>
    </section>
  );
};

export default CompanySnapshotSection;
