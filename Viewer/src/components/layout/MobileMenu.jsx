import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { navigation } from '../../config/navigation';
import { getLogo } from '../../utils/assetResolver';

const MobileMenu = ({ isOpen, onClose, siteData }) => {
  const logoUrl = getLogo(siteData, true);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-50 flex flex-col p-6 bg-brand-dark"
        >
          <div className="flex justify-between items-center mb-12">
            {logoUrl ? (
              <img src={logoUrl} alt={siteData?.siteName || "Dynasas"} className="h-8 object-contain" />
            ) : (
              <span className="text-xl font-bold text-brand-white">{siteData?.siteName || "Dynasas"}</span>
            )}
            <button onClick={onClose} className="p-2 text-brand-white/80 hover:text-brand-primary transition-colors">
              <X size={28} />
            </button>
          </div>
          
          <nav className="flex flex-col gap-6 text-2xl font-light text-brand-white/80">
            <Link to="/" onClick={onClose} className="hover:text-brand-primary transition-colors">Home</Link>
            {navigation.map((item) => (
              <Link key={item.label} to={item.href} onClick={onClose} className="hover:text-brand-primary transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
