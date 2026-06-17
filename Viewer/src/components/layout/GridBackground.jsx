import React from 'react';

const GridBackground = () => {
  return (
    <div className="fixed inset-0 z-30 pointer-events-none opacity-20">
      {/* Tactical Grid Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem'
        }}
      />
      {/* Subtle fade out at edges if desired */}
      <div className="absolute inset-0 bg-brand-black/40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
  );
};

export default GridBackground;
