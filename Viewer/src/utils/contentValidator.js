import { CONTENT_DEFAULTS } from '../constants/contentDefaults';
import { getSafeImageUrl } from './assetResolver';

const safeString = (val, fallback) => (val && typeof val === 'string' && val.trim() !== '' ? val : fallback);
const safeArray = (val) => (Array.isArray(val) ? val : []);

export const validateHeroData = (data) => {
  const safeData = data || {};
  return {
    badgeText: safeString(safeData.badgeText, CONTENT_DEFAULTS.hero.badgeText),
    title: safeString(safeData.title, CONTENT_DEFAULTS.hero.title),
    subtitle: safeString(safeData.subtitle, CONTENT_DEFAULTS.hero.subtitle),
    backgroundImage: getSafeImageUrl(safeData.backgroundImage, null),
    backgroundVideo: getSafeImageUrl(safeData.backgroundVideo, null),
    primaryCTA: {
      text: safeString(safeData.primaryCTA?.text, CONTENT_DEFAULTS.hero.primaryCTA),
      link: safeString(safeData.primaryCTA?.link, '/services'),
    },
    secondaryCTA: {
      text: safeString(safeData.secondaryCTA?.text, CONTENT_DEFAULTS.hero.secondaryCTA),
      link: safeString(safeData.secondaryCTA?.link, '/contact'),
    }
  };
};

export const validateServicesData = (data) => {
  const safeData = data || {};
  return {
    sectionLabel: safeString(safeData.sectionLabel, CONTENT_DEFAULTS.services.sectionLabel),
    sectionTitle: safeString(safeData.sectionTitle, CONTENT_DEFAULTS.services.sectionTitle),
    sectionDescription: safeString(safeData.sectionDescription, CONTENT_DEFAULTS.services.sectionDescription),
    items: safeArray(safeData.items).map(item => ({
      ...item,
      title: safeString(item.title, "Service Title"),
      description: safeString(item.description, "Service Description"),
      image: getSafeImageUrl(item.image, null),
      subtitle: safeString(item.subtitle, ""),
      features: safeArray(item.features),
      ctaText: safeString(item.ctaText, ""),
      ctaLink: safeString(item.ctaLink, "")
    }))
  };
};

export const validateAboutData = (data) => {
  const safeData = data || {};
  return {
    sectionLabel: safeString(safeData.sectionLabel, CONTENT_DEFAULTS.about.sectionLabel),
    sectionTitle: safeString(safeData.sectionTitle, CONTENT_DEFAULTS.about.sectionTitle),
    introduction: safeString(safeData.introduction, ""),
    mission: {
      title: safeString(safeData.mission?.title, CONTENT_DEFAULTS.about.missionTitle),
      statement: safeString(safeData.mission?.statement, ""),
      pillars: safeArray(safeData.mission?.pillars)
    },
    vision: {
      title: safeString(safeData.vision?.title, CONTENT_DEFAULTS.about.visionTitle),
      statement: safeString(safeData.vision?.statement, "")
    },
    details: {
      foundedYear: safeData.details?.foundedYear || null,
      headquarters: safeData.details?.headquarters || null
    },
    media: getSafeImageUrl(safeData.media, null)
  };
};

export const validateStatisticsData = (data) => {
  const safeData = data || {};
  return {
    sectionTitle: safeString(safeData.sectionTitle, ""),
    items: safeArray(safeData.items).map(item => ({
      ...item,
      label: safeString(item.label, "Statistic"),
      value: safeString(item.value, "0")
    }))
  };
};

export const validatePartnersData = (data) => {
  const safeData = data || {};
  return {
    sectionLabel: safeString(safeData.sectionLabel, CONTENT_DEFAULTS.partners.sectionLabel),
    sectionTitle: safeString(safeData.sectionTitle, CONTENT_DEFAULTS.partners.sectionTitle),
    items: safeArray(safeData.items).map(item => ({
      ...item,
      name: safeString(item.name, "Partner"),
      logo: getSafeImageUrl(item.logo, null),
      website: safeString(item.website, null),
      category: safeString(item.category, null)
    }))
  };
};

export const validateFooterData = (data) => {
  const safeData = data || {};
  return {
    logo: safeData.logo || null,
    tagline: safeString(safeData.tagline, CONTENT_DEFAULTS.footer.footerTagline),
    description: safeString(safeData.description, CONTENT_DEFAULTS.footer.footerDescription),
    contact: {
      email: safeString(safeData.contact?.email, ""),
      phone: safeString(safeData.contact?.phone, ""),
      address: safeString(safeData.contact?.address, "")
    },
    links: {
      company: safeArray(safeData.links?.company),
      solutions: safeArray(safeData.links?.solutions),
      resources: safeArray(safeData.links?.resources),
      legal: safeArray(safeData.links?.legal)
    },
    copyright: safeString(safeData.copyright, CONTENT_DEFAULTS.footer.copyrightPrefix)
  };
};
