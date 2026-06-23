import { DEFAULT_ASSETS } from './assets';

export const DEFAULT_HOMEPAGE = {
  hero: {
    badgeText: 'DEFENSE & AEROSPACE TECHNOLOGY',
    title: 'Advanced Defense Solutions',
    subtitle: 'Pioneering next-generation technologies for a safer future.',
    description: '',
    backgroundImage: DEFAULT_ASSETS.HERO_BACKGROUND,
    primaryCTA: {
      text: 'Explore Our Solutions',
      link: '/services',
    },
    secondaryCTA: {
      text: 'Contact Us',
      link: '/contact',
    }
  },
  services: {
    sectionLabel: 'SERVICES',
    sectionTitle: 'Capabilities',
    sectionDescription: 'Delivering comprehensive technological advantages across multi-domain operational environments.',
  },
  about: {
    sectionLabel: 'ABOUT',
    sectionTitle: 'Leading Innovation in Defense & Aerospace',
  },
  mission: {
    title: 'Our Mission',
    statement: 'To deliver transformative defense and aerospace technologies that ensure strategic superiority, enhance operational effectiveness and safeguard national interests through continuous innovation.',
    items: ['Aerospace Systems', 'Cyber Defense', 'Command & Control', 'Tactical Communications'],
    listTitle: 'FOCUS AREAS'
  },
  vision: {
    title: 'Our Vision',
    statement: 'To become a global leader in next-generation defense innovation by integrating AI, autonomy, advanced sensing and resilient digital infrastructure.',
    items: ['Autonomous Operations', 'Multi-Domain Integration', 'Advanced Surveillance', 'Strategic Partnerships'],
    listTitle: 'FUTURE PRIORITIES'
  },
  partners: {
    sectionLabel: 'OUR ALLIANCES',
    sectionTitle: 'Trusted By Industry Leaders',
    sectionDescription: 'Dynasas collaborates with leading defense, aerospace and technology organizations to deliver mission-critical systems and next-generation operational capabilities.',
    ctaText: 'View Strategic Partnerships',
    ctaLink: '/about',
  },
  statistics: {
    sectionTitle: 'Our Global Impact',
    items: [
      { id: 1, label: 'Global Defense Partners', value: '50+' },
      { id: 2, label: 'Patents Worldwide', value: '120+' },
      { id: 3, label: 'Years of Excellence', value: '25+' }
    ]
  }
};
