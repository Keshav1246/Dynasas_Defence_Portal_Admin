import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MapPin, Globe, Building2, ShieldCheck, Users, Phone, Mail, Navigation } from 'lucide-react';
import { CONTACT_PAGE_DEFAULTS } from '../../data/contactPageDefaults';
import { DEFAULT_CONTACT } from '../../defaults/contact';
import { DEFAULT_ASSETS } from '../../defaults/assets';

const ContactHeadquartersSection = ({ data }) => {
  const defaults = data?.hq || DEFAULT_CONTACT.hq || {};

  const mailingAddress = data?.mailingAddress || DEFAULT_CONTACT.mailingAddress || '';
  const website = data?.website || DEFAULT_CONTACT.website || '';

  const [offices, setOffices] = useState([]);

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
    axios.get(`${baseUrl}/offices?publicView=true`)
      .then(res => {
        if (res.data?.success && res.data.data?.length > 0) {
          setOffices(res.data.data);
        }
      })
      .catch(err => console.error('Failed to fetch offices:', err));
  }, []);

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
        <div className="grid grid-cols-1 md:grid-cols-3 border border-brand-white/10 divide-y md:divide-y-0 md:divide-x divide-[rgba(255,255,255,0.06)] mb-20">

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

        {/* GLOBAL OFFICES SECTION */}
        {offices.length > 0 && (
          <div className="mt-32">
            {/* Redesigned Premium Header */}
            <div className="flex flex-col items-center justify-center mb-16 text-center">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[1px] bg-brand-primary/50" />
                <span className="text-[10px] text-brand-primary font-mono tracking-[0.2em] uppercase">Global Reach</span>
                <div className="w-12 h-[1px] bg-brand-primary/50" />
              </div>
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-brand-white uppercase tracking-wider">
                Our Global Offices
              </h3>
            </div>

            {/* Premium Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {offices.map((office) => {
                const mapQuery = encodeURIComponent(office.fullAddress.replace(/\n/g, ', '));
                const mapUrl = office.latitude && office.longitude
                  ? `https://www.google.com/maps/search/?api=1&query=${office.latitude},${office.longitude}`
                  : `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

                const isHQ = office.officeType === 'HQ';

                return (
                  <div 
                    key={office.id} 
                    className={`group flex flex-col p-8 transition-all duration-500 relative overflow-hidden rounded-2xl border ${
                      isHQ 
                        ? 'border-brand-primary/50 bg-brand-primary/5 shadow-[0_15px_40px_rgba(255,106,0,0.08)] hover:shadow-[0_20px_50px_rgba(255,106,0,0.15)] hover:bg-brand-primary/10 hover:-translate-y-1' 
                        : 'border-brand-border bg-brand-dark shadow-sm hover:border-brand-primary/40 hover:bg-brand-dark-secondary hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1'
                    }`}
                  >
                    {/* Soft Glow behind HQ or on hover */}
                    <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] pointer-events-none transition-opacity duration-700 ${isHQ ? 'bg-brand-primary/40 opacity-100' : 'bg-brand-primary/20 opacity-0 group-hover:opacity-100'}`} />

                    {/* Content Wrapper */}
                    <div className="relative z-10 flex-1 flex flex-col">
                      
                      {/* Card Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex flex-col gap-1 pr-4">
                          <h4 className={`text-2xl font-heading font-bold transition-colors duration-300 ${isHQ ? 'text-brand-primary' : 'text-brand-white group-hover:text-brand-primary'}`}>
                            {office.city ? `${office.city}, ${office.country}` : office.state ? `${office.state}, ${office.country}` : office.country}
                          </h4>
                          {office.city && <span className="text-sm font-body text-brand-light-gray">{office.country}</span>}
                        </div>
                        
                        {office.officeType && (
                          <span className={`shrink-0 ml-auto text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full whitespace-nowrap transition-colors duration-300 ${
                            isHQ 
                              ? 'text-brand-white bg-brand-primary shadow-[0_4px_12px_rgba(255,106,0,0.3)]' 
                              : 'text-brand-light-gray bg-brand-black border border-brand-border'
                          }`}>
                            {office.officeType}
                          </span>
                        )}
                      </div>

                      {/* Card Details */}
                      <div className="space-y-5 mb-8 flex-1">
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-brand-primary/10 border border-brand-primary/20 shrink-0 mt-0.5">
                            <MapPin className="w-4 h-4 text-brand-primary" />
                          </div>
                          <p className="text-[15px] text-brand-light-gray whitespace-pre-line leading-relaxed font-body">
                            {office.fullAddress}
                            {office.postalCode && <><br />{office.postalCode}</>}
                          </p>
                        </div>

                        {(office.phone || office.email) && (
                          <div className="pt-5 border-t border-brand-border space-y-4">
                            {office.phone && (
                              <div className="flex items-center gap-4 group/item">
                                <div className="p-2 rounded-lg bg-brand-black border border-brand-border shrink-0 group-hover/item:bg-brand-primary/10 group-hover/item:border-brand-primary/30 transition-colors">
                                  <Phone className="w-4 h-4 text-brand-light-gray group-hover/item:text-brand-primary transition-colors" />
                                </div>
                                <p className="text-[15px] text-brand-light-gray font-body font-medium">
                                  {office.phone}
                                </p>
                              </div>
                            )}
                            {office.email && (
                              <div className="flex items-center gap-4 group/item">
                                <div className="p-2 rounded-lg bg-brand-black border border-brand-border shrink-0 group-hover/item:bg-brand-primary/10 group-hover/item:border-brand-primary/30 transition-colors">
                                  <Mail className="w-4 h-4 text-brand-light-gray group-hover/item:text-brand-primary transition-colors" />
                                </div>
                                <a href={`mailto:${office.email}`} className="text-[15px] text-brand-light-gray font-body font-medium hover:text-brand-primary transition-colors">
                                  {office.email}
                                </a>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Card CTA */}
                      <div className="mt-auto pt-6 border-t border-brand-border">
                        <a
                          href={mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-3 text-sm font-heading font-bold tracking-[0.15em] uppercase transition-colors group/btn ${
                            isHQ ? 'text-brand-primary hover:text-brand-primary/80' : 'text-brand-light-gray hover:text-brand-primary'
                          }`}
                        >
                          <Navigation className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          View on Map
                        </a>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ContactHeadquartersSection;
