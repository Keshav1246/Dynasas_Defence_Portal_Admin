import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import { motion } from 'framer-motion';
import { navigation } from '../../config/navigation';
import { getLogo } from '../../utils/assetResolver';

const Header = ({ siteData }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoUrl = getLogo(siteData, true); // true for isDark background

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'backdrop-blur-lg py-4 border-b border-brand-border bg-brand-dark/80' : 'py-6 bg-transparent'}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 z-50">
            {logoUrl ? (
              <img src={logoUrl} alt={siteData?.siteName || "Dynasas"} className="h-8 md:h-10 object-contain" />
            ) : (
              <span className="text-xl font-bold text-brand-white tracking-wide">{siteData?.siteName || "Dynasas"}</span>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium text-brand-white/80">
            {navigation.filter(item => item.label !== "Contact").map((item) => {
              const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
              return (
                <Link key={item.label} to={item.href} className={`transition-colors py-1 ${isActive ? 'text-brand-primary border-b border-brand-primary' : 'hover:text-brand-primary'}`}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
             <Link 
              to="/contact" 
              className="bg-brand-primary text-brand-white px-6 py-2.5 text-sm uppercase tracking-wider font-heading font-semibold hover:bg-brand-primary-hover hover:shadow-[0_0_15px_rgba(255,106,0,0.5)] hover:-translate-y-0.5 transition-all duration-300 block"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-brand-white hover:text-brand-primary transition-colors z-50"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} siteData={siteData} />
    </>
  );
};

export default Header;
