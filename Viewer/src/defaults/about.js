import { DEFAULT_ASSETS } from './assets';

export const DEFAULT_ABOUT = {
  companyName: 'Dynasas',
  foundedYear: '2022',
  headquarters: 'Gurgaon, India',
  overview: 'Dynasas is a global technology leader operating at the intersection of defense, aerospace, and advanced cybersecurity. For over two decades, we have been the trusted partner for allied forces and government agencies worldwide, delivering integrated, multi-domain capabilities that ensure operational overmatch.',

  hero: {
    sectionLabel: 'ABOUT US',
    sectionTitle: 'Engineering the Future of Defense Technology & Surveillance Systems',
    overview: 'Dynasas is a technology-driven defence solutions company specializing in command & control systems, surveillance platforms, secure communications, geospatial intelligence, and mission-critical infrastructure. We deliver innovative solutions that enhance operational readiness, strengthen situational awareness, and support strategic decision-making across defence and security domains.',
    primaryCTA: {
      text: 'Our Mission',
      link: '/#mission'
    },
    secondaryCTA: {
      text: 'Contact',
      link: '/contact'
    },
    bgImage: DEFAULT_ASSETS.ABOUT_HERO_BACKGROUND
  },

  // Sections not yet in CMS but hardcoded in UI
  snapshot: {
    heading: 'Defining the Future of Defense Technology',
    description: 'Dynasas is committed to advancing defence and security through innovation, precision, and operational excellence. By combining cutting-edge technologies with mission-focused expertise, we deliver solutions that enhance situational awareness, strengthen command effectiveness, and support critical decision-making in complex environments.',
    stats: [
      { label: 'FOUNDED YEAR', value: '2022', description: 'Established with a commitment to strategic defence superiority', iconName: 'Calendar' },
      { label: 'Headquarters', value: 'Gurgaon', description: 'Global Operations directed from our primary command center', iconName: 'MapPin' },
      { label: 'CORE SERVICES', value: '12+', description: 'Comprehensive defence, surveillance, communication and command solutions tailored for mission-critical operations.', iconName: 'Layers' },
      { label: 'Operational Support', value: '24/7', description: 'Dedicated support and response for mission-critical deployments.', iconName: 'Headset' }
    ]
  },



};
