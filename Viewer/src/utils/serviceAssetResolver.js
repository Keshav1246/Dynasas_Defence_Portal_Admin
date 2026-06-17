const SERVICE_PLACEHOLDER_IMAGES = {
  aerospace: '/assets/services/aerospace.jpg',
  cybersecurity: '/assets/services/cybersecurity.jpg',
  communications: '/assets/services/communications.jpg',
  surveillance: '/assets/services/surveillance.jpg',
  electronics: '/assets/services/electronics.jpg',
  commandControl: '/assets/services/command-control.jpg',
  default: '/assets/services/default.jpg'
};

const slugToImageMap = {
  'aerospace-engineering': SERVICE_PLACEHOLDER_IMAGES.aerospace,
  'cybersecurity-solutions': SERVICE_PLACEHOLDER_IMAGES.cybersecurity,
  'tactical-communications': SERVICE_PLACEHOLDER_IMAGES.communications,
  'surveillance-systems': SERVICE_PLACEHOLDER_IMAGES.surveillance,
  'defense-electronics': SERVICE_PLACEHOLDER_IMAGES.electronics,
  'command-control-systems': SERVICE_PLACEHOLDER_IMAGES.commandControl,
};

export const getServiceImage = (service) => {
  // Priority 1: CMS Service Image
  if (service?.image && service.image.trim() !== '') {
    // Basic check to see if URL looks somewhat valid (not just a broken string)
    // For a real prod app, you might use onError on the <img> tag as well.
    return service.image;
  }

  // Priority 2/3: Dummy/Placeholder Image based on slug or category
  if (service?.slug && slugToImageMap[service.slug]) {
    return slugToImageMap[service.slug];
  }

  // Fallback global service placeholder
  return SERVICE_PLACEHOLDER_IMAGES.default;
};
