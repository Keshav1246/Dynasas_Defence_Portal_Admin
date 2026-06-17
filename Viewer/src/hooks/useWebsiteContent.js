import { useContext } from 'react';
import { WebsiteContentContext } from '../context/WebsiteContentProvider';

export const useWebsiteContent = () => {
  const context = useContext(WebsiteContentContext);
  if (!context) {
    throw new Error('useWebsiteContent must be used within a WebsiteContentProvider');
  }
  return context;
};
