import React, { useState, useCallback } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import StudentBottomNavBar from '../components/student/BottomNavBar';
import StaffBottomNavBar from '../components/staff/StaffBottomNavBar';
import AdminBottomTabBar from '../components/admin/BottomTabBar';
import { useAuth } from '../contexts/AuthContext';

export const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role } = useAuth();
  const location = useLocation();

  const handleToggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const renderMobileBottomNav = () => {
    switch (role) {
      case 'staff':
        return <StaffBottomNavBar />;
      case 'admin':
        return <AdminBottomTabBar />;
      case 'student':
      default:
        return <StudentBottomNavBar />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar
        onToggleSidebar={handleToggleSidebar}
        isSidebarOpen={sidebarOpen}
      />

      <div className="flex flex-1 pt-16">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={handleCloseSidebar}
        />

        <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 max-w-7xl mx-auto w-full transition-all">
          {children}
        </main>
      </div>

      {renderMobileBottomNav()}
    </div>
  );
};

export default AppLayout;
