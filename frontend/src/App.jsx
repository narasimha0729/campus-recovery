import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LostItemsPage from './pages/LostItemsPage';
import FoundItemsPage from './pages/FoundItemsPage';
import SubmitLostItemPage from './pages/SubmitLostItemPage';
import SubmitFoundItemPage from './pages/SubmitFoundItemPage';
import AdminPanelPage from './pages/AdminPanelPage';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/lost"
      element={
        <ProtectedRoute>
          <LostItemsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/found"
      element={
        <ProtectedRoute>
          <FoundItemsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/submit-lost"
      element={
        <ProtectedRoute>
          <SubmitLostItemPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/submit-found"
      element={
        <ProtectedRoute>
          <SubmitFoundItemPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin"
      element={
        <ProtectedRoute role="ADMIN">
          <AdminPanelPage />
        </ProtectedRoute>
      }
    />
  </Routes>
);

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;

