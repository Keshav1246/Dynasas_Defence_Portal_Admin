import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './components/AdminLayout'
import PageHeader from './components/PageHeader'
import StatsCard from './components/StatsCard'
import { Layers, CheckCircle, MessageSquare, Image as ImageIcon, Handshake, Users } from 'lucide-react'

const dashboardStats = [
  { title: 'Total Services', value: '64', icon: Layers, growth: '+12%', growthType: 'positive', iconColor: 'orange' },
  { title: 'Published Services', value: '48', icon: CheckCircle, growth: '+8%', growthType: 'positive', iconColor: 'green' },
  { title: 'Pending Inquiries', value: '27', icon: MessageSquare, growth: '-15%', growthType: 'negative', iconColor: 'red' },
  { title: 'Media Assets', value: '1,284', icon: ImageIcon, growth: '+34%', growthType: 'positive', iconColor: 'indigo' },
  { title: 'Partners', value: '34', icon: Handshake, growth: '+3', growthType: 'positive', iconColor: 'yellow' },
  { title: 'Active Admin Users', value: '12', icon: Users, growth: '0%', growthType: 'positive', iconColor: 'purple' },
];

// Example Dashboard Page
const DashboardPage = () => {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening in your portal."
        date="Tuesday, June 9, 2026"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mt-6">
        {dashboardStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
    </>
  );
}

// Example Generic Page
const SettingsPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#111827]">Settings</h2>
      <p className="text-slate-500 mt-2">Manage your preferences and configurations here.</p>
    </div>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* All routes inside this block will share the AdminLayout (Sidebar + TopNavbar) */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="settings" element={<SettingsPage />} />
          {/* Add more routes here like <Route path="users" element={<UsersPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App