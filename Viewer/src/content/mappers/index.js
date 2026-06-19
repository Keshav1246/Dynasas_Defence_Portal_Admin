import {
  DEFAULT_ASSETS,
  DEFAULT_THEME,
  DEFAULT_SEO,
  DEFAULT_HOMEPAGE,
  DEFAULT_ABOUT,
  DEFAULT_CONTACT,
  DEFAULT_SERVICES,
  DEFAULT_PARTNERS_PAGE,
  withFallback,
  withArrayFallback,
  withObjectFallback
} from '../../defaults';

export const mapSiteData = (settings) => {
  const safeSettings = settings || {};
  return {
    siteName: withFallback(safeSettings.siteName, 'Dynasas'),
    siteDescription: withFallback(safeSettings.siteDescription, DEFAULT_SEO.description),
    primaryLogo: withFallback(safeSettings.primaryLogo, DEFAULT_ASSETS.PRIMARY_LOGO),
    darkLogo: withFallback(safeSettings.darkLogo, DEFAULT_ASSETS.DARK_LOGO),
    favicon: withFallback(safeSettings.favicon, DEFAULT_ASSETS.FAVICON),
    typography: {
      heading: withFallback(safeSettings.headingFont, DEFAULT_THEME.typography.heading),
      body: withFallback(safeSettings.bodyFont, DEFAULT_THEME.typography.body),
    },
    colors: {
      primary: withFallback(safeSettings.primaryColor, DEFAULT_THEME.colors.primary),
      accent: withFallback(safeSettings.accentColor, DEFAULT_THEME.colors.accent),
      backgroundDark: withFallback(safeSettings.backgroundDark, DEFAULT_THEME.colors.backgroundDark),
      text: withFallback(safeSettings.textColor, DEFAULT_THEME.colors.text),
    },
    socialLinks: {
      linkedin: withFallback(safeSettings.linkedinUrl, '#'),
      twitter: withFallback(safeSettings.twitterUrl, '#'),
      youtube: withFallback(safeSettings.youtubeUrl, '#'),
      facebook: withFallback(safeSettings.facebookUrl, '#'),
      instagram: withFallback(safeSettings.instagramUrl, '#'),
    }
  };
};

export const mapHeroData = (homepage) => {
  const safeHomepage = homepage || {};
  return {
    badgeText: withFallback(safeHomepage.badgeText, DEFAULT_HOMEPAGE.hero.badgeText),
    heroTitle: withFallback(safeHomepage.heroTitle, DEFAULT_HOMEPAGE.hero.title),
    heroSubtitle: withFallback(safeHomepage.heroSubtitle, DEFAULT_HOMEPAGE.hero.subtitle),
    heroDescription: withFallback(safeHomepage.heroDescription, DEFAULT_HOMEPAGE.hero.description),
    trustBarItems: withArrayFallback(safeHomepage.trustBarItems, DEFAULT_HOMEPAGE.hero.trustBarItems),
    backgroundImage: DEFAULT_HOMEPAGE.hero.backgroundImage,
    backgroundVideo: null,
    primaryCTA: {
      text: withFallback(safeHomepage.ctaText, DEFAULT_HOMEPAGE.hero.primaryCTA.text),
      link: withFallback(safeHomepage.ctaLink, DEFAULT_HOMEPAGE.hero.primaryCTA.link),
    },
    secondaryCTA: {
      text: withFallback(safeHomepage.secondaryCtaText, DEFAULT_HOMEPAGE.hero.secondaryCTA.text),
      link: withFallback(safeHomepage.secondaryCtaLink, DEFAULT_HOMEPAGE.hero.secondaryCTA.link),
    }
  };
};

export const mapServicesData = (homepage, services) => {
  const safeHomepage = homepage || {};

  const mappedServices =
    Array.isArray(services) && services.length > 0
      ? services
        .filter(
          s =>
            s.status === 'published' &&
            (s.isActive === true || s.isActive === undefined)
        )
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
        .map((s, index) => ({
          id: s.id,
          number: String(index + 1).padStart(2, '0'),
          title: s.title,
          description: s.description,

          image: withFallback(
            s.image,
            DEFAULT_ASSETS.IMAGE_PLACEHOLDER
          ),

          subtitle: s.subtitle || null,

          features: Array.isArray(s.features)
            ? s.features
            : [],

          ctaText: s.ctaText || null,

          ctaLink: s.ctaLink || null,
        }))
      : DEFAULT_SERVICES;

  return {
    sectionLabel: withFallback(
      safeHomepage.servicesSectionLabel,
      DEFAULT_HOMEPAGE.services.sectionLabel
    ),

    sectionTitle: withFallback(
      safeHomepage.servicesSectionTitle,
      DEFAULT_HOMEPAGE.services.sectionTitle
    ),

    sectionDescription: withFallback(
      safeHomepage.servicesSectionDescription,
      DEFAULT_HOMEPAGE.services.sectionDescription
    ),

    items: mappedServices,
  };

};

