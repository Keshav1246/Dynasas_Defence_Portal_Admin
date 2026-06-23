import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from '../components/PageHeader';
import CompanyProfileSidebar from '../components/company-profile/CompanyProfileSidebar';
import AboutSection from '../components/company-profile/AboutSection';
import MissionSection from '../components/company-profile/MissionSection';
import VisionSection from '../components/company-profile/VisionSection';
import StatisticsSection from '../components/company-profile/StatisticsSection';
import ContactSection from '../components/company-profile/ContactSection';
import {
  getCompanyProfile,
  updateCompanyProfile,
  createCompanyProfile,
  createStatistic, updateStatistic, deleteStatistic,
  createPillar, updatePillar, deletePillar
} from '../services/companyProfile.service';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const CompanyProfilePage = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const refreshData = useCallback(async () => {
    try {
      setError(null);
      const data = await getCompanyProfile() || {};

      // Map flat backend model to nested frontend UI structure
      setProfileData({
        id: data.id || null,
        about: {
          companyName: data.companyName || '',
          foundedYear: data.foundedYear || '',
          headquarters: data.headquarters || '',
          registrationNumber: data.registrationNumber || '',
          overview: data.overview || '',
          logoUrl: data.logo || ''
        },
        mission: {
          title: data.missionTitle || '',
          statement: data.missionStatement || '',
          pillars: data.missionPillars || []
        },
        vision: {
          title: data.visionTitle || '',
          statement: data.visionStatement || '',
          futurePriorities: data.visionFuturePriorities || [],
          longTermGoals: data.longTermGoals || ''
        },
        statistics: data.statistics || [],
        contact: {
          generalEmail: data.generalEmail || '',
          securityEmail: data.securityEmail || '',
          hrEmail: data.hrEmail || '',
          enquiryEmail: data.enquiryEmail || '',
          partnersEmail: data.partnersEmail || '',
          technicalEmail: data.technicalEmail || '',
          mainPhone: data.mainPhone || '',
          defenseContracts: data.defenseContractsPhone || '',
          address: data.mailingAddress || '',
          city: data.city || '',
          state: data.state || '',
          country: data.country || '',
          postalCode: data.postalCode || '',
          fullAddress: data.fullAddress || '',
          website: data.website || ''
        }
      });
    } catch (err) {
      setError(err.message || 'Failed to load company profile');
      toast.error('Failed to load company profile');
    }
  }, []);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    await refreshData();
    setIsLoading(false);
  }, [refreshData]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSaveSection = async (sectionKey, sectionData) => {
    if (!profileData) return;

    // If no profile exists yet, only allow saving the About section to create it
    if (!profileData.id && sectionKey !== 'about') {
      toast.error('Please save the About section first to initialize your company profile.');
      return;
    }

    setIsSaving(true);
    try {
      if (sectionKey === 'about') {
        const payload = {
          companyName: sectionData.companyName,
          foundedYear: sectionData.foundedYear,
          headquarters: sectionData.headquarters,
          registrationNumber: sectionData.registrationNumber,
          overview: sectionData.overview,
          logo: sectionData.logoUrl
        };
        if (!profileData.id) {
          await createCompanyProfile(payload);
        } else {
          await updateCompanyProfile(profileData.id, payload);
        }
      } else if (sectionKey === 'mission') {
        // Save Mission Profile Fields
        await updateCompanyProfile(profileData.id, {
          missionTitle: sectionData.title,
          missionStatement: sectionData.statement,
        });

        // Save Mission Pillars (Dirty tracking)
        const { newItems, modifiedItems, deletedIds } = sectionData.pillarsData;

        for (const item of newItems) {
          await createPillar({ text: item.text, companyProfileId: profileData.id });
        }
        for (const item of modifiedItems) {
          await updatePillar(item.id, { text: item.text });
        }
        for (const id of deletedIds) {
          await deletePillar(id);
        }
      } else if (sectionKey === 'vision') {
        await updateCompanyProfile(profileData.id, {
          visionTitle: sectionData.title,
          visionStatement: sectionData.statement,
          visionFuturePriorities: sectionData.futurePriorities,
          longTermGoals: sectionData.longTermGoals
        });
      } else if (sectionKey === 'statistics') {
        const { newItems, modifiedItems, deletedIds } = sectionData;

        for (const item of newItems) {
          await createStatistic({ value: item.value, label: item.label, companyProfileId: profileData.id });
        }
        for (const item of modifiedItems) {
          await updateStatistic(item.id, { value: item.value, label: item.label });
        }
        for (const id of deletedIds) {
          await deleteStatistic(id);
        }
      } else if (sectionKey === 'contact') {
        await updateCompanyProfile(profileData.id, {
          generalEmail: sectionData.generalEmail,
          securityEmail: sectionData.securityEmail,
          hrEmail: sectionData.hrEmail,
          enquiryEmail: sectionData.enquiryEmail,
          partnersEmail: sectionData.partnersEmail,
          technicalEmail: sectionData.technicalEmail,
          mainPhone: sectionData.mainPhone,
          defenseContractsPhone: sectionData.defenseContracts,
          mailingAddress: sectionData.address,
          city: sectionData.city,
          state: sectionData.state,
          country: sectionData.country,
          postalCode: sectionData.postalCode,
          fullAddress: sectionData.fullAddress,
          website: sectionData.website
        });
      }

      toast.success(`${sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)} updated successfully`);
      await refreshData(); // Refresh master data without unmounting
    } catch (err) {
      toast.error(err.message || `Failed to update ${sectionKey}`);
    } finally {
      setIsSaving(false);
    }
  };

  const renderActiveSection = () => {
    if (!profileData) return null;

    const props = { onSave: handleSaveSection, disabled: isSaving };

    switch (activeSection) {
      case 'about':
        return <AboutSection data={profileData.about} {...props} />;
      case 'mission':
        return <MissionSection data={profileData.mission} {...props} />;
      case 'vision':
        return <VisionSection data={profileData.vision} {...props} />;
      case 'statistics':
        return <StatisticsSection data={profileData.statistics} {...props} />;
      case 'contact':
        return <ContactSection data={profileData.contact} {...props} />;
      default:
        return <AboutSection data={profileData.about} {...props} />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (error && !profileData) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-4">
        <p className="text-gray-500">{error}</p>
        <button
          onClick={fetchProfile}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Company Profile"
        subtitle="Manage organization information, mission, vision and contact details."
      />

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <CompanyProfileSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <div className={`flex-1 min-w-0 transition-opacity ${isSaving ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
          {renderActiveSection()}
        </div>
      </div>
    </>
  );
};

export default CompanyProfilePage;
