import { DEFAULT_ASSETS } from '../defaults/assets';

export const CONTACT_PAGE_DEFAULTS = {
  hero: {
    label: "GET IN TOUCH",
    heading: "Let's Discuss",
    headingHighlight: "Mission-Critical",
    headingEnd: "Technology Solutions",
    description: "Connect with our experts for command & control systems, surveillance platforms, radar integration and defense technology.",
    image: DEFAULT_ASSETS.CONTACT_HERO_BACKGROUND,
    headquartersUrl: "https://www.google.com/maps/search/?api=1&query="
  },
  info: {
    label: "CONTACT INFORMATION",
    heading: "Multiple Ways to Connect",
    generalEmail: "contact@dynasas.com",
    securityEmail: "security@dynasas.com",
    mainPhone: "+91-XXXXXXXXXX",
    defenseContractsPhone: "contracts@dynasas.com",
    headquarters: "New Delhi, India"
  },
  hq: {
    label: "OUR HEADQUARTERS",
    heading: "Built Here.",
    headingHighlight: "Securing Everywhere.",
    description: "Our headquarters serve as the command center for innovation, operations, and global defense solutions.",
    mailingAddress: "Dynasas Headquarters\nNew Delhi, India",
    website: "dynasas.com",
    websiteUrl: "https://dynasas.com"
  },
  inquiry: {
    title: "We're Here to Help.",
    description: "Fill out the form below and our team will get back to you promptly.",
    types: [
      "Defense Systems",
      "Radar Solutions",
      "Communication Systems",
      "Partnership Inquiry",
      "Media Inquiry",
      "General Inquiry"
    ]
  },
  support: {
    label: "24/7 OPERATIONAL SUPPORT",
    heading: "Always Ready.",
    headingHighlight: "Always Secure.",
    description: "For urgent assistance and mission-critical support, our team is available 24/7.",
    responseTime: "Within 2 Business Hours"
  }
};
