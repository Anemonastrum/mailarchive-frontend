import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './css/style.css';
import './charts/ChartjsConfig';

import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from './context/ProtectedRoutes';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Logbook from './pages/Logbook';
import Organization from './pages/Organization';
import Category from './pages/Category';
import Mailing from './pages/Mailing';
import Profile from './pages/Profile';
import Member from './pages/Member';
import Disposition from './pages/Disposition';

import { BeatLoader } from 'react-spinners';

function AppContent() {
  const { loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
       <BeatLoader size={12} color="#a6e3a1" />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/logbook/:sub" element={<ProtectedRoute><Logbook /></ProtectedRoute>} />
        <Route path="/mail/:sub" element={<ProtectedRoute><Mailing /></ProtectedRoute>} />
        <Route path="/profile/:sub" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/users/:sub" element={<ProtectedRoute><Member /></ProtectedRoute>} />
        <Route path="/organization" element={<ProtectedRoute><Organization /></ProtectedRoute>} />
        <Route path="/category" element={<ProtectedRoute><Category /></ProtectedRoute>} />
        <Route path="/aksi/:sub" element={<ProtectedRoute><Disposition /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/profile" element={<Navigate to="/profile/data" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
