import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { WebsiteContentProvider } from './context/WebsiteContentProvider';
import { useWebsiteContent } from './hooks/useWebsiteContent';
import HomePage from './pages/HomePage';
import StartupLoader from './components/loaders/StartupLoader';
import GridBackground from './components/layout/GridBackground';
import { applyThemeToDOM } from './utils/themeEngine';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';

function AppContent() {
  const { isLoading, content } = useWebsiteContent();
  const [showLoader, setShowLoader] = useState(true);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    const minTimer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 2000);

    const maxTimer = setTimeout(() => {
      setShowLoader(false);
    }, 8000);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, []);

  useEffect(() => {
    if (minTimeElapsed && !isLoading) {
      setShowLoader(false);
    }
  }, [minTimeElapsed, isLoading]);

  useEffect(() => {
    if (content?.siteData) {
      applyThemeToDOM(content.siteData);
    } else {
      applyThemeToDOM({});
    }
  }, [content?.siteData]);

  return (
    <AnimatePresence mode="wait">
      {showLoader ? (
        <StartupLoader key="loader" />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="min-h-screen relative"
        >
          <GridBackground />
          <div className="relative z-10">
            <BrowserRouter>
              <Routes>
                {/* Public Website Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:slug" element={<ServiceDetailPage />} />
                
                {/* Fallback for other non-implemented routes yet */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </BrowserRouter>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <WebsiteContentProvider>
      <AppContent />
    </WebsiteContentProvider>
  );
}

export default App;