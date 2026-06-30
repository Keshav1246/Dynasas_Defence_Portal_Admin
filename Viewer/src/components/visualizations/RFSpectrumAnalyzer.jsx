import React, { useEffect, useRef, useState } from 'react';

const RFSpectrumAnalyzer = () => {
  const containerRef = useRef(null);
  const spectrumCanvasRef = useRef(null);
  const waterfallCanvasRef = useRef(null);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
      return document.documentElement.getAttribute('data-theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sCanvas = spectrumCanvasRef.current;
    const wCanvas = waterfallCanvasRef.current;
    const container = containerRef.current;
    if (!sCanvas || !wCanvas || !container) return;

    let sCtx = sCanvas.getContext('2d', { alpha: false });
    let wCtx = wCanvas.getContext('2d', { alpha: false });

    let offscreen = document.createElement('canvas');
    let offCtx = offscreen.getContext('2d', { alpha: false });

    let rowCanvas = document.createElement('canvas');
    let rowCtx = rowCanvas.getContext('2d', { alpha: false });

    let animationFrameId;
    let width, sHeight, wHeight;

    const padLeft = 45; // Dedicated left padding for labels
    let padBottom = 20;
    let isMobile = false;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      isMobile = width < 768;
      padBottom = isMobile ? 0 : 20;
      
      sHeight = isMobile ? Math.max(150, width * 0.35) : 250;
      wHeight = isMobile ? Math.max(200, width * 0.5) : 350;

      sCanvas.style.height = `${sHeight}px`;
      wCanvas.style.height = `${wHeight}px`;

      const dpr = window.devicePixelRatio || 1;

      sCanvas.width = width * dpr;
      sCanvas.height = sHeight * dpr;
      wCanvas.width = width * dpr;
      wCanvas.height = wHeight * dpr;

      const graphWidth = Math.max(1, width - padLeft);
      const actualGraphWidth = graphWidth * dpr;

      const oldOffscreen = offscreen;
      offscreen = document.createElement('canvas');
      offscreen.width = actualGraphWidth;
      offscreen.height = wHeight * dpr;
      offCtx = offscreen.getContext('2d', { alpha: false });

      rowCanvas.width = actualGraphWidth;
      rowCanvas.height = 1;
      rowCtx = rowCanvas.getContext('2d', { alpha: false });

      if (oldOffscreen.width > 0 && oldOffscreen.height > 0) {
        offCtx.drawImage(oldOffscreen, 0, 0, oldOffscreen.width, oldOffscreen.height, 0, 0, offscreen.width, offscreen.height);
      } else {
        offCtx.fillStyle = theme === 'light' ? '#FFFFFF' : '#050505';
        offCtx.fillRect(0, 0, offscreen.width, offscreen.height);
      }

      sCtx.scale(dpr, dpr);
      wCtx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resize);
    resize();

    const numPoints = 1024;
    let time = 0;
    const peakHold = new Float32Array(numPoints).fill(0);
    const signalData = new Float32Array(numPoints);

    const colors = {
      dark: {
        bg: '#050505',
        grid: 'rgba(255,255,255,0.15)',
        gridText: 'rgba(255,255,255,0.6)',
        trace: '#FFFFFF',
        fill: 'rgba(0, 150, 255, 0.3)',
        peakHold: 'rgba(255, 255, 255, 0.2)',
        markerHighlight: 'rgba(255, 255, 255, 0.15)',
        markerLine: 'rgba(255, 0, 0, 0.7)',
        waterfallColormap: [
          { stop: 0.0, color: [0, 5, 20] },       // Deep Navy
          { stop: 0.2, color: [0, 20, 100] },     // Dark Blue
          { stop: 0.4, color: [0, 100, 200] },    // Blue
          { stop: 0.6, color: [0, 255, 255] },    // Cyan
          { stop: 0.7, color: [255, 255, 255] },  // White
          { stop: 0.8, color: [255, 255, 0] },    // Yellow
          { stop: 0.9, color: [255, 120, 0] },    // Orange
          { stop: 1.0, color: [255, 0, 0] }       // Red
        ]
      },
      light: {
        bg: '#F4F6F8',
        grid: 'rgba(0,0,0,0.1)',
        gridText: 'rgba(0,0,0,0.5)',
        trace: '#1A1A1A',
        fill: 'rgba(0, 100, 200, 0.15)',
        peakHold: 'rgba(0, 0, 0, 0.1)',
        markerHighlight: 'rgba(0, 0, 0, 0.05)',
        markerLine: 'rgba(200, 0, 0, 0.6)',
        waterfallColormap: [
          { stop: 0.0, color: [244, 246, 248] },  // Background
          { stop: 0.2, color: [190, 210, 230] },
          { stop: 0.4, color: [100, 150, 220] },
          { stop: 0.6, color: [0, 180, 255] },
          { stop: 0.7, color: [255, 255, 255] },
          { stop: 0.8, color: [255, 200, 0] },
          { stop: 0.9, color: [255, 100, 0] },
          { stop: 1.0, color: [200, 0, 0] }
        ]
      }
    };

    const getWaterfallColor = (value, currentTheme) => {
      const stops = colors[currentTheme].waterfallColormap;
      const v = Math.max(0, Math.min(1, value));

      let i = 0;
      while (i < stops.length - 1 && v > stops[i + 1].stop) {
        i++;
      }

      const s1 = stops[i];
      const s2 = stops[i + 1] || s1;

      const range = s2.stop - s1.stop;
      const t = range === 0 ? 0 : (v - s1.stop) / range;

      const r = Math.round(s1.color[0] + (s2.color[0] - s1.color[0]) * t);
      const g = Math.round(s1.color[1] + (s2.color[1] - s1.color[1]) * t);
      const b = Math.round(s1.color[2] + (s2.color[2] - s1.color[2]) * t);

      return [r, g, b, 255];
    };

    let colorLookupDark = new Uint8ClampedArray(256 * 4);
    let colorLookupLight = new Uint8ClampedArray(256 * 4);
    for (let i = 0; i < 256; i++) {
      const v = i / 255;
      const cD = getWaterfallColor(v, 'dark');
      const cL = getWaterfallColor(v, 'light');
      colorLookupDark.set(cD, i * 4);
      colorLookupLight.set(cL, i * 4);
    }

    const draw = () => {
      const currentColors = colors[theme];
      const dpr = window.devicePixelRatio || 1;
      const actualWidth = width * dpr;
      const actualWHeight = wHeight * dpr;
      const graphWidth = Math.max(1, width - padLeft);
      const graphHeight = Math.max(1, sHeight - padBottom);
      const actualGraphWidth = graphWidth * dpr;
      const actualPadLeft = padLeft * dpr;

      time += 0.08;

      // 1. Generate Realistic Signal Data
      for (let i = 0; i < numPoints; i++) {
        let noise = Math.random() * 0.12; // Base noise
        noise += Math.sin(i * 0.05 + time) * 0.03; // Base wobble
        signalData[i] = noise;
      }

      // Static and Realistic RF Peaks
      const peaks = [
        { pos: 0.15, width: 0.002, amp: 0.5 + Math.random() * 0.1 }, // Narrow band
        { pos: 0.22, width: 0.008, amp: 0.6 + Math.sin(time * 0.2) * 0.15 }, // Pulsing
        { pos: 0.38, width: 0.004, amp: 0.4 + Math.random() * 0.05 }, // Weak signal
        { pos: 0.65, width: 0.02, amp: 0.7 + Math.sin(time * 0.8) * 0.1 }, // Wide-band FSK
        { pos: 0.82, width: 0.0015, amp: 0.9 + Math.random() * 0.05 }, // Sharp strong carrier
        { pos: 0.55, width: 0.004, amp: (Math.random() > 0.95) ? 0.75 : 0.0 } // Occasional burst
      ];

      peaks.forEach(peak => {
        const centerIdx = Math.floor(peak.pos * numPoints);
        const widthIdx = Math.max(1, Math.floor(peak.width * numPoints));

        for (let i = Math.max(0, centerIdx - widthIdx * 4); i < Math.min(numPoints, centerIdx + widthIdx * 4); i++) {
          const dist = Math.abs(i - centerIdx) / widthIdx;
          if (dist < 3) {
            const val = peak.amp * Math.exp(-dist * dist * 1.5);
            signalData[i] += val + (Math.random() * 0.05); // Phase noise
          }
        }
      });

      for (let i = 0; i < numPoints; i++) {
        signalData[i] = Math.min(1.0, Math.max(0, signalData[i]));
        if (signalData[i] > peakHold[i]) {
          peakHold[i] = signalData[i];
        } else {
          peakHold[i] -= 0.005; // Decay
        }
      }

      // 2. Draw Spectrum (Top)
      sCtx.fillStyle = currentColors.bg;
      sCtx.fillRect(0, 0, width, sHeight);

      // Grid Lines
      sCtx.strokeStyle = currentColors.grid;
      sCtx.lineWidth = 1;
      sCtx.beginPath();

      const numVertLines = 10;
      for (let i = 0; i <= numVertLines; i++) {
        const x = padLeft + (graphWidth / numVertLines) * i;
        sCtx.moveTo(x, 0);
        sCtx.lineTo(x, graphHeight);
      }

      const numHorizLines = 8; // 0 to -80 dB
      for (let i = 0; i <= numHorizLines; i++) {
        const y = (graphHeight / numHorizLines) * i;
        sCtx.moveTo(padLeft, y);
        sCtx.lineTo(width, y);
      }
      sCtx.stroke();

      // Peak Marker (Highlight the 0.82 sharp carrier like a selected frequency)
      const markerX = padLeft + 0.82 * graphWidth;
      sCtx.fillStyle = currentColors.markerHighlight;
      sCtx.fillRect(markerX - 8, 0, 16, graphHeight);
      sCtx.strokeStyle = currentColors.markerLine;
      sCtx.lineWidth = 1;
      sCtx.beginPath();
      sCtx.moveTo(markerX, 0);
      sCtx.lineTo(markerX, graphHeight);
      sCtx.stroke();

      // Peak Hold Trace
      sCtx.strokeStyle = currentColors.peakHold;
      sCtx.lineWidth = 1;
      sCtx.beginPath();
      for (let i = 0; i < numPoints; i++) {
        const x = padLeft + (i / numPoints) * graphWidth;
        const y = graphHeight - (peakHold[i] * graphHeight * 0.95);
        if (i === 0) sCtx.moveTo(x, y);
        else sCtx.lineTo(x, y);
      }
      sCtx.stroke();

      // Live RF Trace
      sCtx.strokeStyle = currentColors.trace;
      sCtx.fillStyle = currentColors.fill;
      sCtx.lineWidth = 1.2;

      sCtx.beginPath();
      sCtx.moveTo(padLeft, graphHeight);
      for (let i = 0; i < numPoints; i++) {
        const x = padLeft + (i / numPoints) * graphWidth;
        const y = graphHeight - (signalData[i] * graphHeight * 0.95);
        sCtx.lineTo(x, y);
      }
      sCtx.lineTo(padLeft + graphWidth, graphHeight);
      sCtx.closePath();
      sCtx.fill();

      sCtx.beginPath();
      for (let i = 0; i < numPoints; i++) {
        const x = padLeft + (i / numPoints) * graphWidth;
        const y = graphHeight - (signalData[i] * graphHeight * 0.95);
        if (i === 0) sCtx.moveTo(x, y);
        else sCtx.lineTo(x, y);
      }
      sCtx.stroke();

      // Mask padding areas for clean labels
      sCtx.fillStyle = currentColors.bg;
      sCtx.fillRect(0, 0, padLeft - 1, sHeight);
      sCtx.fillRect(padLeft - 1, graphHeight + 1, width, sHeight - graphHeight);

      // Axes Labels
      sCtx.fillStyle = currentColors.gridText;
      sCtx.font = '10px "Space Grotesk", sans-serif';

      // dBm Labels (Left)
      sCtx.textAlign = 'right';
      sCtx.textBaseline = 'middle';
      for (let i = 0; i <= numHorizLines; i++) {
        const y = (graphHeight / numHorizLines) * i;
        const db = -(i * 10); // 0, -10, -20 ... -80
        if (y <= graphHeight) {
          sCtx.fillText(`${db}`, padLeft - 6, y === 0 ? y + 6 : y);
        }
      }

      // Frequency Labels (Bottom) - Hidden on Mobile
      if (!isMobile) {
        sCtx.textAlign = 'center';
        sCtx.textBaseline = 'top';
        for (let i = 0; i <= numVertLines; i++) {
          const x = padLeft + (graphWidth / numVertLines) * i;
          const mhz = 271 + (i * (7 / numVertLines));
          sCtx.fillText(`${mhz.toFixed(3)}M`, x, graphHeight + 6);
        }
      }

      // 3. Draw Waterfall (Bottom)
      const shiftY = 3; // Much faster vertical scrolling

      // Shift existing waterfall down
      offCtx.drawImage(offscreen, 0, 0, actualGraphWidth, actualWHeight - shiftY, 0, shiftY, actualGraphWidth, actualWHeight - shiftY);

      // Generate new top row pixels
      const imageData = rowCtx.createImageData(actualGraphWidth, 1);
      const data = imageData.data;
      const lookup = theme === 'dark' ? colorLookupDark : colorLookupLight;

      for (let x = 0; x < actualGraphWidth; x++) {
        const dataIdx = Math.floor((x / actualGraphWidth) * numPoints);
        const val = signalData[dataIdx];
        const colorIdx = Math.floor(val * 255) * 4;

        const pxIdx = x * 4;
        data[pxIdx] = lookup[colorIdx];
        data[pxIdx + 1] = lookup[colorIdx + 1];
        data[pxIdx + 2] = lookup[colorIdx + 2];
        data[pxIdx + 3] = 255;
      }
      rowCtx.putImageData(imageData, 0, 0);

      // Scale 1px row to shiftY height to avoid gaps
      offCtx.drawImage(rowCanvas, 0, 0, actualGraphWidth, 1, 0, 0, actualGraphWidth, shiftY);

      wCtx.save();
      wCtx.setTransform(1, 0, 0, 1, 0, 0);
      wCtx.fillStyle = currentColors.bg;
      wCtx.fillRect(0, 0, actualWidth, actualWHeight); // Background covers the padLeft area
      wCtx.drawImage(offscreen, 0, 0, actualGraphWidth, actualWHeight, actualPadLeft, 0, actualGraphWidth, actualWHeight);
      wCtx.restore();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <section className="w-full relative overflow-hidden pt-8 pb-16" style={{ backgroundColor: theme === 'light' ? '#FFFFFF' : '#000000' }}>
      <div className="container mx-auto px-6 lg:px-12 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse shadow-[0_0_8px_rgba(255,106,0,0.8)]" />
            <h4 className="text-brand-gray font-heading tracking-[0.2em] text-[10px] font-bold uppercase">
              LIVE WIDEBAND RF SPECTRUM
            </h4>
          </div>
          <div className="text-brand-white/40 font-mono text-[10px] tracking-widest uppercase hidden sm:block">
            SPAN: 7.000 MHz | RBW: 10.0 kHz | VBW: 30.0 kHz
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className={`w-full relative mx-auto flex flex-col items-center border-y border-brand-white/10 ${theme === 'dark' ? 'shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-brand-black' : ''}`}
        style={{ paddingBottom: '1px' }}
      >
        <canvas
          ref={spectrumCanvasRef}
          className="w-full block"
        />

        {/* Physical Divider between Spectrum and Waterfall */}
        <div
          className="w-full h-[1.5px] my-0 md:my-4"
          style={{ backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)' }}
        />

        <canvas
          ref={waterfallCanvasRef}
          className="w-full block"
        />
      </div>
    </section>
  );
};

export default RFSpectrumAnalyzer;
