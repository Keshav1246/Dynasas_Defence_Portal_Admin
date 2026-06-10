import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f4f5f7]">
      {/* Sidebar - fixed on the left */}
      <Sidebar />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Top Navbar - fixed at the top of the main area */}
        <TopNavbar />

        {/* Scrollable Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* React Router will inject the current page component here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
