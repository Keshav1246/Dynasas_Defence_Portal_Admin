import { useEffect } from 'react';

const SEOManager = ({ seoData }) => {
  useEffect(() => {
    if (!seoData) return;

    if (seoData.title) {
      document.title = seoData.title;
    }

    if (seoData.description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = seoData.description;
    }

    if (seoData.favicon) {
      let linkFavicon = document.querySelector('link[rel="icon"]');
      if (!linkFavicon) {
        linkFavicon = document.createElement('link');
        linkFavicon.rel = 'icon';
        document.head.appendChild(linkFavicon);
      }
      linkFavicon.href = seoData.favicon;
    }
  }, [seoData]);

  return null;
};

export default SEOManager;
