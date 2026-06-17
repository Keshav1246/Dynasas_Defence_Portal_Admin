import React, { createContext, useState, useEffect } from 'react';
import { fetchAllWebsiteContent } from '../content/contentRepository';

export const WebsiteContentContext = createContext();

export const WebsiteContentProvider = ({ children }) => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadContent = async (forceRefresh = false) => {
    try {
      if (forceRefresh) {
          setIsLoading(true);
      }
      setError(null);
      
      const data = await fetchAllWebsiteContent(forceRefresh);
      setContent(data);
    } catch (err) {
      setError(err.message || "Failed to load website content.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const value = {
    content,
    isLoading,
    error,
    refreshContent: () => loadContent(true),
  };

  return (
    <WebsiteContentContext.Provider value={value}>
      {children}
    </WebsiteContentContext.Provider>
  );
};
