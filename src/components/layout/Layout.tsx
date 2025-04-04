
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useIsMobile } from '@/hooks/use-mobile';

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();

  // Auto-collapse sidebar on mobile by default
  useEffect(() => {
    setSidebarCollapsed(isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen">
      <div className={`fixed top-0 bottom-0 left-0 z-30 ${sidebarCollapsed ? 'w-0 md:w-16' : 'w-64'} transition-all duration-300`}>
        <Sidebar isCollapsed={sidebarCollapsed} />
      </div>
      <div className={`flex-1 flex flex-col min-h-screen ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'} transition-all duration-300`}>
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
