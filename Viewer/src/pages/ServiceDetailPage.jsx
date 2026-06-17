import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const ServiceDetailPage = () => {
  const { slug } = useParams();

  // In a real implementation, we would fetch the service data using the slug
  
  return (
    <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link to="/" className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-white transition-colors mb-8 font-heading text-sm uppercase tracking-widest">
          <ArrowLeft size={16} /> Return to Operations
        </Link>
        <h1 className="text-4xl md:text-6xl font-bold font-heading text-brand-white mb-4">
          System Detail
        </h1>
        <div className="text-xl text-brand-primary font-mono mb-8">
          {slug}
        </div>
        <p className="text-lg text-brand-white/60 font-body max-w-xl mx-auto">
          Detailed technical specifications for this capability are currently classified. Please contact administration for clearance.
        </p>
      </motion.div>
    </div>
  );
};

export default ServiceDetailPage;
