
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { PortfolioManagement } from '@/components/admin/PortfolioManagement';
import { ContentManagement } from '@/components/admin/ContentManagement';
import { UserManagement } from '@/components/admin/UserManagement';
import { AdminSettings } from '@/components/admin/AdminSettings';
import { LoginForm } from '@/components/admin/LoginForm';

const Admin = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/portfolio" element={<PortfolioManagement />} />
        <Route path="/content" element={<ContentManagement />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/settings" element={<AdminSettings />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