export const mapAboutData = (profile, pillars) => {
  const safeProfile = profile || {};
  const foundedYear = withFallback(safeProfile.foundedYear, DEFAULT_ABOUT.foundedYear);
  const currentYear = new Date().getFullYear();
  const calculatedYears = currentYear - parseInt(foundedYear, 10);
  const yearsOfLegacy = isNaN(calculatedYears) ? "25+" : `${calculatedYears}+`;

  return {
    sectionLabel: withFallback(safeProfile.sectionLabel, DEFAULT_HOMEPAGE.about.sectionLabel),
    sectionTitle: withFallback(safeProfile.companyName, DEFAULT_HOMEPAGE.about.sectionTitle),
    companyOverview: withFallback(safeProfile.overview, DEFAULT_ABOUT.overview),
    foundedYear: foundedYear,
    headquarters: withFallback(safeProfile.headquarters, DEFAULT_ABOUT.headquarters),
    introduction: withFallback(safeProfile.overview, DEFAULT_ABOUT.overview),
    overview: withFallback(safeProfile.overview, DEFAULT_ABOUT.overview),
    mission: {
      title: withFallback(safeProfile.missionTitle, DEFAULT_HOMEPAGE.mission.title),
      statement: withFallback(safeProfile.missionStatement, DEFAULT_HOMEPAGE.mission.statement),
      items: withArrayFallback(
        Array.isArray(pillars) ? pillars.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)).map(p => p.text) : [],
        DEFAULT_HOMEPAGE.mission.items
      ),
      listTitle: DEFAULT_HOMEPAGE.mission.listTitle
    },
    vision: {
      title: withFallback(safeProfile.visionTitle, DEFAULT_HOMEPAGE.vision.title),
      statement: withFallback(safeProfile.visionStatement, DEFAULT_HOMEPAGE.vision.statement),
      items: withArrayFallback(safeProfile.visionFuturePriorities, DEFAULT_HOMEPAGE.vision.items),
      listTitle: DEFAULT_HOMEPAGE.vision.listTitle
    },
    details: {
      foundedYear: foundedYear,
      headquarters: withFallback(safeProfile.headquarters, DEFAULT_ABOUT.headquarters),
      yearsOfLegacy: yearsOfLegacy
    },
    snapshot: DEFAULT_ABOUT.snapshot,
    hero: DEFAULT_ABOUT.hero,
    media: null,
  };
};

export const mapStatisticsData = (homepage, stats) => {
  const safeHomepage = homepage || {};
  const mappedStats = Array.isArray(stats) && stats.length > 0
    ? stats.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)).map(s => ({
      id: s.id,
      label: s.label,
      value: s.value,
    }))
    : DEFAULT_HOMEPAGE.statistics.items;

  return {
    sectionTitle: withFallback(safeHomepage.statisticsSectionTitle, DEFAULT_HOMEPAGE.statistics.sectionTitle),
    items: mappedStats
  };
};

export const mapPartnersData = (homepage, partners) => {
  const safeHomepage = homepage || {};
  const mappedPartners = Array.isArray(partners) && partners.length > 0
    ? partners.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)).map(p => ({
      id: p.id,
      name: p.name,
      description: p.description || null,
      logo: withFallback(p.logo, DEFAULT_ASSETS.LOGO_PLACEHOLDER),
      website: withFallback(p.website, '#'),
      category: p.category || null,
    }))
    : []; // Partners block can legitimately have empty items, handled by component

  return {
    sectionLabel: withFallback(safeHomepage.partnersSectionLabel, DEFAULT_HOMEPAGE.partners.sectionLabel),
    sectionTitle: withFallback(safeHomepage.partnersSectionTitle, DEFAULT_HOMEPAGE.partners.sectionTitle),
    sectionDescription: withFallback(safeHomepage.partnersSectionDescription, DEFAULT_HOMEPAGE.partners.sectionDescription),
    ctaText: withFallback(safeHomepage.partnersButtonText, DEFAULT_HOMEPAGE.partners.ctaText),
    ctaLink: withFallback(safeHomepage.partnersButtonLink, DEFAULT_HOMEPAGE.partners.ctaLink),
    items: mappedPartners
  };
};

