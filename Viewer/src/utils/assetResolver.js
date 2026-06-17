import { brand } from '../config/brand';

export const getLogo = (cmsData = {}, isDark = false) => {
  if (isDark && cmsData.darkLogo) return cmsData.darkLogo;
  if (cmsData.primaryLogo) return cmsData.primaryLogo;
  if (brand.logo) return brand.logo;
  return null; // Handled as Text fallback ("Dynasas") in component
};

export const getFavicon = (cmsData = {}) => {
  if (cmsData.favicon) return cmsData.favicon;
  if (brand.favicon) return brand.favicon;
  return '/assets/favicon.png'; // Safe ultimate fallback
};

export const getSafeImageUrl = (url, fallback = null) => {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return fallback;
  }
  return url;
};
