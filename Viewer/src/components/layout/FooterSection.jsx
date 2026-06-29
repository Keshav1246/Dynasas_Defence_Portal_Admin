import React from 'react';
import { Link } from 'react-router-dom';
const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const FooterSection = ({ data, siteData }) => {
  if (!data) return null;

  // Prefer data.logo, but fallback to a static path if needed, though data.logo is mapped in index.js
  const logoUrl = data.logo || '/assets/logo.png';
  const logoLightUrl = data.logoLight || '/assets/logo-light.png';

  return (
    <footer className="pt-24 pb-8 w-full border-t border-brand-border bg-brand-dark relative overflow-hidden">
      {/* Subtle grid texture background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & Contact */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="inline-block">
              {logoUrl ? (
                <>
                  <img src={logoUrl} alt="Logo" className="h-12 opacity-90 object-contain theme-logo-dark" />
                  <img src={logoLightUrl} alt="Logo" className="h-12 opacity-90 object-contain theme-logo-light" />
                </>
              ) : (
                <span className="text-2xl font-bold text-brand-white tracking-wide">
                  {siteData?.siteName || "Dynasas"}
                </span>
              )}
            </Link>
            
            <div className="flex flex-col gap-2 text-[15px] text-brand-white/70 mt-2">
              {data.contact?.email && (
                <a href={`mailto:${data.contact.email}`} className="hover:text-brand-primary transition-colors">
                  {data.contact.email}
                </a>
              )}

              {(data.contact?.fullAddress || data.contact?.address) && (
                <span className="whitespace-pre-line">{data.contact.fullAddress || data.contact.address}</span>
              )}
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-sm font-heading font-bold text-brand-white tracking-widest uppercase mb-6">Company</h4>
            <ul className="flex flex-col gap-3.5">
              {data.links?.company?.length > 0 ? (
                data.links.company.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.url || '#'} className="text-[15px] text-brand-white/60 hover:text-brand-primary transition-colors">{link.label}</Link>
                  </li>
                ))
              ) : (
                <>
                  <li><Link to="/about" className="text-[15px] text-brand-white/60 hover:text-brand-primary transition-colors">About Us</Link></li>
                  <li><Link to="/services" className="text-[15px] text-brand-white/60 hover:text-brand-primary transition-colors">Services</Link></li>
                  <li><Link to="/solutions" className="text-[15px] text-brand-white/60 hover:text-brand-primary transition-colors">Solutions</Link></li>
                  <li><Link to="/partners" className="text-[15px] text-brand-white/60 hover:text-brand-primary transition-colors">Partners</Link></li>
                  <li><Link to="/contact" className="text-[15px] text-brand-white/60 hover:text-brand-primary transition-colors">Contact</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div>
            <h4 className="text-sm font-heading font-bold text-brand-white tracking-widest uppercase mb-6">Solutions</h4>
            <ul className="flex flex-col gap-3.5">
              {data.links?.solutions?.length > 0 ? (
                data.links.solutions.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.url || '#'} className="text-[15px] text-brand-white/60 hover:text-brand-primary transition-colors">{link.label}</Link>
                  </li>
                ))
              ) : (
                <li><span className="text-[15px] text-brand-white/40">No active solutions</span></li>
              )}
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-heading font-bold text-brand-white tracking-widest uppercase mb-6 text-center">Follow Us</h4>
            <div className="flex flex-wrap gap-4 justify-center">
              {siteData?.socialLinks?.linkedin ? (
                <a href={siteData.socialLinks.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-brand-white/10 flex items-center justify-center text-brand-white/60 hover:text-brand-primary hover:border-brand-primary hover:bg-brand-primary/10 hover:shadow-[0_0_15px_rgba(255,106,0,0.5)] transition-all duration-300">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              ) : null}
              {siteData?.socialLinks?.twitter ? (
                <a href={siteData.socialLinks.twitter} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-brand-white/10 flex items-center justify-center text-brand-white/60 hover:text-brand-primary hover:border-brand-primary hover:bg-brand-primary/10 hover:shadow-[0_0_15px_rgba(255,106,0,0.5)] transition-all duration-300">
                  <TwitterIcon className="w-4 h-4" />
                </a>
              ) : null}
              {siteData?.socialLinks?.facebook ? (
                <a href={siteData.socialLinks.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-brand-white/10 flex items-center justify-center text-brand-white/60 hover:text-brand-primary hover:border-brand-primary hover:bg-brand-primary/10 hover:shadow-[0_0_15px_rgba(255,106,0,0.5)] transition-all duration-300">
                  <FacebookIcon className="w-4 h-4" />
                </a>
              ) : null}
              {siteData?.socialLinks?.instagram ? (
                <a href={siteData.socialLinks.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-brand-white/10 flex items-center justify-center text-brand-white/60 hover:text-brand-primary hover:border-brand-primary hover:bg-brand-primary/10 hover:shadow-[0_0_15px_rgba(255,106,0,0.5)] transition-all duration-300">
                  <InstagramIcon className="w-4 h-4" />
                </a>
              ) : null}
              {siteData?.socialLinks?.youtube ? (
                <a href={siteData.socialLinks.youtube} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-brand-white/10 flex items-center justify-center text-brand-white/60 hover:text-brand-primary hover:border-brand-primary hover:bg-brand-primary/10 hover:shadow-[0_0_15px_rgba(255,106,0,0.5)] transition-all duration-300">
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-brand-white/10 pt-8 mt-16 text-center">
          <p className="text-[14px] text-brand-white/40">
            {data.copyright || `© ${new Date().getFullYear()} Dynasas. All Rights Reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