export const mapPartnersPageData = (homepage, partners) => {
  // TODO: Future Implementation
  // Once a dedicated `PartnersPageContent` model is created in the backend CMS, 
  // this function should accept `partnersPageContent` instead of `homepage`.
  // For now, we reuse the Homepage partner section fields to drive the dedicated page hero.
  
  const safeHomepage = homepage || {};
  const mappedPartners = Array.isArray(partners) && partners.length > 0
    ? partners
        .filter(p => p.status === 'ACTIVE' && !p.isDeleted)
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
        .map(p => ({
          id: p.id,
          name: p.name,
          description: p.description || null,
          logo: withFallback(p.logo, DEFAULT_ASSETS.LOGO_PLACEHOLDER),
          website: withFallback(p.website, null), // Changed to null instead of #
        }))
    : [];

  return {
    hero: {
      sectionLabel: withFallback(safeHomepage.partnersSectionLabel, DEFAULT_PARTNERS_PAGE.hero.sectionLabel),
      sectionTitle: withFallback(safeHomepage.partnersSectionTitle, DEFAULT_PARTNERS_PAGE.hero.sectionTitle),
      sectionDescription: withFallback(safeHomepage.partnersSectionDescription, DEFAULT_PARTNERS_PAGE.hero.sectionDescription),
    },
    items: mappedPartners
  };
};

export const mapFooterData = (siteData, footerContent, companyProfile, rawServices) => {
  const safeFooter = footerContent || {};
  const safeSiteData = siteData || {};
  const safeProfile = companyProfile || {};

  const parseLink = (linkString) => {
    if (!linkString) return { label: '', url: '#' };
    const parts = linkString.split('|');
    return {
      label: parts[0]?.trim() || linkString,
      url: parts[1]?.trim() || '#'
    };
  };

  const createSlug = (title) => {
    if (!title) return '';
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const mappedSolutions = Array.isArray(rawServices) && rawServices.length > 0
    ? rawServices
        .filter(s => s.status === 'published' && (s.isActive === true || s.isActive === undefined))
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
        .map(s => ({
          label: s.title,
          url: `/services/${createSlug(s.title)}`
        }))
    : withArrayFallback(safeFooter.solutionLinks, []).map(parseLink);

  return {
    logo: withFallback(safeSiteData.primaryLogo, DEFAULT_ASSETS.PRIMARY_LOGO),
    tagline: withFallback(safeFooter.footerTagline, DEFAULT_SEO.description),
    description: withFallback(safeFooter.footerDescription, DEFAULT_SEO.description),
    contact: {
      email: withFallback(safeFooter.email || safeProfile.generalEmail, DEFAULT_CONTACT.generalEmail),
      phone: withFallback(safeFooter.phone || safeProfile.mainPhone, DEFAULT_CONTACT.mainPhone),
      address: withFallback(safeFooter.address || safeProfile.mailingAddress, DEFAULT_CONTACT.mailingAddress),
    },
    links: {
      company: withArrayFallback(safeFooter.companyLinks, []).map(parseLink),
      solutions: mappedSolutions,
      resources: withArrayFallback(safeFooter.resourceLinks, []).map(parseLink),
      legal: withArrayFallback(safeFooter.legalLinks, []).map(parseLink),
    },
    copyright: `© ${new Date().getFullYear()} ${withFallback(safeSiteData.siteName, 'Dynasas')}. All rights reserved.`
  };
};

export const mapContactData = (profile) => {
  const safeProfile = profile || {};
  return {
    generalEmail: withFallback(safeProfile.generalEmail, DEFAULT_CONTACT.generalEmail),
    securityEmail: withFallback(safeProfile.securityEmail, DEFAULT_CONTACT.securityEmail),
    mainPhone: withFallback(safeProfile.mainPhone, DEFAULT_CONTACT.mainPhone),
    defenseContractsPhone: withFallback(safeProfile.defenseContractsPhone, DEFAULT_CONTACT.defenseContractsPhone),
    headquarters: withFallback(safeProfile.headquarters, DEFAULT_CONTACT.headquarters),
    mailingAddress: withFallback(safeProfile.mailingAddress, DEFAULT_CONTACT.mailingAddress),
    website: withFallback(safeProfile.website, DEFAULT_CONTACT.website),
    hero: DEFAULT_CONTACT.hero,
    offices: DEFAULT_CONTACT.offices,
    form: DEFAULT_CONTACT.form,
    hq: DEFAULT_CONTACT.hq,
    support: DEFAULT_CONTACT.support
  };
};
