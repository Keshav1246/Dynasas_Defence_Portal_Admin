import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Loader2, RefreshCcw } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ModuleSidebar from '../components/content/ModuleSidebar';
import HeroEditor from '../components/content/HeroEditor';
import ServicesEditor from '../components/content/ServicesEditor';
import StatisticsEditor from '../components/content/StatisticsEditor';
import TrustBarEditor from '../components/content/TrustBarEditor';
import PartnersEditor from '../components/content/PartnersEditor';
import LivePreview from '../components/content/LivePreview';

import { getHomepageContent, createHomepageContent, updateHomepageContent, getServicesPageContent, createServicesPageContent, updateServicesPageContent } from '../services/cms.service';
import { getServices, createService, updateService, deleteService } from '../services/services.service';
import { getStatistics, createStatistic, updateStatistic, deleteStatistic } from '../services/companyProfile.service';

const ContentManagementPage = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [contentData, setContentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const refreshData = useCallback(async () => {
    try {
      setError(null);
      
      const [homepageRes, servicesRes, statsRes, servicesPageRes] = await Promise.all([
        getHomepageContent().catch(() => null),
        getServices({ limit: 100 }).catch(() => ({ data: [] })),
        getStatistics().catch(() => []),
        getServicesPageContent().catch(() => null)
      ]);

      const homepage = homepageRes || {};
      const servicesPageContent = servicesPageRes || {};
      const services = Array.isArray(servicesRes?.data) ? servicesRes.data : [];
      const stats = Array.isArray(statsRes) ? statsRes : [];

      // Sort lists by displayOrder
      services.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
      stats.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

      setContentData({
        homepageId: homepage.id || null,
        hero: {
          heroTitle: homepage.heroTitle || '',
          heroSubtitle: homepage.heroSubtitle || '',
          heroDescription: homepage.heroDescription || '',
          heroImage: homepage.heroImage || '',
          ctaText: homepage.ctaText || '',
          ctaLink: homepage.ctaLink || '',
          secondaryCtaText: homepage.secondaryCtaText || '',
          secondaryCtaLink: homepage.secondaryCtaLink || '',
        },
trustBar: {
  items: (homepage.trustBarItems || []).map((val, i) => ({
    id: `db-${i}`,
    value: val
  }))
},

servicesPageId: servicesPageContent.id || null,
        services: {
          sectionTitle: homepage.servicesSectionTitle || '',
          sectionDescription: homepage.servicesSectionDescription || '',
          heroLabel: servicesPageContent.heroLabel || '',
          heroTitle: servicesPageContent.heroTitle || '',
          heroDescription: servicesPageContent.heroDescription || '',
          servicesNavigatorTitle: servicesPageContent.servicesNavigatorTitle || '',
          servicesList: services.map(s => ({ id: s.id, text: s.title, ...s }))
        },
        statistics: {
          sectionTitle: homepage.statisticsSectionTitle || '',
          statsList: stats.map(s => ({ id: s.id, value: s.value, label: s.label, ...s }))
        },
        partners: {
          partnersSectionLabel: homepage.partnersSectionLabel || '',
          partnersSectionTitle: homepage.partnersSectionTitle || '',
          partnersSectionDescription: homepage.partnersSectionDescription || '',
          partnersButtonText: homepage.partnersButtonText || '',
          partnersButtonLink: homepage.partnersButtonLink || '',
        },
        sectionOrder: homepage.sectionOrder || ["hero", "services", "statistics"]
      });
    } catch (err) {
      setError(err.message || 'Failed to load content management data');
      toast.error('Failed to load content management data');
    }
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    await refreshData();
    setIsLoading(false);
  }, [refreshData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSaveHero = async (sectionData) => {
    try {
      setIsSaving(true);
      const payload = {
        heroTitle: sectionData.heroTitle,
        heroSubtitle: sectionData.heroSubtitle,
        heroDescription: sectionData.heroDescription,
        heroImage: sectionData.heroImage,
        ctaText: sectionData.ctaText,
        ctaLink: sectionData.ctaLink,
        secondaryCtaText: sectionData.secondaryCtaText,
        secondaryCtaLink: sectionData.secondaryCtaLink,
      };

      if (contentData.homepageId) {
        await updateHomepageContent(contentData.homepageId, payload);
      } else {
        await createHomepageContent(payload);
      }

      toast.success("Hero Section updated successfully");
      await refreshData();
    } catch (err) {
      toast.error(err.message || "Failed to update Hero Section");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveTrustBar = async (sectionData) => {
    try {
      setIsSaving(true);
      const payload = {
        trustBarItems: sectionData.items.map(item => item.value),
      };

      if (contentData.homepageId) {
        await updateHomepageContent(contentData.homepageId, payload);
      } else {
        await createHomepageContent(payload);
      }

      toast.success("Trust Bar Section updated successfully");
      await refreshData();
    } catch (err) {
      toast.error(err.message || "Failed to update Trust Bar Section");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveServices = async (sectionData) => {
    try {
      setIsSaving(true);
      
      
      const metaPayload = {
        servicesSectionTitle: sectionData.sectionTitle,
        servicesSectionDescription: sectionData.sectionDescription,
      };
      
      const pagePayload = {
        heroLabel: sectionData.heroLabel,
        heroTitle: sectionData.heroTitle,
        heroDescription: sectionData.heroDescription,
        servicesNavigatorTitle: sectionData.servicesNavigatorTitle,
      };

      if (contentData.homepageId) {
        await updateHomepageContent(contentData.homepageId, metaPayload);
      } else {
        await createHomepageContent(metaPayload);
      }
      
      if (contentData.servicesPageId) {
        await updateServicesPageContent(contentData.servicesPageId, pagePayload);
      } else {
        await createServicesPageContent(pagePayload);
      }


      const originalMap = new Map(contentData.services.servicesList.map(s => [s.id, s]));
      const currentMap = new Map(sectionData.servicesList.map(s => [s.id, s]));

      const toDelete = contentData.services.servicesList.filter(s => !currentMap.has(s.id));
      for (const s of toDelete) {
        if (!String(s.id).startsWith('temp-')) {
          await deleteService(s.id);
        }
      }

      for (let i = 0; i < sectionData.servicesList.length; i++) {
        const current = sectionData.servicesList[i];
        const payload = { 
          title: current.text, 
          description: current.description || 'Description pending',
          status: current.status || 'draft',
          displayOrder: i + 1 
        };
        
        if (String(current.id).startsWith('temp-')) {
          if (current.text.trim()) await createService(payload);
        } else {
          const original = originalMap.get(current.id);
          if (original && (original.text !== current.text || original.displayOrder !== (i + 1))) {
            await updateService(current.id, payload);
          }
        }
      }

      toast.success("Services section updated successfully");
      await refreshData();
    } catch (err) {
      toast.error(err.message || "Failed to update services section");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveStatistics = async (sectionData) => {
    try {
      setIsSaving(true);
      
      const metaPayload = {
        statisticsSectionTitle: sectionData.sectionTitle,
      };

      if (contentData.homepageId) {
        await updateHomepageContent(contentData.homepageId, metaPayload);
      } else {
        await createHomepageContent(metaPayload);
      }

      const originalMap = new Map(contentData.statistics.statsList.map(s => [s.id, s]));
      const currentMap = new Map(sectionData.statsList.map(s => [s.id, s]));

      const toDelete = contentData.statistics.statsList.filter(s => !currentMap.has(s.id));
      for (const s of toDelete) {
        if (!String(s.id).startsWith('temp-')) {
          await deleteStatistic(s.id);
        }
      }

      for (let i = 0; i < sectionData.statsList.length; i++) {
        const current = sectionData.statsList[i];
        const payload = { 
          label: current.label, 
          value: current.value,
          displayOrder: i + 1 
        };
        
        if (String(current.id).startsWith('temp-')) {
          if (current.label.trim() && current.value.trim()) await createStatistic(payload);
        } else {
          const original = originalMap.get(current.id);
          if (original && (original.label !== current.label || original.value !== current.value || original.displayOrder !== (i + 1))) {
            await updateStatistic(current.id, payload);
          }
        }
      }

      toast.success("Statistics section updated successfully");
      await refreshData();
    } catch (err) {
      toast.error(err.message || "Failed to update statistics section");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePartners = async (sectionData) => {
    try {
      setIsSaving(true);
      if (contentData.homepageId) {
        await updateHomepageContent(contentData.homepageId, sectionData);
      } else {
        await createHomepageContent(sectionData);
      }
      toast.success("Partners section updated successfully");
      await refreshData();
    } catch (err) {
      toast.error(err.message || "Failed to update partners section");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveContent = async (sectionKey, sectionData) => {
    if (sectionKey === 'hero') {
      await handleSaveHero(sectionData);
    } else if (sectionKey === 'trustBar') {
      await handleSaveTrustBar(sectionData);
    } else if (sectionKey === 'services') {
      await handleSaveServices(sectionData);
    } else if (sectionKey === 'statistics') {
      await handleSaveStatistics(sectionData);
    } else if (sectionKey === 'partners') {
      await handleSavePartners(sectionData);
    } else {
      console.log(`Save triggered for ${sectionKey}, but saving is disabled in Step 4.`, sectionData);
      toast.success(`Data fetching verified! Save functionality for ${sectionKey} is deferred.`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
        <p className="text-sm font-medium text-gray-500">Loading content management...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="text-rose-500 bg-rose-50 p-3 rounded-full">
          <RefreshCcw className="w-6 h-6" />
        </div>
        <p className="text-sm font-medium text-gray-700">{error}</p>
        <button 
          onClick={fetchData}
          className="px-4 py-2 mt-2 text-sm font-semibold text-white bg-orange-500 rounded-xl hover:bg-orange-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const renderActiveEditor = () => {
    switch (activeTab) {
      case 'hero':
        return <HeroEditor data={contentData.hero} onSave={handleSaveContent} isSaving={isSaving} />;
      case 'trustBar':
        return <TrustBarEditor data={contentData.trustBar} onSave={handleSaveContent} isSaving={isSaving} />;
      case 'services':
        return <ServicesEditor data={contentData.services} onSave={handleSaveContent} isSaving={isSaving} />;
      case 'statistics':
        return <StatisticsEditor data={contentData.statistics} onSave={handleSaveContent} isSaving={isSaving} />;
      case 'partners':
        return <PartnersEditor data={contentData.partners} onSave={handleSaveContent} isSaving={isSaving} />;
      default:
        return <HeroEditor data={contentData.hero} onSave={handleSaveContent} isSaving={isSaving} />;
    }
  };

  return (
    <>
      <PageHeader
        title="Content Management"
        subtitle="Edit homepage modules and manage published content sections."
      />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <ModuleSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          sectionOrder={contentData.sectionOrder}
        />
        
        {renderActiveEditor()}
        
        <LivePreview heroData={contentData.hero} />
      </div>
    </>
  );
};

export default ContentManagementPage;
