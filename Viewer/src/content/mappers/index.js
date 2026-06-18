import { DEFAULT_CONTENT } from '../defaultContent';
import { ABOUT_PAGE_DEFAULTS } from '../../data/aboutPageDefaults';
import { CONTACT_PAGE_DEFAULTS } from '../../data/contactPageDefaults';
export const mapSiteData = (settings) => {
  if (!settings) return null;
  return {
    siteName: settings.siteName || DEFAULT_CONTENT.SITE_NAME,
    siteDescription: settings.siteDescription || DEFAULT_CONTENT.SITE_DESCRIPTION,
    primaryLogo: settings.primaryLogo || null,
    darkLogo: settings.darkLogo || null,
    favicon: settings.favicon || null,
    typography: {
      heading: settings.headingFont || 'Inter, sans-serif',
      body: settings.bodyFont || 'Inter, sans-serif',
    },
    colors: {
      primary: settings.primaryColor || '#000000',
      accent: settings.accentColor || '#333333',
      backgroundDark: settings.backgroundDark || '#111111',
      text: settings.textColor || '#ffffff',
    },
    socialLinks: {
      linkedin: settings.linkedinUrl || null,
      twitter: settings.twitterUrl || null,
      youtube: settings.youtubeUrl || null,
      facebook: settings.facebookUrl || null,
      instagram: settings.instagramUrl || null,
    }
  };
};

export const mapHeroData = (homepage) => {
  if (!homepage) return null;
  return {
    badgeText: DEFAULT_CONTENT.BADGE_TEXT, // Missing field fallback
    title: homepage.heroTitle || DEFAULT_CONTENT.HERO_TITLE,
    subtitle: homepage.heroSubtitle || DEFAULT_CONTENT.HERO_SUBTITLE,
    backgroundImage: homepage.heroImage || null,
    backgroundVideo: null, // Missing field fallback
    primaryCTA: {
      text: homepage.ctaText || DEFAULT_CONTENT.HERO_CTA_PRIMARY,
      link: homepage.ctaLink || '/services',
    },
    secondaryCTA: {
      text: homepage.secondaryCtaText || DEFAULT_CONTENT.HERO_CTA_SECONDARY,
      link: homepage.secondaryCtaLink || '/contact',
    }
  };
};

export const mapServicesData = (homepage, services) => {
  return {
    sectionLabel: DEFAULT_CONTENT.SERVICES_LABEL, // Missing field fallback
    sectionTitle: homepage?.servicesSectionTitle || DEFAULT_CONTENT.SERVICES_TITLE,
    sectionDescription: homepage?.servicesSectionDescription || '',
    items: Array.isArray(services) ? services
      .filter(s => s.status === 'published' && s.isActive === true)
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
      .map((s, index) => ({
        id: s.id,
        number: String(index + 1).padStart(2, '0'),
        title: s.title,
        description: s.description,
        image: s.image || null,
        subtitle: s.subtitle || null,
        features: Array.isArray(s.features) ? s.features : [],
        ctaText: s.ctaText || null,
        ctaLink: s.ctaLink || null,
      })) : []
  };
};

export const mapAboutData = (profile, pillars) => {
  if (!profile) return null;
  
  const foundedYear = profile.foundedYear || ABOUT_PAGE_DEFAULTS.foundedYear;
  const currentYear = new Date().getFullYear();
  const calculatedYears = currentYear - parseInt(foundedYear, 10);
  const yearsOfLegacy = isNaN(calculatedYears) ? "25+" : `${calculatedYears}+`;

  return {
    sectionLabel: DEFAULT_CONTENT.ABOUT_LABEL, // Missing field fallback
    sectionTitle: profile.companyName || DEFAULT_CONTENT.ABOUT_TITLE,
    introduction: profile.overview || '',
    overview: profile.overview || ABOUT_PAGE_DEFAULTS.overview,
    mission: {
      title: profile.missionTitle || DEFAULT_CONTENT.MISSION_TITLE,
      statement: profile.missionStatement || '',
      pillars: Array.isArray(pillars) ? pillars.sort((a,b) => (a.displayOrder || 0) - (b.displayOrder || 0)).map(p => p.text) : []
    },
    vision: {
      title: profile.visionTitle || DEFAULT_CONTENT.VISION_TITLE,
      statement: profile.visionStatement || '',
    },
    details: {
      foundedYear: foundedYear,
      headquarters: profile.headquarters || ABOUT_PAGE_DEFAULTS.headquarters,
      yearsOfLegacy: yearsOfLegacy
    },
    media: null, // Missing field fallback
  };
};

export const mapStatisticsData = (homepage, stats) => {
  return {
    sectionTitle: homepage?.statisticsSectionTitle || '',
    items: Array.isArray(stats) ? stats
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
      .map(s => ({
        id: s.id,
        label: s.label,
        value: s.value,
      })) : []
  };
};

export const mapPartnersData = (partners) => {
  return {
    sectionLabel: DEFAULT_CONTENT.PARTNERS_LABEL, // Missing field fallback
    sectionTitle: DEFAULT_CONTENT.PARTNERS_TITLE, // Missing field fallback
    items: Array.isArray(partners) ? partners
      // Filter handled by backend endpoint, map everything received.
      .map(p => ({
        id: p.id,
        name: p.name,
        logo: p.logo || null,
        website: p.website || null,
        category: p.category || null,
      })) : []
  };
};

export const mapFooterData = (siteData, footerContent, companyProfile) => {
  const safeFooter = footerContent || {};
  return {
    logo: siteData?.primaryLogo || null,
    tagline: safeFooter.footerTagline || '',
    description: safeFooter.footerDescription || '',
    contact: {
      email: safeFooter.email || companyProfile?.generalEmail || '',
      phone: safeFooter.phone || companyProfile?.mainPhone || '',
      address: safeFooter.address || companyProfile?.mailingAddress || '',
    },
    links: {
      company: Array.isArray(safeFooter.companyLinks) ? safeFooter.companyLinks : [],
      solutions: Array.isArray(safeFooter.solutionLinks) ? safeFooter.solutionLinks : [],
      resources: Array.isArray(safeFooter.resourceLinks) ? safeFooter.resourceLinks : [],
      legal: Array.isArray(safeFooter.legalLinks) ? safeFooter.legalLinks : [],
    },
    copyright: `${DEFAULT_CONTENT.COPYRIGHT_PREFIX} ${new Date().getFullYear()} ${siteData?.siteName || DEFAULT_CONTENT.SITE_NAME}. All rights reserved.`
  };
};

export const mapContactData = (profile) => {
  if (!profile) return null;
  return {
    generalEmail: profile.generalEmail || CONTACT_PAGE_DEFAULTS.info.generalEmail,
    securityEmail: profile.securityEmail || CONTACT_PAGE_DEFAULTS.info.securityEmail,
    mainPhone: profile.mainPhone || CONTACT_PAGE_DEFAULTS.info.mainPhone,
    defenseContractsPhone: profile.defenseContractsPhone || CONTACT_PAGE_DEFAULTS.info.defenseContractsPhone,
    headquarters: profile.headquarters || CONTACT_PAGE_DEFAULTS.info.headquarters,
    mailingAddress: profile.mailingAddress || CONTACT_PAGE_DEFAULTS.hq.mailingAddress,
    website: profile.website || CONTACT_PAGE_DEFAULTS.hq.website
  };
};
