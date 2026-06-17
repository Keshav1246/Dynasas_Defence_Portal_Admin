import { brand } from '../config/brand';

const FALLBACK_COLORS = {
  primary: "#F15A24",
  primaryHover: "#E14B12",
  accent: "#FF7A45",
  black: "#0A0A0A",
  dark: "#111111",
  darkSecondary: "#181818",
  white: "#FFFFFF",
  lightGray: "#F5F5F5",
  gray: "#9CA3AF",
  border: "rgba(255,255,255,0.08)"
};

export const getThemeColors = (cmsData = {}) => {
  return {
    primary: cmsData.primaryColor || brand.colors.primary || FALLBACK_COLORS.primary,
    primaryHover: cmsData.primaryHoverColor || brand.colors.primaryHover || FALLBACK_COLORS.primaryHover,
    accent: cmsData.accentColor || brand.colors.accent || FALLBACK_COLORS.accent,
    black: cmsData.blackColor || brand.colors.black || FALLBACK_COLORS.black,
    dark: cmsData.darkColor || brand.colors.dark || FALLBACK_COLORS.dark,
    darkSecondary: cmsData.darkSecondaryColor || brand.colors.darkSecondary || FALLBACK_COLORS.darkSecondary,
    white: cmsData.whiteColor || brand.colors.white || FALLBACK_COLORS.white,
    lightGray: cmsData.lightGrayColor || brand.colors.lightGray || FALLBACK_COLORS.lightGray,
    gray: cmsData.grayColor || brand.colors.gray || FALLBACK_COLORS.gray,
    border: cmsData.borderColor || brand.colors.border || FALLBACK_COLORS.border
  };
};

export const getTypography = (cmsData = {}) => {
  return {
    heading: cmsData.headingFont || brand.typography.heading || "'Space Grotesk', sans-serif",
    body: cmsData.bodyFont || brand.typography.body || "'Inter', sans-serif"
  };
};

export const applyThemeToDOM = (cmsData = {}) => {
  const colors = getThemeColors(cmsData);
  const typography = getTypography(cmsData);

  const root = document.documentElement;

  // Add colors to CSS variables
  Object.keys(colors).forEach(key => {
    // Convert camelCase to kebab-case
    const kebabKey = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
    root.style.setProperty(`--color-brand-${kebabKey}`, colors[key]);
  });

  // Add typography to CSS variables
  root.style.setProperty('--font-heading', typography.heading);
  root.style.setProperty('--font-body', typography.body);
};
