import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';

// Welcome & Auth
import GetStartedPage from '../pages/welcome/GetStartedPage';
import LoginPage from '../pages/login/LoginPage';

// Student Pages
import StudentHomePage from '../pages/student/StudentHomePage';
import StudentAppsPage from '../pages/student/StudentAppsPage';
import StudentNotificationsPage from '../pages/student/StudentNotificationsPage';
import StudentProfilePage from '../pages/student/StudentProfilePage';
import StudentActivityPage from '../pages/student/StudentActivityPage';
import StudentSyncPage from '../pages/student/StudentSyncPage';
import StudentDeviceInfoPage from '../pages/student/StudentDeviceInfoPage';
import StudentRestrictionInfoPage from '../pages/student/StudentRestrictionInfoPage';

// Staff Pages
import StaffDashboardPage from '../pages/staff/StaffDashboardPage';
import StaffStudentsPage from '../pages/staff/StaffStudentsPage';
import StaffDevicesPage from '../pages/staff/StaffDevicesPage';
import StaffNotificationsPage from '../pages/staff/StaffNotificationsPage';
import StaffSettingsPage from '../pages/staff/StaffSettingsPage';

import AdminLayout from '../layouts/AdminLayout';

// Admin Pages
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminStudentsPage from '../pages/admin/AdminStudentsPage';
import AdminStaffPage from '../pages/admin/AdminStaffPage';
import AdminSettingsPage from '../pages/admin/AdminSettingsPage';
import AdminDevicesPage from '../pages/admin/AdminDevicesPage';
import AdminNotificationsPage from '../pages/admin/AdminNotificationsPage';
import AdminProfilePage from '../pages/admin/AdminProfilePage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public / Landing Routes */}
      <Route path="/" element={<GetStartedPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/student/login" element={<LoginPage />} />
      <Route path="/staff/login" element={<LoginPage />} />
      <Route path="/admin/login" element={<LoginPage />} />

      {/* Student App Routes */}
      <Route path="/student/dashboard" element={<AppLayout><StudentHomePage /></AppLayout>} />
      <Route path="/student/blocked-apps" element={<AppLayout><StudentAppsPage /></AppLayout>} />
      <Route path="/student/notifications" element={<AppLayout><StudentNotificationsPage /></AppLayout>} />
      <Route path="/student/profile" element={<AppLayout><StudentProfilePage /></AppLayout>} />
      <Route path="/student/activity" element={<AppLayout><StudentActivityPage /></AppLayout>} />
      <Route path="/student/sync" element={<AppLayout><StudentSyncPage /></AppLayout>} />
      <Route path="/student/device-info" element={<AppLayout><StudentDeviceInfoPage /></AppLayout>} />
      <Route path="/student/restriction-info" element={<AppLayout><StudentRestrictionInfoPage /></AppLayout>} />

      {/* Staff App Routes */}
      <Route path="/staff/dashboard" element={<AppLayout><StaffDashboardPage /></AppLayout>} />
      <Route path="/staff/students" element={<AppLayout><StaffStudentsPage /></AppLayout>} />
      <Route path="/staff/devices" element={<AppLayout><StaffDevicesPage /></AppLayout>} />
      <Route path="/staff/notifications" element={<AppLayout><StaffNotificationsPage /></AppLayout>} />
      <Route path="/staff/activity" element={<AppLayout><StaffDashboardPage /></AppLayout>} />
      <Route path="/staff/profile" element={<AppLayout><StaffSettingsPage /></AppLayout>} />
      <Route path="/staff/settings" element={<AppLayout><StaffSettingsPage /></AppLayout>} />

      {/* Admin App Routes */}
      <Route path="/admin/dashboard" element={<AppLayout><AdminDashboardPage /></AppLayout>} />
      <Route path="/admin/students" element={<AppLayout><AdminStudentsPage /></AppLayout>} />
      <Route path="/admin/staff" element={<AppLayout><AdminStaffPage /></AppLayout>} />
      <Route path="/admin/devices" element={<AppLayout><AdminDevicesPage /></AppLayout>} />
      <Route path="/admin/sections" element={<Navigate to="/admin/devices" replace />} />
      <Route path="/admin/applications" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/settings" element={<AppLayout><AdminSettingsPage /></AppLayout>} />
      <Route path="/admin/profile" element={<AppLayout><AdminProfilePage /></AppLayout>} />
      <Route path="/admin/notifications" element={<AppLayout><AdminNotificationsPage /></AppLayout>} />
      <Route path="/admin/activity" element={<AppLayout><AdminDashboardPage /></AppLayout>} />

      {/* Catch-all Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
