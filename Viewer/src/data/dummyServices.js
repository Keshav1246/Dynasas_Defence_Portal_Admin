export const DUMMY_SERVICES = [
  {
    id: 'service-1',
    slug: 'product-development',
    category: 'PRODUCT DEVELOPMENT',
    title: 'Product Development',
    shortDescription: 'Design and develop advanced defense technologies and mission-critical systems from concept to deployment, ensuring scalability, reliability, and operational efficiency.',
    fullDescription: 'Design and develop advanced defense technologies and mission-critical systems from concept to deployment, ensuring scalability, reliability, and operational efficiency.',
    image: '/assets/services/product-development.jpg',
    imageAlt: 'Product Development',
    stats: [
      { label: 'Reliability', value: 'Mission-Critical' },
      { label: 'Deployment', value: 'Rapid' }
    ],
    highlights: ['Scalability', 'Efficiency', 'End-to-End Design'],
    ctaText: 'Explore Development',
    ctaLink: '/services/product-development'
  },
  {
    id: 'service-2',
    slug: 'product-customisation',
    category: 'PRODUCT CUSTOMISATION',
    title: 'Product Customisation',
    shortDescription: 'Customize existing platforms and solutions to meet specific operational, military, and organizational requirements while maintaining compatibility and performance.',
    fullDescription: 'Customize existing platforms and solutions to meet specific operational, military, and organizational requirements while maintaining compatibility and performance.',
    image: '/assets/services/product-customisation.jpg',
    imageAlt: 'Product Customisation',
    stats: [
      { label: 'Compatibility', value: '100%' },
      { label: 'Performance', value: 'Maintained' }
    ],
    highlights: ['Tailored Solutions', 'Operational Focus', 'Seamless Integration'],
    ctaText: 'View Customisation',
    ctaLink: '/services/product-customisation'
  },
  {
    id: 'service-3',
    slug: 'rf-interception-solutions',
    category: 'RF INTERCEPTION SOLUTIONS',
    title: 'RF Interception Solutions',
    shortDescription: 'Develop intelligent radio frequency interception systems for signal monitoring, threat detection, and secure electronic warfare operations.',
    fullDescription: 'Develop intelligent radio frequency interception systems for signal monitoring, threat detection, and secure electronic warfare operations.',
    image: '/assets/services/rf-interception-solutions.jpg',
    imageAlt: 'RF Interception Solutions',
    stats: [
      { label: 'Detection', value: 'Real-Time' },
      { label: 'Security', value: 'Encrypted' }
    ],
    highlights: ['Signal Monitoring', 'Threat Detection', 'Electronic Warfare'],
    ctaText: 'Discover RF Systems',
    ctaLink: '/services/rf-interception-solutions'
  },
  {
    id: 'service-4',
    slug: 'video-surveillance',
    category: 'VIDEO SURVEILLANCE',
    title: 'Video Surveillance',
    shortDescription: 'Build AI-powered surveillance systems for real-time monitoring, perimeter security, and critical infrastructure protection.',
    fullDescription: 'Build AI-powered surveillance systems for real-time monitoring, perimeter security, and critical infrastructure protection.',
    image: '/assets/services/video-surveillance.jpg',
    imageAlt: 'Video Surveillance',
    stats: [
      { label: 'AI Powered', value: 'Yes' },
      { label: 'Monitoring', value: 'Real-Time' }
    ],
    highlights: ['Perimeter Security', 'Infrastructure Protection', 'AI Analytics'],
    ctaText: 'Explore Surveillance',
    ctaLink: '/services/video-surveillance'
  },
  {
    id: 'service-5',
    slug: 'cni-protection',
    category: 'CNI PROTECTION',
    title: 'CNI Protection',
    shortDescription: 'Provide secure protection solutions for Critical National Infrastructure through advanced monitoring, cyber defense, and integrated threat response systems.',
    fullDescription: 'Provide secure protection solutions for Critical National Infrastructure through advanced monitoring, cyber defense, and integrated threat response systems.',
    image: '/assets/services/cni-protection.jpg',
    imageAlt: 'CNI Protection',
    stats: [
      { label: 'Defense', value: 'Integrated' },
      { label: 'Response', value: 'Automated' }
    ],
    highlights: ['Advanced Monitoring', 'Cyber Defense', 'Threat Response'],
    ctaText: 'Secure Infrastructure',
    ctaLink: '/services/cni-protection'
  }
];

export const enrichCmsServices = (cmsServices) => {
  // We completely ignore the CMS services and force our hardcoded 5 services per user requirements
  return DUMMY_SERVICES;
};
