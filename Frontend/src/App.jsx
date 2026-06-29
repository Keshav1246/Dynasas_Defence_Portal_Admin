import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ScrollToTop from './components/ScrollToTop'
import AdminLayout from './components/AdminLayout'
import Dashboard from './pages/Dashboard'
import MediaLibrary from './pages/MediaLibrary'
import PartnerManagement from './pages/PartnerManagement'

import ContactInquiries from './pages/ContactInquiries'
import Analytics from './pages/Analytics'
import AdminUsers from './pages/AdminUsers'

import ServicesPage from './pages/ServicesPage'
import CompanyProfilePage from './pages/CompanyProfilePage'
import ContentManagementPage from './pages/ContentManagementPage'
import SettingsPage from './pages/SettingsPage'
import OfficeManagementPage from './pages/OfficeManagementPage'

// Auth components
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Toaster position="top-center" />
        <Routes>
          {/* Public Admin Route */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="media-library" element={<MediaLibrary />} />
            <Route path="partner-management" element={<PartnerManagement />} />
            <Route path="contact-inquiries" element={<ContactInquiries />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="admin-users" element={<AdminUsers />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="company-profile" element={<CompanyProfilePage />} />
            <Route path="content" element={<ContentManagementPage />} />
            <Route path="offices" element={<OfficeManagementPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App