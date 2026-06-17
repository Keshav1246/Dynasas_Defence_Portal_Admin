import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = ({ primaryColor }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        scaleX,
        backgroundColor: primaryColor || '#000',
        transformOrigin: '0%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        zIndex: 1000
      }}
    />
  );
};

export default ScrollProgress;
