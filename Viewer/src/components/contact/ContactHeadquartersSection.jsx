import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Building2, ShieldCheck, Users } from 'lucide-react';
import { CONTACT_PAGE_DEFAULTS } from '../../data/contactPageDefaults';
import { DEFAULT_CONTACT } from '../../defaults/contact';
import { DEFAULT_ASSETS } from '../../defaults/assets';

const ContactHeadquartersSection = ({ data }) => {
  const defaults = data?.hq || DEFAULT_CONTACT.hq || {};

  const mailingAddress = data?.mailingAddress || DEFAULT_CONTACT.mailingAddress || '';
  const website = data?.website || DEFAULT_CONTACT.website || '';

  const handleMapsClick = () => {
    const addressQuery = encodeURIComponent(mailingAddress.replace(/\n/g, ', '));
    window.open(`https://www.google.com/maps/search/?api=1&query=${addressQuery}`, "_blank", "noopener,noreferrer");
  };

  const handleWebsiteClick = () => {
    window.open(website, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-24 bg-brand-black relative border-t border-brand-white/10 overflow-hidden">
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
                  {data?.city || data?.headquarters || DEFAULT_CONTACT.headquarters} HEADQUARTERS
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-white leading-[1.1] mb-6">
                {defaults.heading} <br />
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
                      {data?.fullAddress || mailingAddress}
                    </p>
                  </div>
                </div>

                {/* Website Card */}
                <div
                  onClick={handleWebsiteClick}
                  className="group flex items-center justify-between p-6 border border-brand-white/10 bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.05)] hover:border-brand-primary/30 transition-all duration-300 cursor-pointer rounded-sm"
                >
                  <div className="flex gap-5 items-center">
                    <Globe size={24} className="text-brand-white/50 group-hover:text-brand-primary transition-colors duration-300" />
                    <div>
                      <h4 className="text-[10px] font-heading font-bold text-brand-white/50 tracking-widest uppercase mb-1">Website</h4>
                      <p className="text-brand-primary font-body text-sm hover:underline">
                        {website.replace(/^https?:\/\/(www\.)?/, '')}
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
          <div className="w-full lg:w-[60%] min-h-[400px] lg:min-h-[500px] relative border border-brand-white/10 bg-brand-dark-secondary overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center opacity-100"
              style={{ backgroundImage: `url('${DEFAULT_ASSETS.COMMAND_AND_CONTROL_HQ}')` }}>
            </div>
          </div>
        </div>

        {/* BOTTOM FEATURE BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-brand-white/10 divide-y md:divide-y-0 md:divide-x divide-[rgba(255,255,255,0.06)]">
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
