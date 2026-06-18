import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ABOUT_PAGE_DEFAULTS } from '../../data/aboutPageDefaults';
import SnapshotCard from './SnapshotCard';

const CompanySnapshotSection = ({ data }) => {
  const snapshot = data?.snapshot || {};
  const heading = snapshot.heading;
  const description = snapshot.description;
  const foundedYear = data?.details?.foundedYear;
  const headquarters = data?.details?.headquarters;
  const yearsOfLegacy = data?.details?.yearsOfLegacy;

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
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-white leading-tight" dangerouslySetInnerHTML={{ __html: heading.replace('Security', '<br/><span class="text-brand-primary">Security</span>') }}>
            </h2>
          </div>
          
          <div className="flex-1 lg:max-w-xl">
            <p className="text-lg text-brand-white/70 font-body leading-relaxed border-l-2 border-brand-primary/30 pl-6 py-2">
              {description}
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {snapshot.stats?.map((stat, index) => {
            const IconComponent = LucideIcons[stat.iconName] || LucideIcons.Shield;
            return (
              <SnapshotCard 
                key={index}
                index={index}
                icon={IconComponent}
                value={stat.value}
                label={stat.label}
                description={stat.description}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CompanySnapshotSection;
