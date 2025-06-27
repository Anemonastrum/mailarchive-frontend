import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

import { Toaster } from 'react-hot-toast';

// Import pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Logbook from './pages/Logbook';
import Organization from './pages/Organization';
import Category from './pages/Category';
import Mailing from './pages/Mailing';
import Profile from './pages/Profile';
import Member from './pages/Member';
import Disposition from './pages/Disposition';

import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from './context/ProtectedRoutes';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
    <Toaster position="top-right" />
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
        <Route exact path="/logbook/:sub" element={<ProtectedRoute> <Logbook /> </ProtectedRoute>} />
        <Route exact path="/mail/:sub" element={<ProtectedRoute>  <Mailing /> </ProtectedRoute>} />
        <Route exact path="/profile/:sub" element={<ProtectedRoute> <Profile /> </ProtectedRoute> } />
        <Route exact path="/users/:sub" element={<ProtectedRoute> <Member /> </ProtectedRoute> } />
        <Route exact path="/organization" element={<ProtectedRoute> <Organization /> </ProtectedRoute>} />
        <Route exact path="/category" element={<ProtectedRoute> <Category /> </ProtectedRoute>} />
        <Route exact path="/disposisi" element={<ProtectedRoute> <Disposition /> </ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/profile" element={<Navigate to="/profile/data" replace />} />
      </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
