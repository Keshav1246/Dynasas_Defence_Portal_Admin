import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// Counter component using Framer Motion and basic JS intervals
const Counter = ({ value }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    // Remove non-numeric characters for counting, keep suffix/prefix
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(numericValue)) {
      setCount(value);
      return;
    }

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = duration / steps;
    const increment = numericValue / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  // Reconstruct the string with the counted number
  const displayValue = isNaN(parseFloat(value.replace(/[^0-9.]/g, ''))) 
    ? value 
    : value.replace(/[0-9.]+/, count);

  return <span ref={ref}>{displayValue}</span>;
};

const StatisticsSection = ({ data }) => {
  if (!data?.items?.length) return null;

  return (
    <section className="pb-32 w-full text-brand-white relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-brand-border bg-brand-dark/30 backdrop-blur-sm">
          {data.items.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`flex flex-col items-start justify-center p-8 border-brand-border ${
                idx !== data.items.length - 1 ? 'border-b sm:border-b-0 sm:border-r' : ''
              } ${idx === 1 ? 'lg:border-r' : ''} ${idx === 0 || idx === 2 ? 'sm:border-r lg:border-r' : ''}`}
            >
              <div className="text-5xl md:text-6xl font-extrabold mb-4 text-brand-primary font-heading tracking-tighter">
                <Counter value={stat.value} />
              </div>
              <div className="text-brand-white font-bold mb-1 font-body">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-xs text-brand-white/40 font-body">
                  {stat.description}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
