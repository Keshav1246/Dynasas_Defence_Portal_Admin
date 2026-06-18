import { apiClient } from '../api/client';
import {
  mapSiteData,
  mapHeroData,
  mapServicesData,
  mapAboutData,
  mapStatisticsData,
  mapPartnersData,
  mapFooterData,
  mapContactData
} from './mappers';
import {
  validateHeroData,
  validateServicesData,
  validateAboutData,
  validateStatisticsData,
  validatePartnersData,
  validateFooterData
} from '../utils/contentValidator';

// Basic in-memory cache to prevent redundant fetching during route transitions
let contentCache = null;
let lastFetchTime = null;
const CACHE_DURATION_MS = 0; // Disabled cache to allow instant updates from admin

export const fetchAllWebsiteContent = async (forceRefresh = false) => {
  const now = Date.now();
  if (!forceRefresh && contentCache && lastFetchTime && (now - lastFetchTime < CACHE_DURATION_MS)) {
    return contentCache;
  }

  try {
    // Fetch all required data in parallel
    const [
      settingsRes,
      homepageRes,
      footerRes,
      companyRes,
      statsRes,
      pillarsRes,
      servicesRes,
      partnersRes,
      servicesPageRes
    ] = await Promise.all([
      apiClient.get('/settings').catch(() => ({ data: {} })),
      apiClient.get('/cms/homepage').catch(() => ({ data: {} })),
      apiClient.get('/cms/footer').catch(() => ({ data: {} })),
      apiClient.get('/company-profile').catch(() => ({ data: {} })),
      apiClient.get('/company-profile/statistics').catch(() => ({ data: [] })),
      apiClient.get('/company-profile/pillars').catch(() => ({ data: [] })),
      apiClient.get('/services?status=published&limit=100').catch(() => ({ data: [] })),
      apiClient.get('/partners?status=ACTIVE&limit=100').catch(() => ({ data: [] })),
      apiClient.get('/cms/services-page').catch(() => ({ data: {} }))
    ]);

    // Extract inner data arrays/objects
    const rawSettings = settingsRes.data || {};
    const rawHomepage = homepageRes.data || {};
    const rawFooter = footerRes.data || {};
    const rawCompany = companyRes.data || {};
    const rawStats = statsRes.data || [];
    const rawPillars = pillarsRes.data || [];
    // Handle all possible API response structures for services
    let rawServices = [];
    if (Array.isArray(servicesRes)) {
      rawServices = servicesRes;
    } else if (servicesRes && Array.isArray(servicesRes.data)) {
      rawServices = servicesRes.data;
    } else if (servicesRes && servicesRes.data && Array.isArray(servicesRes.data.data)) {
      rawServices = servicesRes.data.data;
    } else if (servicesRes && Array.isArray(servicesRes.services)) {
      rawServices = servicesRes.services;
    }
    

    const rawPartners = partnersRes.data || [];
    const rawServicesPage = servicesPageRes.data || {};

    // Map to frontend-safe structures
    const siteData = mapSiteData(rawSettings);
    
    // Add SEO Data object populated from Settings
    const seoData = {
      title: siteData?.siteName || 'Dynasas',
      description: siteData?.siteDescription || 'Advanced Defense & Aerospace Solutions',
      favicon: siteData?.favicon || null
    };

    // Add Site Structure object
    const siteStructure = {
      sectionOrder: rawHomepage.sectionOrder || ['hero', 'services', 'statistics']
    };

    // Validate and build final structure
    const mappedContent = {
  seoData,
  siteStructure,
  siteData,

  heroData: validateHeroData(mapHeroData(rawHomepage)),

  servicesData: validateServicesData(
    mapServicesData(rawHomepage, rawServices)
  ),

  aboutData: validateAboutData(
    mapAboutData(rawCompany, rawPillars)
  ),

  statisticsData: validateStatisticsData(
    mapStatisticsData(rawHomepage, rawStats)
  ),

  partnersData: validatePartnersData(
    mapPartnersData(rawHomepage, rawPartners)
  ),

  servicesPageData: rawServicesPage,

  contactData: mapContactData(rawCompany),

  footerData: validateFooterData(
    mapFooterData(siteData, rawFooter, rawCompany)
  ),
};
    contentCache = mappedContent;
    lastFetchTime = now;

    return mappedContent;

  } catch (error) {
    console.error("Failed to fetch website content architecture:", error);
    throw error;
  }
};

// Force HMR cache flush
