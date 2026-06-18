export const DEFAULT_ABOUT = {
  companyName: 'Dynasas',
  foundedYear: '1998',
  headquarters: 'New Delhi, India',
  overview: 'Dynasas is a global technology leader operating at the intersection of defense, aerospace, and advanced cybersecurity. For over two decades, we have been the trusted partner for allied forces and government agencies worldwide, delivering integrated, multi-domain capabilities that ensure operational overmatch.',

  hero: {
    sectionLabel: 'ABOUT US',
    sectionTitle: 'Engineering the Future of Defense Technology Survillance',
    overview: 'Dynasas is a global technology leader operating at the intersection of defense, aerospace, and advanced cybersecurity. For over two decades, we have been the trusted partner for allied forces and government agencies worldwide, delivering integrated, multi-domain capabilities that ensure operational overmatch.',
    primaryCTA: {
      text: 'Our Vision',
      link: '#mission'
    },
    secondaryCTA: {
      text: 'Contact',
      link: '/contact'
    },
    bgImage: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  },

  // Sections not yet in CMS but hardcoded in UI
  snapshot: {
    heading: 'Defining the Future of Technology',
    description: 'We believe that absolute security requires perpetual innovation.Our engineers, strategists, and veterans work tirelessly to anticipate threats before they emerge.',
    stats: [
      { label: 'FOUNDED YEAR', value: '2022', description: 'Established with a commitment to strategic defence superiority', iconName: 'Shield' },
      { label: 'Headquarters', value: 'Gurgaon', description: 'Global Operations directed from ourprimary command center', iconName: 'Location' },
      { label: 'Years of Legacy', value: '4+', description: 'Decades of proven excellence in complex operational environments', iconName: 'Clock' }
    ]
  },

  journey: {
    label: 'OUR Journey',
    heading: 'Decade of Strategic Innovation',
    description: 'From our inception as a specialized communications contractor to our current position as a prime defense systems integrator, our trajectory has been defined by technological breakthrough.',
    achievement: "4+ Years of excellence in delivering mission-critical defense solutions worldwide.",
    milestones: [
      { year: '2022', title: 'Foundation', description: 'Established to provide secure tactical communications for allied forces.', iconName: 'Calendar' },
      { year: '2023', title: 'Aerospace Expansion', description: 'Launched the integrated avionics division securing first major tier-1 contract.', iconName: 'Award' },
      { year: '2024', title: 'Cyber Defense Initiative', description: 'Pioneered offensive and defensive cyber capabilities for national security.', iconName: 'Target' },
      { year: '2025', title: 'Autonomous Systems', description: 'Deployed first fully autonomous threat detection grid.', iconName: 'Crosshair' },
      { year: 'Present', title: 'Multi-Domain Dominance', description: 'Leading the integration of space, cyber, and conventional defense platforms.', iconName: 'Globe' }
    ],
    values: ["INNOVATION", "RELIABILITY", "SECURITY"]
  },

  impact: {
    label: 'GLOBAL REACH',
    heading: 'Securing',
    headingHighlight: 'Free World',
    description: 'Our systems form the invisible shield protecting democratic institutions, critical infrastructure, and deployed forces across the globe',
    trustBadge: 'NATO STANAG COMPLIANT.',
    statistics: [
      { id: 1, title: 'Systems Deployed', value: '10,000+', iconName: 'Shield', description: 'Field-proven solutions deployed in real-world environments.' },
      { id: 2, title: 'Threats Neutralized', value: '2.5M+', iconName: 'Target', description: 'Automated threat detection and immediate mitigation.' },
      { id: 3, title: 'Uptime Reliability', value: '99.99%', iconName: 'Activity', description: 'Ensuring continuous operation in the most extreme conditions.' }
    ]
  }
};
