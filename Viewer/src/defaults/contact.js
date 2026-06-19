import { DEFAULT_ASSETS } from './assets';

export const DEFAULT_CONTACT = {
  generalEmail: 'general@dynasas.com',
  securityEmail: 'security@dynasas.com',
  mainPhone: '9999999999',
  defenseContractsPhone: '+1 9999999999',
  headquarters: 'Gurgaon',
  mailingAddress: 'Delhi',
  website: 'https://www.dynasas.co',

  // Hardcoded UI text fallbacks
  hero: {
    label: 'COMMUNICATIONS',
    heading: 'Secure',
    headingHighlight: 'Command',
    headingEnd: 'Link',
    description: 'Establish a secure channel with our strategic relations team. Whether for defense procurement, partnership inquiries, or general information, we are ready to assist.',
    primaryCTA: 'Contact',
    secondaryCTA: 'Headquarters',
    image: DEFAULT_ASSETS.CONTACT_HERO_BACKGROUND,
    headquartersUrl: 'https://www.google.com/maps/search/?api=1&query='
  },
  info: {
    label: 'COMMUNICATION Method',
    heading: 'Reach out to the right division',
    generalEmailLabel: 'General mail',
    generalEmailDescription: 'For general inquiries and requests.',
    securityEmailLabel: 'Security mail',
    securityEmailDescription: 'For security concerns and vulnerability reports.',
    phoneLabel: 'Main Communications',
    phoneDescription: 'For general operations and strategic inquiries.',
    contractsLabel: 'Procurement mail',
    contractsDescription: 'For defense contracts and logistics.'
  },
  offices: [
    {
      id: 1,
      region: 'North America',
      name: 'Global Command Center',
      address: '100 Defense Ave, Secure Tech Park, TX 75001',
      phone: '+1 (555) 123-4567',
      isHQ: true
    },
    {
      id: 2,
      region: 'Europe',
      name: 'EU Operations Hub',
      address: '45 Strategic Way, Brussels, Belgium',
      phone: '+32 2 555 0199',
      isHQ: false
    },
    {
      id: 3,
      region: 'Asia Pacific',
      name: 'APAC Defense Center',
      address: '88 Innovation Drive, Singapore',
      phone: '+65 6555 0188',
      isHQ: false
    }
  ],
  form: {
    sectionHeader: 'SEND US A MESSAGE',
    title: 'Fill the form below to send us a message',
    subtitle: 'Our team will respond to your inquiry within 24-48 hours.',
    fields: {
      nameLabel: 'Full Name',
      emailLabel: 'Email',
      phoneLabel: 'Phone Number',
      organizationLabel: 'Organization',
      inquiryTypeLabel: 'Inquiry Type',
      inquiryOptions: [
        'Defense Procurement',
        'Strategic Partnership',
        'General Information'
      ],
      messageLabel: 'Details',
      submitText: 'Submit',
      successMessage: 'Transmission received. A secure channel will be established shortly.',
      errorMessage: 'Transmission failed. Please check your connection and try again.',
      disclaimer: 'Your information is classified and heavily encrypted.'
    }
  },

  hq: {
    label: 'Gurgaon HEADQUARTERS',
    heading: 'Strategic ',
    headingHighlight: 'Decisions',
    description: 'Our primary command center orchestrates global operations, research, and strategic partnerships. Located in a secure facility designed for mission-critical coordination',
    websiteUrl: 'https://www.dynasas.com'
  },
  support: {
    label: 'OPERATION SUPPORT',
    heading: 'Direct Line ',
    headingHighlight: 'Command',
    description: 'urgent matters requiring immediate attention, bypass the standard transmission protocols and use our direct operational lines.',
    responseTime: '<= 15 Minutes'
  }
};
