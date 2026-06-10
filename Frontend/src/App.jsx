import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './components/AdminLayout'
import Dashboard from './pages/Dashboard'

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
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<SettingsPage />} />
          {/* Add more routes here like <Route path="users" element={<UsersPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App