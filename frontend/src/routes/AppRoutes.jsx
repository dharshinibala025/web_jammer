import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';
import NotFoundPage from '../pages/not-found/NotFoundPage';

// Welcome & Auth
import GetStartedPage from '../pages/welcome/GetStartedPage';
import LoginPage from '../pages/login/LoginPage';

// Student Pages
const StudentHomePage = lazy(() => import('../pages/student/StudentHomePage'));
const StudentAppsPage = lazy(() => import('../pages/student/StudentAppsPage'));
const StudentNotificationsPage = lazy(() => import('../pages/student/StudentNotificationsPage'));
const StudentProfilePage = lazy(() => import('../pages/student/StudentProfilePage'));
const StudentActivityPage = lazy(() => import('../pages/student/StudentActivityPage'));
const StudentSyncPage = lazy(() => import('../pages/student/StudentSyncPage'));
const StudentDeviceInfoPage = lazy(() => import('../pages/student/StudentDeviceInfoPage'));
const StudentRestrictionInfoPage = lazy(() => import('../pages/student/StudentRestrictionInfoPage'));

// Staff Pages
const StaffDashboardPage = lazy(() => import('../pages/staff/StaffDashboardPage'));
const StaffStudentsPage = lazy(() => import('../pages/staff/StaffStudentsPage'));
const StaffDevicesPage = lazy(() => import('../pages/staff/StaffDevicesPage'));
const StaffSettingsPage = lazy(() => import('../pages/staff/StaffSettingsPage'));

import AdminLayout from '../layouts/AdminLayout';

// Admin Pages
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));
const AdminStudentsPage = lazy(() => import('../pages/admin/AdminStudentsPage'));
const AdminStaffPage = lazy(() => import('../pages/admin/AdminStaffPage'));
const AdminDevicesPage = lazy(() => import('../pages/admin/AdminDevicesPage'));
const AdminSettingsPage = lazy(() => import('../pages/admin/AdminSettingsPage'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
  </div>
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public / Landing Routes */}
        <Route path="/" element={<GetStartedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student/login" element={<LoginPage />} />
        <Route path="/staff/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Student App Routes */}
        <Route path="/student/dashboard" element={<ProtectedRoute><AppLayout><StudentHomePage /></AppLayout></ProtectedRoute>} />
        <Route path="/student/blocked-apps" element={<ProtectedRoute><AppLayout><StudentAppsPage /></AppLayout></ProtectedRoute>} />
        <Route path="/student/notifications" element={<ProtectedRoute><AppLayout><StudentNotificationsPage /></AppLayout></ProtectedRoute>} />
        <Route path="/student/profile" element={<ProtectedRoute><AppLayout><StudentProfilePage /></AppLayout></ProtectedRoute>} />
        <Route path="/student/activity" element={<ProtectedRoute><AppLayout><StudentActivityPage /></AppLayout></ProtectedRoute>} />
        <Route path="/student/sync" element={<ProtectedRoute><AppLayout><StudentSyncPage /></AppLayout></ProtectedRoute>} />
        <Route path="/student/device-info" element={<ProtectedRoute><AppLayout><StudentDeviceInfoPage /></AppLayout></ProtectedRoute>} />
        <Route path="/student/restriction-info" element={<ProtectedRoute><AppLayout><StudentRestrictionInfoPage /></AppLayout></ProtectedRoute>} />

        {/* Staff App Routes */}
        <Route path="/staff/dashboard" element={<ProtectedRoute><AppLayout><StaffDashboardPage /></AppLayout></ProtectedRoute>} />
        <Route path="/staff/students" element={<ProtectedRoute><AppLayout><StaffStudentsPage /></AppLayout></ProtectedRoute>} />
        <Route path="/staff/devices" element={<ProtectedRoute><AppLayout><StaffDevicesPage /></AppLayout></ProtectedRoute>} />
        <Route path="/staff/notifications" element={<ProtectedRoute><AppLayout><StaffSettingsPage /></AppLayout></ProtectedRoute>} />
        <Route path="/staff/profile" element={<ProtectedRoute><AppLayout><StaffSettingsPage /></AppLayout></ProtectedRoute>} />
        <Route path="/staff/settings" element={<ProtectedRoute><AppLayout><StaffSettingsPage /></AppLayout></ProtectedRoute>} />

        {/* Admin App Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute><AppLayout><AdminDashboardPage /></AppLayout></ProtectedRoute>} />
        <Route path="/admin/students" element={<ProtectedRoute><AppLayout><AdminStudentsPage /></AppLayout></ProtectedRoute>} />
        <Route path="/admin/staff" element={<ProtectedRoute><AppLayout><AdminStaffPage /></AppLayout></ProtectedRoute>} />
        <Route path="/admin/devices" element={<ProtectedRoute><AppLayout><AdminDevicesPage /></AppLayout></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AppLayout><AdminSettingsPage /></AppLayout></ProtectedRoute>} />
        <Route path="/admin/profile" element={<ProtectedRoute><AppLayout><AdminSettingsPage /></AppLayout></ProtectedRoute>} />
        <Route path="/admin/notifications" element={<ProtectedRoute><AppLayout><AdminSettingsPage /></AppLayout></ProtectedRoute>} />

        {/* 404 Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
