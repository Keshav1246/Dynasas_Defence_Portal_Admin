import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from '../components/PageHeader';
import StatsCard from '../components/StatsCard';
import ServicePublishingTrend from '../components/ServicePublishingTrend';
import InquiryOverview from '../components/InquiryOverview';
import RecentActivityCard from '../components/RecentActivityCard';
import QuickActionsCard from '../components/QuickActionsCard';
import PendingTasksCard from '../components/PendingTasksCard';
import MediaStorageCard from '../components/MediaStorageCard';
import ContentHealthCard from '../components/ContentHealthCard';
import { Layers, CheckCircle, MessageSquare, Image as ImageIcon, Handshake, Users } from 'lucide-react';
import { getDashboardData } from '../services/dashboard.service';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getDashboardData();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (loading) {
    return (
      <div className="w-full h-full animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        
        {/* Row 1: Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mt-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 h-[116px]">
               <div className="flex justify-between items-start mb-4">
                 <div className="w-10 h-10 rounded-lg bg-gray-100"></div>
                 <div className="w-12 h-5 rounded-full bg-gray-100"></div>
               </div>
               <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
               <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>

        {/* Row 2: Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-xl border border-gray-100 h-[380px]"></div>
          <div className="bg-white rounded-xl border border-gray-100 h-[380px]"></div>
        </div>

        {/* Row 3: Cards Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-xl border border-gray-100 h-[380px]"></div>
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-xl border border-gray-100 h-[180px]"></div>
            <div className="bg-white rounded-xl border border-gray-100 h-[180px]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] w-full">
        <div className="bg-red-50 p-6 rounded-xl border border-red-100 max-w-md text-center">
          <h3 className="text-red-800 font-semibold text-lg mb-2">Failed to load dashboard</h3>
          <p className="text-red-600 text-sm mb-6">{error}</p>
          <button 
            onClick={fetchDashboard}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const dashboardStats = [
    { title: 'Total Services', value: data.stats.totalServices.toString(), icon: Layers, growth: '', growthType: 'neutral', iconColor: 'orange' },
    { title: 'Published Services', value: data.stats.publishedServices.toString(), icon: CheckCircle, growth: '', growthType: 'neutral', iconColor: 'green' },
    { title: 'Pending Inquiries', value: (data.stats.newInquiries + data.stats.inProgressInquiries).toString(), icon: MessageSquare, growth: '', growthType: 'neutral', iconColor: 'red' },
    { title: 'Media Assets', value: data.stats.totalMediaFiles.toString(), icon: ImageIcon, growth: '', growthType: 'neutral', iconColor: 'indigo' },
    { title: 'Partners', value: data.stats.totalPartners.toString(), icon: Handshake, growth: '', growthType: 'neutral', iconColor: 'yellow' },
    { title: 'Active Admin Users', value: data.stats.totalAdminUsers.toString(), icon: Users, growth: '', growthType: 'neutral', iconColor: 'purple' },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening in your portal."
        date={new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
      />

      {/* Row 1: Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mt-6">
        {dashboardStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Row 2: Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <ServicePublishingTrend data={data.serviceTrend} />
        <InquiryOverview data={data.inquiryOverview} />
      </div>

      {/* Row 3: Recent Activity | Quick Actions + Pending Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RecentActivityCard activities={data.recentActivity} />
        <div className="flex flex-col gap-6">
          <QuickActionsCard />
          <PendingTasksCard stats={data.stats} />
        </div>
      </div>

      {/* Row 4: Media Storage | Content Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <MediaStorageCard mediaBreakdown={data.mediaBreakdown} totalStorageUsed={data.stats.totalStorageUsed} />
        <ContentHealthCard contentHealth={data.contentHealth} />
      </div>
    </>
  );
};

export default Dashboard;
