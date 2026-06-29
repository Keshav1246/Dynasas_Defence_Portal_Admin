import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import { navigation } from '../../config/navigation';
import ThemeToggle from './ThemeToggle';
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

  const logoUrl = '/assets/logo.png';
  const logoLightUrl = '/assets/logo-light.png';

  return (
    <>
      <header
        className="fixed left-0 right-0 z-40 transition-all duration-300 flex justify-center pointer-events-none top-6"
      >
        <div className={`pointer-events-auto flex justify-between items-center transition-all duration-300 bg-brand-black/60 backdrop-blur-xl border border-brand-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.3)] rounded-full px-6 lg:px-8 mx-4 w-full max-w-6xl ${isScrolled ? 'py-3' : 'py-4'}`}>
          <Link to="/" className="flex items-center gap-2 z-50">
            {logoUrl ? (
              <>
                <img src={logoUrl} alt={siteData?.siteName || "Dynasas"} className="h-10 md:h-12 object-contain theme-logo-dark" />
                <img src={logoLightUrl} alt={siteData?.siteName || "Dynasas"} className="h-10 md:h-12 object-contain theme-logo-light" />
              </>
            ) : (
              <span className="text-xl font-bold text-brand-white tracking-wide">{siteData?.siteName || "Dynasas"}</span>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
            {navigation.filter(item => item.label !== "Contact").map((item) => {
              const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
              
              const defaultTextColor = 'text-brand-white/80';
              const hoverTextColor = 'hover:text-brand-primary';

              return (
                <Link 
                  key={item.label} 
                  to={item.href} 
                  className={`transition-colors duration-250 ease-in-out py-1 ${isActive ? 'text-brand-primary border-b border-brand-primary' : `${defaultTextColor} ${hoverTextColor}`}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
             <Link 
              to="/contact" 
              className="bg-brand-primary text-brand-white px-6 py-2.5 text-sm uppercase tracking-wider font-heading font-semibold hover:bg-brand-primary-hover hover:shadow-[0_0_15px_rgba(255,106,0,0.5)] hover:-translate-y-0.5 transition-all duration-300 rounded-full"
            >
              Contact
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Toggle & Theme Toggle */}
          <div className="flex md:hidden items-center gap-2 pointer-events-auto">
            <ThemeToggle />
            <button 
              className="p-2 text-brand-white hover:text-brand-primary transition-colors z-50"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} siteData={siteData} />
    </>
  );
};

export default Header;
