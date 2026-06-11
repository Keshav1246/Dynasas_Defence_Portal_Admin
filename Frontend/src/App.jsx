import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import AdminLayout from './components/AdminLayout'
import Dashboard from './pages/Dashboard'
import ServicesPage from './pages/ServicesPage'
import CompanyProfilePage from './pages/CompanyProfilePage'
import ContentManagementPage from './pages/ContentManagementPage'
import SettingsPage from './pages/SettingsPage'

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* All routes inside this block will share the AdminLayout (Sidebar + TopNavbar) */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="company-profile" element={<CompanyProfilePage />} />
          <Route path="content" element={<ContentManagementPage />} />
          <Route path="settings" element={<SettingsPage />} />
          {/* Add more routes here like <Route path="users" element={<UsersPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App