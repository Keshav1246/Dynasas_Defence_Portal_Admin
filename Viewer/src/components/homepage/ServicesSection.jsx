import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServicesStickyMedia from './services/ServicesStickyMedia';
import ServiceCard from './services/ServiceCard';

const SCROLL_THRESHOLD = 100;
const ANIMATION_DURATION = 800; // ms

const STATES = {
  IDLE: 'IDLE',
  SNAPPING: 'SNAPPING',
  PINNED: 'PINNED',
  TRANSITIONING: 'TRANSITIONING',
  RELEASED: 'RELEASED'
};

const ServicesSection = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [machineState, setMachineState] = useState(STATES.IDLE);
  const [navbarHeight, setNavbarHeight] = useState(80);
  const [isDesktop, setIsDesktop] = useState(true);

  const sectionRef = useRef(null);
  const scrollAccumulator = useRef(0);
  const isHoveringCards = useRef(false);

  const services = data?.items || [];

  useEffect(() => {
    const measureLayout = () => {
      const header = document.querySelector('header');
      if (header) setNavbarHeight(header.offsetHeight);
      setIsDesktop(window.innerWidth >= 1024);
    };
    measureLayout();
    window.addEventListener('resize', measureLayout);
    return () => window.removeEventListener('resize', measureLayout);
  }, []);

  // Physically freeze the website when locked (PINNED or TRANSITIONING)
  useEffect(() => {
    const header = document.querySelector('header');

    if (machineState === STATES.PINNED || machineState === STATES.TRANSITIONING) {
      // Calculate precise scrollbar width to prevent ANY screen shake
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      if (header) header.style.paddingRight = `${scrollbarWidth}px`;

    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.paddingRight = '';
      if (header) header.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.paddingRight = '';
      if (header) header.style.paddingRight = '';
    };
  }, [machineState]);

  // Scroll Interception Engine
  useEffect(() => {
    if (!isDesktop) return;
    const container = sectionRef.current;
    if (!container) return;

    const progressService = (direction) => {
      if (machineState === STATES.TRANSITIONING) return;

      if (direction === 1) {
        if (activeIndex < services.length - 1) {
          setMachineState(STATES.TRANSITIONING);
          setActiveIndex(prev => prev + 1);
          setTimeout(() => setMachineState(STATES.PINNED), ANIMATION_DURATION);
        }
        // Deliberately DO NOTHING at the end. User must scroll from image to bypass.
      } else {
        if (activeIndex > 0) {
          setMachineState(STATES.TRANSITIONING);
          setActiveIndex(prev => prev - 1);
          setTimeout(() => setMachineState(STATES.PINNED), ANIMATION_DURATION);
        }
        // Deliberately DO NOTHING at the top. User must scroll from image to bypass.
      }
    };

    const handleWheel = (e) => {
      const rect = container.getBoundingClientRect();
      const distanceToNav = rect.top - navbarHeight;

      // Reset to IDLE if we are completely out of the trap zone
      if (machineState === STATES.RELEASED) {
        if (rect.top > window.innerHeight || rect.bottom < 0) {
          setMachineState(STATES.IDLE);
        }
      }

      // 1. SNAPPING MODE: Ignore all wheel events while the browser smoothly aligns
      if (machineState === STATES.SNAPPING) {
        e.preventDefault();
        return;
      }

      // 2. IDLE & RE-ENGAGEMENT DETECTION
      const isReEngaging = machineState === STATES.RELEASED && isHoveringCards.current;

      if (machineState === STATES.IDLE || isReEngaging) {
        // Broaden the detection zones to catch fast wheel deltas
        const topCrossedDown = rect.top < window.innerHeight * 0.8 && rect.top > -window.innerHeight * 0.5 && e.deltaY > 0;
        const bottomCrossedUp = rect.bottom > window.innerHeight * 0.2 && rect.bottom < window.innerHeight * 1.5 && e.deltaY < 0;

        if (topCrossedDown || bottomCrossedUp || isReEngaging) {
          e.preventDefault(); // Intercept instantly

          // 1. Instantly lock state to ignore incoming wheel events
          setMachineState(STATES.SNAPPING);

          // 2. Instantly freeze the body to kill trackpad/browser momentum
          const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
          document.body.style.overflow = 'hidden';
          document.documentElement.style.overflow = 'hidden';
          document.body.style.paddingRight = `${scrollbarWidth}px`;
          const header = document.querySelector('header');
          if (header) header.style.paddingRight = `${scrollbarWidth}px`;

          // 3. Calculate mathematically perfect centering
          const absoluteSectionTop = window.scrollY + rect.top;
          const targetY = absoluteSectionTop - navbarHeight;

          // 4. Smoothly animate Services into place manually (bypassing native limitations)
          const startY = window.scrollY;
          const distance = targetY - startY;
          const duration = 750; // ms
          const startTime = performance.now();

          const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

          const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Force viewport to precise pixel coordinate
            window.scrollTo(0, startY + distance * easeOutQuart(progress));

            if (progress < 1) {
              requestAnimationFrame(animateScroll);
            } else {
              // 5. Position perfectly locked. Enable service navigation.
              setMachineState(STATES.PINNED);
            }
          };
          requestAnimationFrame(animateScroll);

          return;
        }
      }

      // 3. PINNED EXPERIENCE
      if (machineState === STATES.PINNED || machineState === STATES.TRANSITIONING) {

        // If user scrolls outside the interactive card zone (e.g., on the image), release the trap!
        if (!isHoveringCards.current) {
          setMachineState(STATES.RELEASED);

          // Instantly restore native scrolling capabilities so this wheel event natively scrolls the page
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
          document.body.style.paddingRight = '';
          const header = document.querySelector('header');
          if (header) header.style.paddingRight = '';

          return; // Do NOT preventDefault, letting the browser perform a native smooth scroll
        }

        e.preventDefault(); // Halt native scroll for card interaction

        if (machineState === STATES.TRANSITIONING) return;

        scrollAccumulator.current += e.deltaY;

        if (scrollAccumulator.current > SCROLL_THRESHOLD) {
          scrollAccumulator.current = 0;
          progressService(1);
        } else if (scrollAccumulator.current < -SCROLL_THRESHOLD) {
          scrollAccumulator.current = 0;
          progressService(-1);
        }
      }
    };

    const handleKeyDown = (e) => {
      if (machineState !== STATES.PINNED) return;
      if (['ArrowDown', 'PageDown'].includes(e.key)) {
        if (activeIndex === services.length - 1) {
          // Keyboard escape hatch
          setMachineState(STATES.RELEASED);
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
          return;
        }
        e.preventDefault();
        progressService(1);
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        if (activeIndex === 0) {
          // Keyboard escape hatch
          setMachineState(STATES.RELEASED);
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
          return;
        }
        e.preventDefault();
        progressService(-1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [machineState, activeIndex, isDesktop, navbarHeight, services.length]);

  if (!services.length) return null;

  // Derive the strictly 3 visible cards
  const visibleCards = [];

  if (activeIndex > 0) {
    visibleCards.push({ index: activeIndex - 1, service: services[activeIndex - 1], position: 'top' });
  } else {
    // Spacer for the top slot to keep the active card perfectly centered
    visibleCards.push({ index: -1, service: null, position: 'top-spacer' });
  }

  visibleCards.push({ index: activeIndex, service: services[activeIndex], position: 'center' });

  if (activeIndex < services.length - 1) {
    visibleCards.push({ index: activeIndex + 1, service: services[activeIndex + 1], position: 'bottom' });
  } else {
    // Spacer for the bottom slot to keep the active card perfectly centered
    visibleCards.push({ index: services.length, service: null, position: 'bottom-spacer' });
  }

  return (
    <section
      ref={sectionRef}
      className={`w-full text-brand-white relative z-10 bg-brand-black ${!isDesktop ? 'py-16 md:py-20' : ''}`}
      style={isDesktop ? { height: `calc(100vh - ${navbarHeight}px)` } : {}}
    >
      <div className="container mx-auto px-6 h-full flex flex-col py-6 md:py-8">

        {/* Top Spacer for Safe Centering */}
        <div className="flex-1 min-h-0"></div>

        {/* Header Area (Pinned safely below navbar) */}
        <div className="mb-8 md:mb-12 text-center md:text-left relative z-20 shrink-0">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <div className="h-[1px] w-8 bg-brand-primary/50"></div>
            <span className="text-label text-brand-primary uppercase tracking-wider">
              {data?.sectionLabel}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading">
            {data?.sectionTitle}
          </h2>
          {data?.sectionDescription && (
            <p className="mt-6 text-brand-white/70 max-w-2xl mx-auto md:mx-0 text-lg font-body leading-relaxed">
              {data.sectionDescription}
            </p>
          )}
        </div>

        {/* Layout Structure (Perfectly centered in remaining space) */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-16 relative items-center justify-center shrink-0">

          {/* Left Panel: Sticky Media */}
          <div className="w-full lg:w-5/12 hidden md:flex flex-col relative justify-center max-h-[60vh]">
            <div className="w-full border border-brand-border/30 shadow-2xl rounded-sm overflow-hidden relative">
              <ServicesStickyMedia activeService={services[activeIndex]} />
            </div>
          </div>

          {/* Right Panel: Vertical Carousel */}
          <div
            className={`w-full lg:w-7/12 flex flex-col justify-center gap-6 relative`}
            onMouseEnter={() => isHoveringCards.current = true}
            onMouseLeave={() => isHoveringCards.current = false}
          >
            {isDesktop ? (
              <AnimatePresence mode="popLayout">
                {visibleCards.map((card) => {
                  if (card.position.includes('spacer')) {
                    return <div key={`spacer-${card.index}`} className="h-[100px] flex-none opacity-0 pointer-events-none" />;
                  }
                  return (
                    <ServiceCard
                      key={`service-${card.index}`}
                      service={card.service}
                      index={card.index}
                      position={card.position}
                      setActiveIndex={setActiveIndex}
                    />
                  );
                })}
              </AnimatePresence>
            ) : (
              services.map((service, idx) => (
                <ServiceCard
                  key={`service-mobile-${idx}`}
                  service={service}
                  index={idx}
                  position={activeIndex === idx ? 'center' : 'bottom'}
                  setActiveIndex={setActiveIndex}
                />
              ))
            )}
          </div>

        </div>

        {/* Bottom Spacer for Safe Centering */}
        <div className="flex-1 min-h-0"></div>

      </div>
    </section>
  );
};

export default ServicesSection;
