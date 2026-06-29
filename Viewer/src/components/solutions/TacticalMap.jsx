import React from 'react';
import { motion } from 'framer-motion';

const pinCoordinates = [
  // Precisely mapped to the 7 vehicles in BG_Image.png
  { id: 1, top: '22%', left: '36%', delay: 0 },    // Command Vehicle (Central, radar rings)
  { id: 2, top: '37%', left: '29%', delay: 0.1 },  // Top Left
  { id: 3, top: '53%', left: '25%', delay: 0.2 },  // Top Right
  { id: 4, top: '50%', left: '48%', delay: 0.3 },  // Mid Left
  { id: 5, top: '45%', left: '73%', delay: 0.4 },  // Bottom Left
  { id: 6, top: '70%', left: '44%', delay: 0.5 },  // Bottom Center
  { id: 7, top: '67%', left: '69%', delay: 0.6 },  // Bottom Right
];

const dronePosition = { top: '12%', left: '49%' }; // Exactly 15% above the command vehicle

export default function TacticalMap() {

  return (
    <div className="relative z-0 w-full flex items-start justify-center lg:justify-end pointer-events-none mt-12 lg:mt-[48px]">

      {/* MapContainer (position: relative) 
          Using w-full and h-auto on the image perfectly mimics object-fit: contain 
          while providing an exact bounding box for absolute overlays to prevent drifting. 
          Max-width is reduced to match the reference image sizing. */}
      <div className="relative w-full h-auto max-w-[900px] flex-shrink-0">

        {/* background.png */}
        <img
          src="/assets/solutions/BG_Image.png"
          alt="Tactical Background Map"
          className="block w-full h-auto"
        />

        {/* drone & spotlight (absolute) */}
        {/* Positioned independently of the map pins */}
        <div
          className="absolute z-20 flex flex-col items-center"
          style={{
            top: dronePosition.top,
            left: dronePosition.left,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* Spotlight originating from center of drone and pointing to command vehicle */}
          <div
            className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[70px] md:w-[90px]"
            style={{
              height: '14vw',
              maxHeight: '130px',
              background: 'linear-gradient(to bottom, rgba(0, 100, 255, 0.4) 0%, rgba(0, 100, 255, 0) 100%)',
              clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
              filter: 'blur(5px)',
              transformOrigin: 'top center',
            }}
          />

          {/* Drone Image (Floats 5-6px vertically) */}
          <motion.img
            src="/assets/solutions/Drone.png"
            alt="ISR Drone"
            className="relative z-10 w-20 md:w-24 lg:w-32 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
            animate={{ y: [-5, 0, -5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* pin[] (absolute) */}
        {pinCoordinates.map((pin) => (
          <div
            key={pin.id}
            className="absolute z-10"
            style={{
              top: pin.top,
              left: pin.left,
              transform: 'translate(-50%, -100%)' // Bottom tip exactly centered on the coordinate
            }}
          >
            <motion.img
              src="/assets/solutions/Map_Pin.png"
              alt="Asset Pin"
              className="w-5 md:w-7 lg:w-9 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
              animate={{ y: [0, -7, 0] }} // Bounces 7px vertically
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: pin.delay
              }}
            />
          </div>
        ))}

      </div>
    </div>
  );
}
