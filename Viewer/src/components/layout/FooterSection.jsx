import React from 'react';
import { Link } from 'react-router-dom';
import { getLogo } from '../../utils/assetResolver';

const FooterSection = ({ data, siteData }) => {
  if (!data) return null;

  const logoUrl = '/assets/logo.png';

  return (
    <footer className="pt-24 pb-12 w-full text-brand-white/80 border-t border-brand-border bg-brand-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand & Desc */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="h-12 opacity-90 object-contain" />
              ) : (
                <span className="text-2xl font-bold text-brand-white tracking-wide">
                  {siteData?.siteName || "Dynasas"}
                </span>
              )}
            </Link>
            <p className="text-lg font-semibold text-brand-white mb-4">
              {data.tagline}
            </p>
            <p className="text-brand-white/60 leading-relaxed max-w-sm mb-6">
              {data.description}
            </p>
            <div className="flex flex-col gap-1 text-sm text-brand-white/60">
              <span className="font-semibold text-brand-white/80">Address:</span>
              <span className="mb-3">[Insert official company address here]</span>
              <span className="font-semibold text-brand-white/80">Email:</span>
              <span>[Insert official company email here]</span>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="text-label text-brand-white/50 mb-6">Company</h4>
            <ul className="flex flex-col gap-3">
              {data.links?.company?.length > 0 ? (
                data.links.company.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.url || '#'} className="hover:text-brand-primary transition-colors">{link.label}</Link>
                  </li>
                ))
              ) : (
                <>
                  <li><Link to="/about" className="hover:text-brand-primary transition-colors">About Us</Link></li>
                  <li><Link to="/careers" className="hover:text-brand-primary transition-colors">Careers</Link></li>
                  <li><Link to="/contact" className="hover:text-brand-primary transition-colors">Contact</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div>
            <h4 className="text-label text-brand-white/50 mb-6">Solutions</h4>
            <ul className="flex flex-col gap-3">
              {data.links?.solutions?.length > 0 ? (
                data.links.solutions.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.url || '#'} className="hover:text-brand-primary transition-colors">{link.label}</Link>
                  </li>
                ))
              ) : (
                <>
                  <li><Link to="/services" className="hover:text-brand-primary transition-colors">All Services</Link></li>
                  <li><Link to="/industries" className="hover:text-brand-primary transition-colors">Industries</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h4 className="text-label text-brand-white/50 mb-6">Resources</h4>
            <ul className="flex flex-col gap-3">
              {data.links?.resources?.length > 0 ? (
                data.links.resources.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.url || '#'} className="hover:text-brand-primary transition-colors">{link.label}</Link>
                  </li>
                ))
              ) : (
                <>
                  <li><Link to="/case-studies" className="hover:text-brand-primary transition-colors">Case Studies</Link></li>
                  <li><Link to="/whitepapers" className="hover:text-brand-primary transition-colors">White Papers</Link></li>
                  <li><Link to="/news" className="hover:text-brand-primary transition-colors">News & Insights</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-brand-border pt-8 relative flex flex-col lg:flex-row justify-between items-center gap-6 text-sm text-brand-white/50">
          
          {/* Contact Details */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left z-10">
            {data.contact?.email && <span>{data.contact.email}</span>}
            {data.contact?.phone && <span className="hidden sm:inline">•</span>}
            {data.contact?.phone && <span>{data.contact.phone}</span>}
            {data.contact?.address && <span className="hidden sm:inline">•</span>}
            {data.contact?.address && <span>{data.contact.address}</span>}
          </div>

          {/* Copyright */}
          <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 text-center z-0">
            <span>{data.copyright}</span>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4 z-10">
            {siteData?.socialLinks?.linkedin && <a href={siteData.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-brand-primary transition-colors">LinkedIn</a>}
            {siteData?.socialLinks?.twitter && <a href={siteData.socialLinks.twitter} target="_blank" rel="noreferrer" className="hover:text-brand-primary transition-colors">Twitter</a>}
            {siteData?.socialLinks?.youtube && <a href={siteData.socialLinks.youtube} target="_blank" rel="noreferrer" className="hover:text-brand-primary transition-colors">YouTube</a>}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
