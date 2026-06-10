import React from 'react';
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

const dashboardStats = [
  { title: 'Total Services', value: '64', icon: Layers, growth: '+12%', growthType: 'positive', iconColor: 'orange' },
  { title: 'Published Services', value: '48', icon: CheckCircle, growth: '+8%', growthType: 'positive', iconColor: 'green' },
  { title: 'Pending Inquiries', value: '27', icon: MessageSquare, growth: '-15%', growthType: 'negative', iconColor: 'red' },
  { title: 'Media Assets', value: '1,284', icon: ImageIcon, growth: '+34%', growthType: 'positive', iconColor: 'indigo' },
  { title: 'Partners', value: '34', icon: Handshake, growth: '+3', growthType: 'positive', iconColor: 'yellow' },
  { title: 'Active Admin Users', value: '12', icon: Users, growth: '0%', growthType: 'positive', iconColor: 'purple' },
];

const Dashboard = () => {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening in your portal."
        date="Tuesday, June 9, 2026"
      />

      {/* Row 1: Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mt-6">
        {dashboardStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Row 2: Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <ServicePublishingTrend />
        <InquiryOverview />
      </div>

      {/* Row 3: Recent Activity | Quick Actions + Pending Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RecentActivityCard />
        <div className="flex flex-col gap-6">
          <QuickActionsCard />
          <PendingTasksCard />
        </div>
      </div>

      {/* Row 4: Media Storage | Content Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <MediaStorageCard />
        <ContentHealthCard />
      </div>
    </>
  );
};

export default Dashboard;
