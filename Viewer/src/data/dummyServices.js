export const DUMMY_SERVICES = [
  {
    id: 'dummy-1',
    slug: 'aerospace-engineering',
    category: 'AERONAUTICS',
    title: 'Aerospace Engineering',
    shortDescription: 'Next-generation aerial superiority platforms.',
    fullDescription: 'Developing cutting-edge hypersonic and stealth aeronautics systems designed to maintain tactical advantage in contested environments. Our aerospace platforms integrate seamlessly with existing multi-domain command structures.',
    image: null, // Will be resolved by serviceAssetResolver
    imageAlt: 'Aerospace engineering schematic',
    stats: [
      { label: 'Speed', value: 'Mach 5+' },
      { label: 'Range', value: 'Global' }
    ],
    highlights: ['Radar Evading', 'Autonomous Flight', 'Modular Payloads'],
    ctaText: 'Explore Aeronautics',
    ctaLink: '/services/aerospace-engineering'
  },
  {
    id: 'dummy-2',
    slug: 'cybersecurity-solutions',
    category: 'CYBER DOMAIN',
    title: 'Cybersecurity Solutions',
    shortDescription: 'Hardened network defense and threat neutralization.',
    fullDescription: 'Deploying AI-driven cybersecurity infrastructure to protect critical national assets. Our proactive threat hunting algorithms neutralize intrusions before they breach the perimeter.',
    image: null,
    imageAlt: 'Cybersecurity operations center interface',
    stats: [
      { label: 'Uptime', value: '99.999%' },
      { label: 'Response', value: '<10ms' }
    ],
    highlights: ['Zero-Trust Architecture', 'Quantum-Resistant Encryption', 'Automated Countermeasures'],
    ctaText: 'Secure Network',
    ctaLink: '/services/cybersecurity-solutions'
  },
  {
    id: 'dummy-3',
    slug: 'tactical-communications',
    category: 'COMMUNICATIONS',
    title: 'Tactical Communications',
    shortDescription: 'Encrypted, jam-resistant operational networks.',
    fullDescription: 'Ensuring unbroken lines of communication across all theaters of operation. Our tactical communication arrays are hardened against electronic warfare and environmental extremes.',
    image: null,
    imageAlt: 'Tactical communications satellite dish',
    stats: [
      { label: 'Bandwidth', value: '100 Gbps' },
      { label: 'Encryption', value: 'AES-256' }
    ],
    highlights: ['Anti-Jamming', 'Low Earth Orbit Sync', 'Mobile Ad-Hoc Networks'],
    ctaText: 'View Comms Systems',
    ctaLink: '/services/tactical-communications'
  },
  {
    id: 'dummy-4',
    slug: 'surveillance-systems',
    category: 'INTELLIGENCE',
    title: 'Surveillance Systems',
    shortDescription: 'Multi-spectral persistent overwatch capabilities.',
    fullDescription: 'Providing commanders with unparalleled situational awareness. From stratospheric UAVs to ground-based sensor meshes, our surveillance systems deliver real-time, actionable intelligence.',
    image: null,
    imageAlt: 'Drone surveillance targeting feed',
    stats: [
      { label: 'Coverage', value: '360°' },
      { label: 'Resolution', value: 'Sub-meter' }
    ],
    highlights: ['Infrared Tracking', 'Swarm Optics', 'Predictive Analytics'],
    ctaText: 'Analyze Systems',
    ctaLink: '/services/surveillance-systems'
  },
  {
    id: 'dummy-5',
    slug: 'defense-electronics',
    category: 'HARDWARE',
    title: 'Defense Electronics',
    shortDescription: 'Ruggedized computing and sensor integration.',
    fullDescription: 'Engineering microelectronics that thrive in the harshest battlefields. Our electronic warfare modules provide electronic attack, support, and protection capabilities.',
    image: null,
    imageAlt: 'Ruggedized microelectronics motherboard',
    stats: [
      { label: 'Temp Range', value: '-55°C to 125°C' },
      { label: 'Reliability', value: 'Class S' }
    ],
    highlights: ['Signal Jamming', 'EMP Shielding', 'Cognitive Radar'],
    ctaText: 'Explore Hardware',
    ctaLink: '/services/defense-electronics'
  },
  {
    id: 'dummy-6',
    slug: 'command-control-systems',
    category: 'SOFTWARE',
    title: 'Command & Control Systems',
    shortDescription: 'Unified multi-domain operational dashboards.',
    fullDescription: 'The nerve center of modern warfare. Our C2 platforms fuse data from thousands of disparate sensors into a single, intuitive interface, accelerating the OODA loop for battlefield commanders.',
    image: null,
    imageAlt: 'Command and control dashboard interface',
    stats: [
      { label: 'Data Latency', value: 'Zero' },
      { label: 'Integration', value: 'All-Domain' }
    ],
    highlights: ['AI Decision Support', 'Real-Time Telemetry', 'Distributed Node Architecture'],
    ctaText: 'Command Platform',
    ctaLink: '/services/command-control-systems'
  }
];

export const enrichCmsServices = (cmsServices) => {
  // If CMS returns services, we map over them and enrich them with dummy data fields if they are missing
  return cmsServices.map((cmsService, index) => {
    // Attempt to match by title or fallback to index
    const dummyMatch = DUMMY_SERVICES.find(d => d.title.toLowerCase() === cmsService.title.toLowerCase()) 
      || DUMMY_SERVICES[index % DUMMY_SERVICES.length];
      
    return {
      id: cmsService.id || dummyMatch.id,
      slug: dummyMatch.slug, // CMS doesn't have slug yet
      category: dummyMatch.category, // CMS doesn't have category yet
      title: cmsService.title || dummyMatch.title,
      shortDescription: cmsService.description || dummyMatch.shortDescription,
      fullDescription: dummyMatch.fullDescription, // CMS doesn't have fullDescription yet
      image: cmsService.image || null, // Let resolver handle it
      imageAlt: dummyMatch.imageAlt,
      stats: dummyMatch.stats,
      highlights: dummyMatch.highlights,
      ctaText: dummyMatch.ctaText,
      ctaLink: dummyMatch.ctaLink,
    };
  });
};
